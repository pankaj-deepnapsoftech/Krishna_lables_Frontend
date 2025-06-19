import axios from 'axios';

const axiosHandler = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL, 
    // headers: {
    //     'Content-Type': 'multipart/form-data',
    // },
});

export default axiosHandler;
