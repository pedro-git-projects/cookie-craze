import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', {
        email,
        password,
      });

      const { access_token } = response.data;
      console.log(access_token);

      alert('Cadastrado com sucesso!');
      navigate('/');
    } catch (err) {
      console.log(err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        placeholder="Email"
        className="w-64 h-10 p-2 border rounded mb-4"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <input
        type="password"
        placeholder="Senha"
        className="w-64 h-10 p-2 border rounded mb-4"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button
        onClick={handleRegister}
        className="w-64 h-10 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Entrar
      </button>
    </div>
  );
};

export default Register;
