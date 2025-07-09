import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiPackage, FiCalendar, FiDollarSign, FiTruck, FiCheck, FiClock } from 'react-icons/fi';
import { useApp } from '../App';
import axios from 'axios';

const OrdersContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const OrdersContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
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

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const OrderId = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
`;

const OrderDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.9rem;
  background: ${props => {
    switch (props.status) {
      case 'pending': return '#fff3cd';
      case 'confirmed': return '#d1ecf1';
      case 'shipped': return '#d4edda';
      case 'delivered': return '#d4edda';
      default: return '#f8f9fa';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'pending': return '#856404';
      case 'confirmed': return '#0c5460';
      case 'shipped': return '#155724';
      case 'delivered': return '#155724';
      default: return '#495057';
    }
  }};
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
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
  flex-shrink: 0;
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

const OrderSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const TotalAmount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #e91e63;
`;

const TrackingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const EmptyOrders = styled.div`
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

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'pending':
      return <FiClock />;
    case 'confirmed':
      return <FiCheck />;
    case 'shipped':
      return <FiTruck />;
    case 'delivered':
      return <FiPackage />;
    default:
      return <FiPackage />;
  }
};

const Orders = () => {
  const { state } = useApp();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProductEmoji = (category) => {
    const emojis = {
      'Face': '💄',
      'Eyes': '👁️',
      'Lips': '💋',
      'Nails': '💅'
    };
    return emojis[category] || '💄';
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Order Pending';
      case 'confirmed':
        return 'Order Confirmed';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown Status';
    }
  };

  if (loading) {
    return (
      <OrdersContainer>
        <OrdersContent>
          <Title>My Orders</Title>
          <LoadingSpinner>
            <div className="spinner"></div>
            <p>Loading your orders...</p>
          </LoadingSpinner>
        </OrdersContent>
      </OrdersContainer>
    );
  }

  if (error) {
    return (
      <OrdersContainer>
        <OrdersContent>
          <Title>My Orders</Title>
          <EmptyOrders>
            <EmptyIcon>⚠️</EmptyIcon>
            <EmptyMessage>{error}</EmptyMessage>
            <button 
              className="btn btn-primary"
              onClick={fetchOrders}
            >
              Try Again
            </button>
          </EmptyOrders>
        </OrdersContent>
      </OrdersContainer>
    );
  }

  if (orders.length === 0) {
    return (
      <OrdersContainer>
        <OrdersContent>
          <Title>My Orders</Title>
          <EmptyOrders>
            <EmptyIcon>📦</EmptyIcon>
            <EmptyMessage>You haven't placed any orders yet.</EmptyMessage>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </EmptyOrders>
        </OrdersContent>
      </OrdersContainer>
    );
  }

  return (
    <OrdersContainer>
      <OrdersContent>
        <Title>My Orders</Title>
        
        <OrdersList>
          {orders.map(order => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <OrderInfo>
                  <OrderId>Order #{order.id.slice(-8).toUpperCase()}</OrderId>
                  <OrderDate>
                    <FiCalendar />
                    Placed on {formatDate(order.createdAt)}
                  </OrderDate>
                </OrderInfo>
                
                <OrderStatus status={order.status}>
                  <StatusIcon status={order.status} />
                  {getStatusText(order.status)}
                </OrderStatus>
              </OrderHeader>

              <OrderItems>
                {order.items.map((item, index) => (
                  <OrderItem key={index}>
                    <ItemImage>
                      {getProductEmoji(item.category)}
                    </ItemImage>
                    <ItemInfo>
                      <ItemName>{item.name}</ItemName>
                      <ItemDetails>
                        {item.brand} • Qty: {item.quantity} • ${item.price} each
                      </ItemDetails>
                    </ItemInfo>
                    <ItemPrice>
                      ${(item.price * item.quantity).toFixed(2)}
                    </ItemPrice>
                  </OrderItem>
                ))}
              </OrderItems>

              <OrderSummary>
                <TotalAmount>
                  <FiDollarSign />
                  Total: ${order.total.toFixed(2)}
                </TotalAmount>
                
                {order.status === 'shipped' && (
                  <TrackingInfo>
                    <FiTruck />
                    Estimated delivery: 2-3 business days
                  </TrackingInfo>
                )}
                
                {order.status === 'delivered' && (
                  <TrackingInfo>
                    <FiCheck />
                    Delivered successfully
                  </TrackingInfo>
                )}
              </OrderSummary>
            </OrderCard>
          ))}
        </OrdersList>
      </OrdersContent>
    </OrdersContainer>
  );
};

export default Orders;