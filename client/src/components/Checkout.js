import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiCreditCard, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import { useApp } from '../App';

const CheckoutContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const CheckoutContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  margin-bottom: 2rem;
  
  &:hover {
    color: #e91e63;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #e91e63, #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FormSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e91e63;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #e91e63;
  }
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  height: fit-content;
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
`;

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #ffeef8, #f8e8ff);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #e91e63;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`;

const ItemDetails = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  color: #e91e63;
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

const PlaceOrderButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, #e91e63, #f06292);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(233, 30, 99, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 1rem;
  font-size: 14px;
  border: 1px solid #ffcdd2;
`;

const SecurityInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const Checkout = () => {
  const { state, createOrder, clearCart } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'address', 
      'city', 'state', 'zipCode', 'cardNumber', 'expiryDate', 'cvv', 'cardName'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError('Please fill in all required fields');
        return;
      }
    }

    setLoading(true);

    const orderData = {
      items: state.cart,
      total: calculateTotal(),
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      paymentMethod: {
        cardNumber: '****' + formData.cardNumber.slice(-4),
        expiryDate: formData.expiryDate,
        cardName: formData.cardName
      }
    };

    const result = await createOrder(orderData);
    
    if (result.success) {
      navigate('/orders');
    } else {
      setError(result.error || 'Failed to place order. Please try again.');
    }
    
    setLoading(false);
  };

  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const calculateTotal = () => subtotal + tax + shipping;

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
      <CheckoutContainer>
        <CheckoutContent>
          <EmptyCart>
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart before checkout.</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </button>
          </EmptyCart>
        </CheckoutContent>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <CheckoutContent>
        <BackButton onClick={() => navigate('/cart')}>
          <FiArrowLeft />
          Back to Cart
        </BackButton>

        <Title>Checkout</Title>

        <CheckoutGrid>
          <div>
            <FormSection>
              <SectionTitle>
                <FiTruck />
                Shipping Information
              </SectionTitle>
              
              <Form onSubmit={handleSubmit}>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                
                <TwoColumnGrid>
                  <InputGroup>
                    <Label>First Name *</Label>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                  
                  <InputGroup>
                    <Label>Last Name *</Label>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </TwoColumnGrid>

                <InputGroup>
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>

                <InputGroup>
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>

                <InputGroup>
                  <Label>Address *</Label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>

                <TwoColumnGrid>
                  <InputGroup>
                    <Label>City *</Label>
                    <Input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <Label>State *</Label>
                    <Select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                      {/* Add more states as needed */}
                    </Select>
                  </InputGroup>
                </TwoColumnGrid>

                <TwoColumnGrid>
                  <InputGroup>
                    <Label>ZIP Code *</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <Label>Country *</Label>
                    <Select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                    </Select>
                  </InputGroup>
                </TwoColumnGrid>
              </Form>
            </FormSection>

            <FormSection style={{ marginTop: '2rem' }}>
              <SectionTitle>
                <FiCreditCard />
                Payment Information
              </SectionTitle>

              <InputGroup>
                <Label>Card Number *</Label>
                <Input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </InputGroup>

              <TwoColumnGrid>
                <InputGroup>
                  <Label>Expiry Date *</Label>
                  <Input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    required
                  />
                </InputGroup>

                <InputGroup>
                  <Label>CVV *</Label>
                  <Input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    required
                  />
                </InputGroup>
              </TwoColumnGrid>

              <InputGroup>
                <Label>Cardholder Name *</Label>
                <Input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  required
                />
              </InputGroup>

              <SecurityInfo>
                <FiShield />
                Your payment information is secure and encrypted
              </SecurityInfo>
            </FormSection>
          </div>

          <OrderSummary>
            <SectionTitle>Order Summary</SectionTitle>
            
            {state.cart.map(item => (
              <CartItem key={item.id}>
                <ItemImage>
                  {getProductEmoji(item.category)}
                </ItemImage>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemDetails>Qty: {item.quantity} × ${item.price}</ItemDetails>
                </ItemInfo>
                <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
              </CartItem>
            ))}

            <div style={{ marginTop: '2rem' }}>
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
                <span>${calculateTotal().toFixed(2)}</span>
              </SummaryRow>
            </div>

            <PlaceOrderButton 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </PlaceOrderButton>
          </OrderSummary>
        </CheckoutGrid>
      </CheckoutContent>
    </CheckoutContainer>
  );
};

export default Checkout;