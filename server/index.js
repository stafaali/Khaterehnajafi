const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'cosmetics_app_secret_2024';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Data storage (in production, use a proper database)
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data files
const initializeData = () => {
  const productsFile = path.join(DATA_DIR, 'products.json');
  const usersFile = path.join(DATA_DIR, 'users.json');
  const ordersFile = path.join(DATA_DIR, 'orders.json');

  // Initialize products
  if (!fs.existsSync(productsFile)) {
    const initialProducts = [
      {
        id: '1',
        name: 'Luxury Foundation',
        brand: 'GlamourPro',
        price: 49.99,
        category: 'Face',
        description: 'Full coverage, long-lasting foundation with SPF 30',
        image: '/api/placeholder/400/400',
        inStock: true,
        rating: 4.8,
        reviews: 127
      },
      {
        id: '2',
        name: 'Velvet Lipstick',
        brand: 'BeautyLux',
        price: 24.99,
        category: 'Lips',
        description: 'Rich, matte finish lipstick in vibrant colors',
        image: '/api/placeholder/400/400',
        inStock: true,
        rating: 4.6,
        reviews: 89
      },
      {
        id: '3',
        name: 'Eyeshadow Palette',
        brand: 'ColorMagic',
        price: 39.99,
        category: 'Eyes',
        description: '12-shade eyeshadow palette with shimmer and matte finishes',
        image: '/api/placeholder/400/400',
        inStock: true,
        rating: 4.9,
        reviews: 203
      },
      {
        id: '4',
        name: 'Glow Highlighter',
        brand: 'RadiantGlow',
        price: 29.99,
        category: 'Face',
        description: 'Illuminating highlighter for a natural glow',
        image: '/api/placeholder/400/400',
        inStock: true,
        rating: 4.7,
        reviews: 156
      },
      {
        id: '5',
        name: 'Mascara Volume Plus',
        brand: 'LashMaster',
        price: 19.99,
        category: 'Eyes',
        description: 'Volumizing mascara for dramatic lashes',
        image: '/api/placeholder/400/400',
        inStock: false,
        rating: 4.5,
        reviews: 78
      },
      {
        id: '6',
        name: 'Blush Compact',
        brand: 'RosyGlow',
        price: 22.99,
        category: 'Face',
        description: 'Natural flush blush in multiple shades',
        image: '/api/placeholder/400/400',
        inStock: true,
        rating: 4.4,
        reviews: 92
      }
    ];
    fs.writeFileSync(productsFile, JSON.stringify(initialProducts, null, 2));
  }

  // Initialize users
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([], null, 2));
  }

  // Initialize orders
  if (!fs.existsSync(ordersFile)) {
    fs.writeFileSync(ordersFile, JSON.stringify([], null, 2));
  }
};

// Helper functions
const readData = (filename) => {
  const filepath = path.join(DATA_DIR, filename);
  return JSON.parse(fs.readFileSync(filepath, 'utf8'));
};

const writeData = (filename, data) => {
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  try {
    const products = readData('products.json');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const products = readData('products.json');
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const users = readData('users.json');

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeData('users.json', users);

    // Generate token
    const token = jwt.sign({ userId: newUser.id, email }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: newUser.id, email, name }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = readData('users.json');

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Create order
app.post('/api/orders', authenticateToken, (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;
    const orders = readData('orders.json');

    const newOrder = {
      id: uuidv4(),
      userId: req.user.userId,
      items,
      total,
      shippingAddress,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    writeData('orders.json', orders);

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get user orders
app.get('/api/orders', authenticateToken, (req, res) => {
  try {
    const orders = readData('orders.json');
    const userOrders = orders.filter(order => order.userId === req.user.userId);
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Initialize data and start server
initializeData();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});