import axios from 'axios';
import Server from '../server';

    const server = Server;

export default axios.create({
    baseURL: `${server}`
});