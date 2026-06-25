// import axios from 'axios';
// import { API_URL } from '../constants';

// const instance = axios.create({
//     baseURL: API_URL,
// });

// instance.interceptors.push({
//     response: (response) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             response.headers.Authorization = `Bearer ${token}`;
//         }
//         return response;
//     },
// });

// export default instance;