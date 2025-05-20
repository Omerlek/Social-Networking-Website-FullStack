import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

export const createChatz = (data) => API.post('/chat/', data);

export const userChats = (id) => API.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);

export const createChatIfNotExists = (senderId, receiverId) =>
  axios.post("/chat/create", { senderId, receiverId });

export const deleteChat = (chatId) => API.delete(`/chat/${chatId}`);
