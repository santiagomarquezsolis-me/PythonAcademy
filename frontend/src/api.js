import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
});

export const evaluateCode = async (levelId, userCode) => {
  try {
    const response = await api.post('/evaluate', {
      level_id: levelId,
      user_code: userCode,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return { success: false, output: `Error: ${error.response.data.detail || error.message}` };
    }
    return { success: false, output: "Error de conexión con el servidor de evaluación." };
  }
};
