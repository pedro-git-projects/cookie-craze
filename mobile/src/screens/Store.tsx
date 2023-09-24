import { useCallback, useState } from 'react';
import { MainTabsScreenProps } from '../navigation/types';
import { useAuth } from '../state/AuthProvider';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

interface ItemData {
  id: number;
  name: string;
  description: string;
  scoreModifier: number;
  price: number;
}

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
    <View style={{ padding: 16 }}>
      <Text>Nome: {item.name}</Text>
      <Text>Descrição: {item.description}</Text>
      <Text>Modificador: {item.scoreModifier + ' por click'}</Text>
      <Text>Preço: {item.price}</Text>
      <TouchableOpacity onPress={() => handlePurchase(item)}>
        <Text>Purchase</Text>
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
    <View>
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
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Confirm purchase of {selectedItem?.name}?</Text>
            <TouchableOpacity onPress={confirmPurchase}>
              <Text>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default StoreScreen;
