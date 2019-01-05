import axios from 'axios';

const ordersInstance = axios.create({
    baseURL: "https://burger-builder-react-699d5.firebaseio.com"
});

export default ordersInstance;