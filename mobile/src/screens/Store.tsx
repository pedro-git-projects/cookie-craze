import { useCallback, useState } from 'react';
import { MainTabsScreenProps } from '../navigation/types';
import { useAuth } from '../state/AuthProvider';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ConfirmationModal from '../components/ConfirmationModal';
import MessageModal from '../components/MessageModal';
import scoreSavedEmitter from '../state/ScoreSavedEmitter';

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

const StoreScreen: React.FC<MainTabsScreenProps<'Store'>> = ({
  navigation,
}) => {
  const { accessToken } = useAuth();
  const [data, setData] = useState<ItemData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFailModalVisible, setIsFailModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const ip = process.env.EXPO_PUBLIC_IP_ADDRESS;

  const fetchItemData = async () => {
    try {
      const response = await axios.get(`http://${ip}:3000/store/items`, {
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
      .get(`http://${ip}:3000/users/self`, {
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

  useFocusEffect(
    useCallback(() => {
      scoreSavedEmitter.on('score-saved', () => {
        fetchData();
      });
      if (accessToken) {
        fetchItemData();
        fetchData();
      }
      return () => {};
    }, [accessToken]),
  );

  const renderItem = ({ item }: { item: ItemData }) => (
    <View style={itemStyle.storeItemStyles}>
      <View style={itemStyle.cardContent}>
        <Text style={itemStyle.headerText}>Nome: {item.name}</Text>
        <Text style={itemStyle.scoreText}>Descrição: {item.description}</Text>
        <Text style={itemStyle.scoreText}>
          Modificador: {item.scoreModifier + ' por click'}
        </Text>
        <Text style={itemStyle.scoreText}>Preço: {item.price}</Text>
        <TouchableOpacity
          style={itemStyle.purchaseButton}
          onPress={() => handlePurchase(item)}
        >
          <Text style={itemStyle.purchaseButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handlePurchase = (item: ItemData) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const confirmPurchase = async () => {
    setIsModalVisible(false);
    if (selectedItem) {
      try {
        const response = await axios.post(
          `http://${ip}:3000/users/purchase/`,
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

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleText}>🛒 Loja 🍪</Text>
        <Text style={styles.titleText}>Saldo: {userData?.score}</Text>
      </View>
      <View style={styles.flatList}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <ConfirmationModal
          mainMessage={'Realmente deseja comprar ' + selectedItem?.name}
          btn1Msg="Não"
          btn2Msg="Sim"
          visibility={isModalVisible}
          onPressBtn1={() => setIsModalVisible(false)}
          onPressBtn2={confirmPurchase}
        />
        <MessageModal
          mainMessage="Saldo insuficente!"
          btn1Msg="Ok"
          onPressBtn1={() => setIsFailModalVisible(false)}
          visibility={isFailModalVisible}
        />
        <MessageModal
          mainMessage="Comprado com sucesso!"
          btn1Msg="Ok"
          onPressBtn1={() => setIsSuccessModalVisible(false)}
          visibility={isSuccessModalVisible}
        />
      </View>
    </>
  );
};

const itemStyle = StyleSheet.create({
  storeItemStyles: {
    flexDirection: 'column',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fbf1c7',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  purchaseButton: {
    backgroundColor: '#8ec07c',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  purchaseButtonText: {
    color: '#282828',
    fontWeight: 'bold',
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 2,
    padding: 16,
    backgroundColor: '#282828',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    padding: 16,
    backgroundColor: '#282828',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbf1c7',
  },
  storeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: '#fbf1c7',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fbf1c7',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  cancelButton: {
    backgroundColor: '#928374',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#8ec07c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#282828',
    fontWeight: 'bold',
  },
});

export default StoreScreen;
