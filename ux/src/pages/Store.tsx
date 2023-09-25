import { useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthProvider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PurchaseConfirmationModal from '../components/PurchaseModal';
import InsufficientBalanceModal from '../components/InsuficientBalanceModal';
import PurchaseSuccessModal from '../components/PurchaseSuccessModal';
import BottomNavigation from '../components/BottomNavigation';

interface ItemData {
  id: number;
  name: string;
  description: string;
  scoreModifier: number;
  price: number;
}

interface UserData {
  username: string;
  score: number;
}

const Store: React.FC = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ItemData[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFailModalVisible, setIsFailModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const fetchItemData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/store/items`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response.data);
    } catch (err) {
      console.error('error fetching leaderboard data:', err);
    }
  };

  const fetchData = async () => {
    axios
      .get(`http://localhost:3000/users/self`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.log('error fetching user data ', err);
      });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    }
    fetchData();
    fetchItemData();
  }, []);

  const handlePurchase = (item: ItemData) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const confirmPurchase = async () => {
    setIsModalVisible(false);
    if (selectedItem) {
      try {
        const response = await axios.post(
          `http://localhost:3000/users/purchase/`,
          {
            itemId: selectedItem.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        if (
          response.data.message === 'Insufficient score to purchase this item'
        ) {
          setIsFailModalVisible(true);
        } else {
          setIsSuccessModalVisible(true);
        }
      } catch (err) {
        console.error('erro comprando item:', err);
      }
    }
  };

  const renderItem = ({ item }: { item: ItemData }) => (
    <div className="p-4 border rounded-lg mb-4">
      <div className="text-lg font-semibold">{item.name}</div>
      <div className="text-gray-600">{item.description}</div>
      <div className="text-blue-500">
        Modificador: {item.scoreModifier} por click
      </div>
      <div className="text-green-500">Preço: {item.price}</div>
      <button
        onClick={() => handlePurchase(item)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
      >
        Comprar
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-4">
        <div className="text-3xl mb-4">🛒 Loja 🍪</div>
        <div className="text-xl">Saldo: {userData?.score}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((item) => (
            <div key={item.id}>{renderItem({ item })}</div>
          ))}
        </div>

        {isModalVisible && selectedItem && (
          <PurchaseConfirmationModal
            itemName={selectedItem.name}
            onCancel={() => setIsModalVisible(false)}
            onConfirm={confirmPurchase}
          />
        )}

        {isFailModalVisible && (
          <InsufficientBalanceModal
            onClose={() => setIsFailModalVisible(false)}
          />
        )}

        {isSuccessModalVisible && (
          <PurchaseSuccessModal
            onClose={() => setIsSuccessModalVisible(false)}
          />
        )}
      </div>
      <div>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Store;
