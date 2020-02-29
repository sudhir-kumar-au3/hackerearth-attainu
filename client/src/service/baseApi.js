import axios from 'axios';
const baseApi = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        "content-Type": "application/json"
    }
});
export default baseApi;