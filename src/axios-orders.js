import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-fff98.firebaseio.com/',
});

export default instance;