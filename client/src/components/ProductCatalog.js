import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch, FiFilter, FiStar, FiShoppingBag } from 'react-icons/fi';
import { useApp } from '../App';

const CatalogContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 0;
`;

const CatalogHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  margin-bottom: 2rem;
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

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #e91e63;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FilterSelect = styled.select`
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

const ProductImage = styled(Link)`
  display: block;
  height: 250px;
  background: linear-gradient(45deg, #ffeef8, #f8e8ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: #e91e63;
  text-decoration: none;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled(Link)`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  text-decoration: none;
  display: block;

  &:hover {
    color: #e91e63;
  }
`;

const ProductBrand = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ProductCategory = styled.span`
  background: linear-gradient(45deg, #e91e63, #f06292);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  display: inline-block;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
  color: #ffc107;
`;

const PriceAndCart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #e91e63;
`;

const AddToCartBtn = styled.button`
  padding: 0.75rem 1rem;
  background: linear-gradient(45deg, #e91e63, #f06292);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const NoProducts = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.2rem;
`;

const ProductCatalog = () => {
  const { state, addToCart } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const categories = useMemo(() => {
    const cats = [...new Set(state.products.map(p => p.category))];
    return cats.sort();
  }, [state.products]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = state.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [state.products, searchTerm, categoryFilter, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product);
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

  if (state.loading) {
    return (
      <CatalogContainer>
        <div className="spinner"></div>
      </CatalogContainer>
    );
  }

  return (
    <CatalogContainer>
      <CatalogHeader>
        <Title>Product Catalog</Title>
        
        <FilterSection>
          <SearchBox>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search products, brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBox>
          
          <FilterGroup>
            <FilterSelect
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FilterSelect>

            <FilterSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </FilterSelect>
          </FilterGroup>
        </FilterSection>
      </CatalogHeader>

      {filteredAndSortedProducts.length === 0 ? (
        <NoProducts>
          No products found matching your criteria.
        </NoProducts>
      ) : (
        <ProductsGrid>
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id}>
              <ProductImage to={`/products/${product.id}`}>
                {getProductEmoji(product.category)}
              </ProductImage>
              <ProductInfo>
                <ProductCategory>{product.category}</ProductCategory>
                <ProductName to={`/products/${product.id}`}>
                  {product.name}
                </ProductName>
                <ProductBrand>{product.brand}</ProductBrand>
                <ProductRating>
                  {renderStars(product.rating)}
                  <span style={{ color: '#666', marginLeft: '0.5rem' }}>
                    ({product.reviews})
                  </span>
                </ProductRating>
                <PriceAndCart>
                  <ProductPrice>${product.price}</ProductPrice>
                  <AddToCartBtn 
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? (
                      <>
                        <FiShoppingBag />
                        Add
                      </>
                    ) : (
                      'Out of Stock'
                    )}
                  </AddToCartBtn>
                </PriceAndCart>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}
    </CatalogContainer>
  );
};

export default ProductCatalog;