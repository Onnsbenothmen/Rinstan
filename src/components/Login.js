import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import { Button, Form, Input, Typography, Alert } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

const Login = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState(null);

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/login', values);
      login(response.data.token);

      // Redirect to FundsList page after successful login
      history.push('/Listfund');
    } catch (error) {
      setLoginError(error.response ? error.response.data.message : 'Erreur inconnue');
    }
  };

  const handleSignUpLinkClick = () => {
    history.push('/signup');
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundImage: 'url("https://example.com/background.jpg")', // Ajoutez votre URL d'image de fond
      backgroundColor: '#f0f2f5', // Ajoutez votre couleur de fond préférée
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '400px'
      }}>
        <Title level={2}>Connexion</Title>
        {loginError && <Alert message={loginError} type="error" showIcon style={{ marginBottom: '16px' }} />}
        <Form onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Veuillez saisir votre email' }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: 'Veuillez saisir votre mot de passe' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Se connecter
            </Button>
          </Form.Item>
        </Form>
        <Text>
          Vous n'avez pas de compte ?{' '}
          <Link to="/signup" onClick={handleSignUpLinkClick}>
            Inscrivez-vous ici
          </Link>
        </Text>
        <Link to="/Listfund" onClick={handleSignUpLinkClick}>
          <Button style={{ marginTop: '16px', width: '100%' }}>Listfund</Button>
        </Link>
        <Link to="/UserList" onClick={handleSignUpLinkClick}>
          <Button style={{ marginTop: '8px', width: '100%' }}>La liste des utilisateurs</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
