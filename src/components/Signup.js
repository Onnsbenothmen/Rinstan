// SignUp.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/signup', formData);
      history.push('/login');
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error.response ? error.response.data.message : 'Erreur inconnue');
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSignUp}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Prénom:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Nom de famille:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Mot de passe:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;
