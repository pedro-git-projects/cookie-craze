import React, { useState } from 'react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO actually implement the handler
  const handleRegister = () => 'Registered!';

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
