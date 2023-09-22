import { useState } from 'react';
import logo from '../assets/mascot.png';

const Forgot: React.FC = () => {
  const [email, setEmail] = useState(''); // State for the email

  const handleSendEmail = () => {
    // TODO: Handle sending the recovery email
    console.log('Sending recovery email to:', email);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4">Recuperar Senha</h1>

      <img src={logo} alt="Logo" className="w-32 h-32 mb-4" />

      <p className="mb-4">
        Digite o seu endereço de email para recuperar a senha.
      </p>

      <input
        type="text"
        placeholder="Email"
        className="w-64 h-10 p-2 border rounded mb-4"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <button
        onClick={handleSendEmail}
        className="w-64 h-10 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Enviar email de recuperação
      </button>
    </div>
  );
};

export default Forgot;
