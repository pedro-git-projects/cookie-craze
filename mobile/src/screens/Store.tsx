import { useCallback, useState } from 'react';
import { MainTabsScreenProps } from '../navigation/types';
import { useAuth } from '../state/AuthProvider';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ItemData {
  id: number;
  name: string;
  description: string;
  scoreModifier: number;
  price: number;
}

// TODO: display insufficient funds message
const StoreScreen: React.FC<MainTabsScreenProps<'Store'>> = ({
  navigation,
}) => {
  const { accessToken } = useAuth();
  const [data, setData] = useState<ItemData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
  const ip = process.env.EXPO_PUBLIC_IP_ADDRESS;

  const fetchData = async () => {
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

  useFocusEffect(
    useCallback(() => {
      if (accessToken) {
        fetchData();
      }
      return () => {};
    }, [accessToken]),
  );

  const renderItem = ({ item }: { item: ItemData }) => (
    <View
      style={[
        { padding: 16, borderRadius: 8, marginBottom: 16 },
        { backgroundColor: '#fbf1c7' },
      ]}
    >
      <Text style={styles.headerText}>Nome: {item.name}</Text>
      <Text style={styles.scoreText}>Descrição: {item.description}</Text>
      <Text style={styles.scoreText}>
        Modificador: {item.scoreModifier + ' por click'}
      </Text>
      <Text style={styles.scoreText}>Preço: {item.price}</Text>
      <TouchableOpacity
        style={styles.purchaseButton}
        onPress={() => handlePurchase(item)}
      >
        <Text style={styles.purchaseButtonText}>Comprar</Text>
      </TouchableOpacity>
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
        console.log('comprado com sucesso:', response.data);
      } catch (err) {
        console.error('erro comprando item:', err);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleText}>🛒 Loja 🍪</Text>
      </View>
      <View style={styles.flatList}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.confirmationText}>
                Realmente deseja comprar {selectedItem?.name}?
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.confirmationText}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmPurchase}
                >
                  <Text style={styles.confirmationText}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

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
  modalContainer: {
    backgroundColor: '#fbf1c7',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
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
    color: 'white',
    fontWeight: 'bold',
  },
});
export default StoreScreen;
