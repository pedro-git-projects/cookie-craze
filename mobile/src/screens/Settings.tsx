import { useCallback, useState } from 'react';
import { MainTabsScreenProps } from '../navigation/types';
import { useAuth } from '../state/AuthProvider';
import axios from 'axios';
import {
  BackHandler,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import scoreSavedEmitter from '../state/ScoreSavedEmitter';

interface UserData {
  username: string;
  score: number;
}

const SettingsScreen: React.FC<MainTabsScreenProps<'Settings'>> = ({
  navigation,
}) => {
  const { accessToken } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const ip = process.env.EXPO_PUBLIC_IP_ADDRESS;

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
      if (accessToken) {
        scoreSavedEmitter.on('score-saved', () => fetchData());
        fetchData();
      }
      return () => {};
    }, [accessToken]),
  );

  const handleDeleteUser = () => setShowConfirmationModal(true);

  const handleConfirmDelete = () => {
    axios
      .delete(`http://${ip}:3000/users/self`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        BackHandler.exitApp();
      })
      .catch((err) => {
        console.log('error deleting user ', err);
      })
      .finally(() => {
        setShowConfirmationModal(false);
      });
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        {userData ? (
          <>
            <Text style={styles.headerText}>Usuário: {userData.username}</Text>
            <Text style={styles.scoreText}>
              🍪 Pontuação: {userData.score} 🍪
            </Text>
            <TouchableOpacity
              onPress={handleDeleteUser}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Deletar Conta</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text>Carregando dados...</Text>
        )}
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={showConfirmationModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.confirmationText}>
              Tem certeza que quer excluir sua conta?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.cancelButton}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmDelete}
                style={styles.confirmButton}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#cc241d',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
    backgroundColor: '#cc241d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
