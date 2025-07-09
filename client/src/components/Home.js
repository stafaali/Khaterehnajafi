import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowRight, FiStar, FiShoppingBag } from 'react-icons/fi';
import { useApp } from '../App';

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #ffeef8 0%, #f8e8ff 100%);
  padding: 4rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #e91e63, #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #e91e63, #f06292);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 8px 32px rgba(233, 30, 99, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 40px rgba(233, 30, 99, 0.4);
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 0;
  background: rgba(255, 255, 255, 0.5);
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  background: linear-gradient(45deg, #e91e63, #f06292);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const FeaturedProducts = styled.section`
  padding: 4rem 0;
`;

const ProductsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.div`
  height: 250px;
  background: linear-gradient(45deg, #ffeef8, #f8e8ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: #e91e63;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ProductBrand = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
  color: #ffc107;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #e91e63;
  margin-bottom: 1rem;
`;

const AddToCartBtn = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(45deg, #e91e63, #f06292);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
  }
`;

const Home = () => {
  const { state, addToCart } = useApp();
  
  const featuredProducts = state.products.slice(0, 4);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar key={i} fill={i < Math.floor(rating) ? '#ffc107' : 'none'} />
    ));
  };

  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Discover Your Beauty</HeroTitle>
          <HeroSubtitle>
            Premium cosmetics and beauty products to enhance your natural glow. 
            Shop the latest trends and timeless classics from top brands.
          </HeroSubtitle>
          <CTAButton to="/products">
            Shop Now
            <FiArrowRight />
          </CTAButton>
        </HeroContent>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        <div className="container">
          <SectionTitle>Why Choose GlamourShop?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🎨</FeatureIcon>
              <FeatureTitle>Premium Quality</FeatureTitle>
              <FeatureDescription>
                Carefully curated collection of high-quality cosmetics from trusted brands worldwide.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>🚚</FeatureIcon>
              <FeatureTitle>Fast Delivery</FeatureTitle>
              <FeatureDescription>
                Quick and secure shipping to your doorstep with tracking and insurance included.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>💎</FeatureIcon>
              <FeatureTitle>Expert Curation</FeatureTitle>
              <FeatureDescription>
                Products selected by beauty experts to ensure you get the best for your skin and style.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      {/* Featured Products */}
      <FeaturedProducts>
        <div className="container">
          <SectionTitle>Featured Products</SectionTitle>
          <ProductsGrid>
            {featuredProducts.map(product => (
              <ProductCard key={product.id}>
                <ProductImage>💄</ProductImage>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductBrand>{product.brand}</ProductBrand>
                  <ProductRating>
                    {renderStars(product.rating)}
                    <span style={{ color: '#666', marginLeft: '0.5rem' }}>
                      ({product.reviews})
                    </span>
                  </ProductRating>
                  <ProductPrice>${product.price}</ProductPrice>
                  <AddToCartBtn 
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? (
                      <>
                        <FiShoppingBag style={{ marginRight: '0.5rem' }} />
                        Add to Cart
                      </>
                    ) : (
                      'Out of Stock'
                    )}
                  </AddToCartBtn>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>
        </div>
      </FeaturedProducts>
    </HomeContainer>
  );
};

export default Home;