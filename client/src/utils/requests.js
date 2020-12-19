import axios from 'axios';


export const get = async (endpoint, params) => {
    return await axios.get(`https://casescan.herokuapp.com${endpoint}`, { params });
}

export const post = async (endpoint, body) => {
    return await axios.post(`https://casescan.herokuapp.com${endpoint}`, { data: body})
}