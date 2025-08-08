import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://13.60.245.143:5000/api';

// Configure axios with default headers
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export enum Role {
  USER = 'User',
}
 export interface User {
  nom: string;
  email: string;
  password: string;
  role: Role;
  telephone: string;
  avatar?: string; 
  createdAt?: Date;
}

export interface Meme {
  _id?: string;
  image: string;         // base64 ou URL
  topText: string;
  meduimText?: string;
  bottomText?: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  createdAt?: string;
  updatedAt?: string;
}





export const api = {


    // Authentication
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
  },

    register:  (data: FormData) => {
    return axios.post(`${API_URL}/auth/register`, data);
    
  },
   

logout: () => {
  const token = localStorage.getItem('token');

  return axios.post(`${API_URL}/auth/logout`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return res;
  })
  .catch(err => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw err;
  });
},

getuserprofil: async()=>{
    return axios.get(`${API_URL}/auth/profile`);
},

// MEMES
addMeme: async (data: FormData) => {
  return axios.post(`${API_URL}/memes/add`, data);
},

getMyMemes: async () => {
  return axios.get(`${API_URL}/memes/mine`);
},

getAllMemes: async () => {
  return axios.get(`${API_URL}/memes`);
},

updateMeme: async (id: string, data: FormData) => {
  return axios.put(`${API_URL}/memes/update/${id}`, data);
},

deleteMeme: async (id: string) => {
  return axios.delete(`${API_URL}/memes/delete/${id}`);
},

getPublicMemes: async () => {
  return axios.get(`${API_URL}/memes/public`);
},

shareMeme: async (id: string) => {
  return axios.patch(`${API_URL}/memes/share/${id}`);
},

likeMeme: async (id: string) => {
  return axios.patch(`${API_URL}/memes/like/${id}`);
},
loveMeme: async (id: string) => {
  return axios.patch(`${API_URL}/memes/love/${id}`);
},


}