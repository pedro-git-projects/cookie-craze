import axios from 'axios';
import scoreSavedEmitter from '../state/ScoreSavedEmitter';

export const saveScore = (
  accessToken: string | null,
  ip: string | undefined,
  newScore: number,
) => {
  if (!accessToken) return;
  axios
    .patch(
      `http://${ip}:3000/users/score`,
      { score: newScore },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    .then(() => {
      scoreSavedEmitter.emit('score-saved', newScore);
    })
    .catch((error) => {
      console.error('Error saving score:', error);
    });
};
