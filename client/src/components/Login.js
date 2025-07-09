import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useApp } from '../App';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 0 20px;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const LogoText = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(45deg, #e91e63, #9c27b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const Form = styled.form`
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #e91e63;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #e91e63;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(45deg, #e91e63, #f06292);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(233, 30, 99, 0.4);
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

const Divider = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e0e0e0;
  }
  
  span {
    background: white;
    padding: 0 1rem;
    color: #666;
    font-size: 14px;
  }
`;

const RegisterLink = styled.div`
  text-align: center;
`;

const RegisterText = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const RegisterButton = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background: transparent;
  color: #e91e63;
  border: 2px solid #e91e63;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #e91e63;
    color: white;
  }
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { state, login } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <LogoIcon>💄</LogoIcon>
          <LogoText>GlamourShop</LogoText>
          <Subtitle>Welcome back! Sign in to your account</Subtitle>
        </Logo>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <InputGroup>
            <InputIcon>
              <FiMail />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <FiLock />
            </InputIcon>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
          </InputGroup>

          <LoginButton type="submit" disabled={state.loading}>
            {state.loading ? 'Signing in...' : 'Sign In'}
          </LoginButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <RegisterLink>
          <RegisterText>Don't have an account?</RegisterText>
          <RegisterButton to="/register">
            Create Account
          </RegisterButton>
        </RegisterLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;