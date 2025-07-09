import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft, FiStar, FiShoppingBag, FiMinus, FiPlus, FiHeart } from 'react-icons/fi';
import { useApp } from '../App';

const DetailContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const DetailContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainImage = styled.div`
  aspect-ratio: 1;
  background: linear-gradient(45deg, #ffeef8, #f8e8ff);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  color: #e91e63;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CategoryBadge = styled.span`
  background: linear-gradient(45deg, #e91e63, #f06292);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  align-self: flex-start;
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0;
  line-height: 1.2;
`;

const BrandName = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin: 0;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StarRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #ffc107;
`;

const ReviewCount = styled.span`
  color: #666;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #e91e63;
`;

const StockStatus = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
  font-size: 0.9rem;
  background: ${props => props.inStock ? '#e8f5e8' : '#ffebee'};
  color: ${props => props.inStock ? '#2e7d32' : '#c62828'};
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityLabel = styled.span`
  font-weight: 500;
  color: #333;
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
  width: 40px;
  height: 40px;
  border: none;
  background: #e91e63;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
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
  min-width: 40px;
  text-align: center;
  font-size: 1.1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #e91e63, #f06292);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(233, 30, 99, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const WishlistButton = styled.button`
  padding: 1rem;
  background: transparent;
  color: #e91e63;
  border: 2px solid #e91e63;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e91e63;
    color: white;
  }
`;

const Features = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const FeaturesTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  padding: 0.5rem 0;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '✓';
    color: #4caf50;
    font-weight: bold;
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const { state, addToCart } = useApp();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = state.products.find(p => p.id === id);

  useEffect(() => {
    if (!state.loading && state.products.length > 0 && !product) {
      navigate('/products');
    }
  }, [product, state.loading, state.products.length, navigate]);

  if (state.loading) {
    return (
      <DetailContainer>
        <div className="spinner"></div>
      </DetailContainer>
    );
  }

  if (!product) {
    return (
      <DetailContainer>
        <DetailContent>
          <NotFound>
            <h2>Product not found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn btn-primary">
              Back to Products
            </Link>
          </NotFound>
        </DetailContent>
      </DetailContainer>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar key={i} fill={i < Math.floor(rating) ? '#ffc107' : 'none'} />
    ));
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

  const features = [
    'Premium quality ingredients',
    'Long-lasting formula',
    'Dermatologist tested',
    'Cruelty-free',
    'Suitable for all skin types'
  ];

  return (
    <DetailContainer>
      <DetailContent>
        <BackLink to="/products">
          <FiArrowLeft />
          Back to Products
        </BackLink>

        <ProductGrid>
          <ImageSection>
            <MainImage>
              {getProductEmoji(product.category)}
            </MainImage>
          </ImageSection>

          <ProductInfo>
            <CategoryBadge>{product.category}</CategoryBadge>
            
            <div>
              <ProductTitle>{product.name}</ProductTitle>
              <BrandName>{product.brand}</BrandName>
            </div>

            <RatingSection>
              <StarRating>
                {renderStars(product.rating)}
              </StarRating>
              <ReviewCount>({product.reviews} reviews)</ReviewCount>
            </RatingSection>

            <PriceSection>
              <Price>${product.price}</Price>
              <StockStatus inStock={product.inStock}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </StockStatus>
            </PriceSection>

            <Description>{product.description}</Description>

            <QuantitySection>
              <QuantityLabel>Quantity:</QuantityLabel>
              <QuantityControls>
                <QuantityButton
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <FiMinus />
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  <FiPlus />
                </QuantityButton>
              </QuantityControls>
            </QuantitySection>

            <ActionButtons>
              <AddToCartButton
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <FiShoppingBag />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </AddToCartButton>
              
              <WishlistButton onClick={toggleWishlist}>
                <FiHeart fill={isWishlisted ? '#e91e63' : 'none'} />
              </WishlistButton>
            </ActionButtons>
          </ProductInfo>
        </ProductGrid>

        <Features>
          <FeaturesTitle>Product Features</FeaturesTitle>
          <FeaturesList>
            {features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeaturesList>
        </Features>
      </DetailContent>
    </DetailContainer>
  );
};

export default ProductDetail;