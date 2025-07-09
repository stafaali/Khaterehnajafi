import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Header from './components/Header';
import Home from './components/Home';
import ProductCatalog from './components/ProductCatalog';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import Orders from './components/Orders';

// Context
const AppContext = createContext();

// Reducer for state management
const initialState = {
  user: null,
  cart: [],
  products: [],
  loading: false,
  token: localStorage.getItem('token')
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_TOKEN':
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
      return { ...state, token: action.payload };
    
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, user: null, token: null, cart: [] };
    
    default:
      return state;
  }
};

// App Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Configure axios defaults
  useEffect(() => {
    const baseURL = process.env.REACT_APP_API_URL || '';
    axios.defaults.baseURL = baseURL;
    
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // Fetch user data on app load if token exists
  useEffect(() => {
    const fetchUserData = async () => {
      if (state.token && !state.user) {
        try {
          // In a real app, you'd have an endpoint to get user data from token
          // For now, we'll decode the token or make a verification call
          const tokenData = JSON.parse(atob(state.token.split('.')[1]));
          dispatch({ type: 'SET_USER', payload: { email: tokenData.email } });
        } catch (error) {
          console.error('Token validation failed:', error);
          dispatch({ type: 'LOGOUT' });
        }
      }
    };

    fetchUserData();
  }, [state.token, state.user]);

  // Fetch products on app load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await axios.get('/api/products');
        dispatch({ type: 'SET_PRODUCTS', payload: response.data });
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchProducts();
  }, []);

  const value = {
    state,
    dispatch,
    // Helper functions
    login: async (email, password) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await axios.post('/api/auth/login', { email, password });
        dispatch({ type: 'SET_TOKEN', payload: response.data.token });
        dispatch({ type: 'SET_USER', payload: response.data.user });
        return { success: true };
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Login failed' };
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    
    register: async (name, email, password) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await axios.post('/api/auth/register', { name, email, password });
        dispatch({ type: 'SET_TOKEN', payload: response.data.token });
        dispatch({ type: 'SET_USER', payload: response.data.user });
        return { success: true };
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Registration failed' };
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    
    logout: () => {
      dispatch({ type: 'LOGOUT' });
    },
    
    addToCart: (product) => {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    },
    
    removeFromCart: (productId) => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    },
    
    updateCartQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
      } else {
        dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: productId, quantity } });
      }
    },
    
    clearCart: () => {
      dispatch({ type: 'CLEAR_CART' });
    },
    
    createOrder: async (orderData) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await axios.post('/api/orders', orderData);
        dispatch({ type: 'CLEAR_CART' });
        return { success: true, order: response.data.order };
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Order creation failed' };
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { state } = useApp();
  return state.token ? children : <Navigate to="/login" />;
};

// Main App Component
function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductCatalog />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;