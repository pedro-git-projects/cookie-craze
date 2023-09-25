import axios from 'axios';
import LeaderboardEntry from '../types/leaderboard.d';
import React from 'react';
import { UserData } from '../types/user.d';
import { ItemData } from '../types/item.d';

export const fetchUserDataAndUpdateRef = async (
  accessToken: string | null,
  ip: string | undefined,
  setScore: React.Dispatch<React.SetStateAction<number | null>>,
  scoreRef: React.MutableRefObject<number | null>,
) => {
  axios
    .get(`http://${ip}:3000/users/self`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      const newScore = response.data.score;
      setScore(newScore);
      scoreRef.current = newScore;
    })
    .catch((err) => {
      console.error('error fetching initial score:', err);
    });
};

export const fetchGreatestScoreModifier = async (
  accessToken: string | null,
  ip: string | undefined,
  setScoreModifier: React.Dispatch<React.SetStateAction<number | null>>,
) => {
  try {
    const itemResponse = await axios.get(
      `http://${ip}:3000/users/items/greatest`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (itemResponse.data.item && itemResponse.data.item.scoreModifier) {
      setScoreModifier(itemResponse.data.item.scoreModifier);
    }
  } catch (err) {
    console.error('error fetching item data:', err);
  }
};

export const fetchLeaderboard = async (
  accessToken: string | null,
  ip: string | undefined,
  setLeaderboardData: React.Dispatch<React.SetStateAction<LeaderboardEntry[]>>,
) => {
  try {
    const response = await axios.get(`http://${ip}:3000/users/leaderboard`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setLeaderboardData(response.data);
  } catch (err) {
    console.error('error fetching leaderboard data:', err);
  }
};

export const fetchUserData = async (
  accessToken: string | null,
  ip: string | undefined,
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>,
) => {
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

export const fetchItemData = async (
  accessToken: string | null,
  ip: string | undefined,
  setItemData: React.Dispatch<React.SetStateAction<ItemData[]>>,
) => {
  try {
    const response = await axios.get(`http://${ip}:3000/store/items`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    setItemData(response.data);
  } catch (err) {
    console.error('error fetching leaderboard data:', err);
  }
};

export const purchaseItem = async (
  accessToken: string | null,
  ip: string | undefined,
  selectedItem: ItemData,
  setIsFailModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSuccessModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => {
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
    if (response.data.message === 'Insufficient score to purchase this item') {
      setIsFailModalVisible(true);
    } else {
      setIsSuccessModalVisible(true);
    }
  } catch (err) {
    console.error('erro comprando item:', err);
  }
};
