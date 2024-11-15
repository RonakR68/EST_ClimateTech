import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL+'/api/climate-changes';
console.log(API_URL);
export const fetchClimateChanges = async () => {
    return await axios.get(`${API_URL}`);
};

export const fetchClimateChangeById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const fetchDisasterById = async (id) => {
    return await axios.get(`${API_URL}/disaster/${id}`);
};

export const fetchAllClimateChanges = async () => {
    return await axios.get(API_URL);
};