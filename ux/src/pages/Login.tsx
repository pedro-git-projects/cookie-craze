import React, { useState } from 'react';
import logo from '../assets/mascot.png';
import NavigableText from '../components/NavigableText';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = () => {
    // TODO: handle login
    setLoginFailed(true);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={logo} alt="Logo" className="w-32 h-32 mb-8" />

      <div className="w-72">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full h-10 p-2 mb-4 border rounded"
        />

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full h-10 p-2 mb-4 border rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full h-10 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Entrar
        </button>
      </div>

      {/* Conditional rendering based on loginFailed state */}
      {loginFailed && (
        <p className="text-red-500 mt-4">
          <NavigableText
            text="Esqueceu a senha? Clique aqui para recuperar"
            textColor="#fb4934"
            to="/forgot"
          />
        </p>
      )}

      <div className="text-yellow-500 mt-4">
        <NavigableText
          text="Não está cadastrado? Criar conta"
          textColor="#fabd2f"
          to="/register"
        />
      </div>
    </div>
  );
};

export default Login;
