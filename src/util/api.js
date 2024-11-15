import axios from 'axios';

/* export default axios.create({
    baseURL: 'https://web3-backend-chi.vercel.app',
    headers: {
        'Content-Type': 'application/json',
    }
}); */
export default axios.create({
    baseURL: 'http://localhost:5000/',
    headers: {
        'Content-Type': 'application/json',
    }
});

/* export default axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
    }
}); */