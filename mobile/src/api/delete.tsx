import axios from 'axios';
import { BackHandler } from 'react-native';

export const deleteUser = (
  accessToken: string | null,
  ip: string | undefined,
) => {
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
    });
};
