import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import { useApp } from '../App';

const CartContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const CartContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const CartHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #e91e63, #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  margin-bottom: 2rem;
  
  &:hover {
    color: #e91e63;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const CartItems = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #ffeef8, #f8e8ff);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #e91e63;
  flex-shrink: 0;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: #333;
`;

const ProductBrand = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const ProductPrice = styled.p`
  color: #e91e63;
  font-weight: 600;
  font-size: 1.1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 12px;
`;

const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: #e91e63;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #c2185b;
    transform: scale(1.1);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuantityDisplay = styled.span`
  font-weight: 600;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(244, 67, 54, 0.1);
    color: #f44336;
  }
`;

const CartSummary = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 1rem;
    border-top: 2px solid #f0f0f0;
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #e91e63, #f06292);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(233, 30, 99, 0.3);
  }
`;

const Cart = () => {
  const { state, updateCartQuantity, removeFromCart } = useApp();

  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const getProductEmoji = (category) => {
    const emojis = {
      'Face': '💄',
      'Eyes': '👁️', 
      'Lips': '💋',
      'Nails': '💅'
    };
    return emojis[category] || '💄';
  };

  if (state.cart.length === 0) {
    return (
      <CartContainer>
        <CartContent>
          <BackLink to="/products">
            <FiArrowLeft />
            Continue Shopping
          </BackLink>
          
          <EmptyCart>
            <EmptyIcon>🛒</EmptyIcon>
            <Title>Your Cart is Empty</Title>
            <EmptyMessage>
              Looks like you haven't added any products to your cart yet.
            </EmptyMessage>
            <Link to="/products" className="btn btn-primary">
              <FiShoppingBag style={{ marginRight: '0.5rem' }} />
              Start Shopping
            </Link>
          </EmptyCart>
        </CartContent>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartContent>
        <BackLink to="/products">
          <FiArrowLeft />
          Continue Shopping
        </BackLink>

        <CartHeader>
          <Title>Shopping Cart</Title>
          <p>{state.cart.length} item{state.cart.length !== 1 ? 's' : ''} in your cart</p>
        </CartHeader>

        <CartItems>
          {state.cart.map(item => (
            <CartItem key={item.id}>
              <ProductImage>
                {getProductEmoji(item.category)}
              </ProductImage>
              
              <ProductInfo>
                <ProductName>{item.name}</ProductName>
                <ProductBrand>{item.brand}</ProductBrand>
                <ProductPrice>${item.price}</ProductPrice>
              </ProductInfo>

              <QuantityControls>
                <QuantityButton
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <FiMinus />
                </QuantityButton>
                <QuantityDisplay>{item.quantity}</QuantityDisplay>
                <QuantityButton
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                >
                  <FiPlus />
                </QuantityButton>
              </QuantityControls>

              <RemoveButton
                onClick={() => removeFromCart(item.id)}
                title="Remove item"
              >
                <FiTrash2 />
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryRow>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Tax (8%):</span>
            <span>${tax.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping:</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </SummaryRow>

          <CheckoutButton to="/checkout">
            Proceed to Checkout
          </CheckoutButton>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;