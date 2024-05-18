import axios from 'axios';

export default axios.create({
    baseURL: 'http:// 192.168.0.109:5000/',
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