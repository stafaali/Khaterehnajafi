import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiShoppingBag, FiUser, FiLogOut, FiHeart } from 'react-icons/fi';
import { useApp } from '../App';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(233, 30, 99, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(45deg, #e91e63, #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #e91e63;
  }
`;

const UserActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: rgba(233, 30, 99, 0.1);
    color: #e91e63;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: linear-gradient(45deg, #e91e63, #f06292);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const Header = () => {
  const { state, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <HeaderContainer>
      <NavContainer>
        <Logo to="/">
          <FiHeart />
          GlamourShop
        </Logo>
        
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
        </NavLinks>

        <UserActions>
          <IconButton as={Link} to="/cart">
            <FiShoppingBag />
            {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
          </IconButton>

          {state.user ? (
            <>
              <UserMenu>
                <FiUser />
                <span>Hi, {state.user.name || state.user.email}</span>
              </UserMenu>
              <NavLink to="/orders">Orders</NavLink>
              <IconButton onClick={handleLogout} title="Logout">
                <FiLogOut />
              </IconButton>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </UserActions>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;