import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useApp } from '../App';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`;

const RegisterCard = styled.div`
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

const RegisterButton = styled.button`
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

const SuccessMessage = styled.div`
  background: #e8f5e8;
  color: #2e7d32;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 1rem;
  font-size: 14px;
  border: 1px solid #c8e6c9;
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

const LoginLink = styled.div`
  text-align: center;
`;

const LoginText = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const LoginButton = styled(Link)`
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

const PasswordStrength = styled.div`
  margin-top: 0.5rem;
  font-size: 12px;
  color: ${props => {
    if (props.strength === 'weak') return '#f44336';
    if (props.strength === 'medium') return '#ff9800';
    if (props.strength === 'strong') return '#4caf50';
    return '#666';
  }};
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { state, register } = useApp();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'weak';
    if (password.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return 'medium';
    return 'strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    } else {
      setError(result.error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <RegisterContainer>
      <RegisterCard>
        <Logo>
          <LogoIcon>💄</LogoIcon>
          <LogoText>GlamourShop</LogoText>
          <Subtitle>Create your account to start shopping</Subtitle>
        </Logo>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          <InputGroup>
            <InputIcon>
              <FiUser />
            </InputIcon>
            <Input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputGroup>

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
            {formData.password && (
              <PasswordStrength strength={passwordStrength}>
                Password strength: {passwordStrength}
              </PasswordStrength>
            )}
          </InputGroup>

          <InputGroup>
            <InputIcon>
              <FiLock />
            </InputIcon>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
          </InputGroup>

          <RegisterButton type="submit" disabled={state.loading}>
            {state.loading ? 'Creating Account...' : 'Create Account'}
          </RegisterButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <LoginLink>
          <LoginText>Already have an account?</LoginText>
          <LoginButton to="/login">
            Sign In
          </LoginButton>
        </LoginLink>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;