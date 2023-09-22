import { useEffect, useState } from 'react';
import BottomNavigation from '../components/BottomNavigation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthProvider';

interface UserData {
  email: string;
  score: number;
}

const Settings: React.FC = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
    axios;
    axios
      .get('http://localhost:3000/users/self', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleDeleteUser = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmDelete = () => {
    axios
      .delete('http://localhost:3000/users/self', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      })
      .finally(() => {
        setShowConfirmationModal(false);
      });
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {userData ? (
          <>
            <div className="text-xl font-semibold">
              {'Usuário: ' + userData.email}
            </div>
            <div className="text-xl font-semibold">
              {'🍪 Pontuação:' + userData.score + ' 🍪'}
            </div>
            <button
              onClick={handleDeleteUser}
              className=" bg-red-500 text-white px-2 py-1 rounded-lg mt-4 hover:bg-red-600"
            >
              Deletar Conta
            </button>
          </>
        ) : (
          <p>Carregando dados...</p>
        )}
      </div>

      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10">
            <p className="text-xl mb-4">
              Tem certeza que quer excluir sua conta?
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-lg mr-2 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
      <BottomNavigation />
    </div>
  );
};

export default Settings;
