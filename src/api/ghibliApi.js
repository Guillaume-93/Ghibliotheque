import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getFilms = () => api.get('/films');
export const getFilmById = (id) => api.get(`/films/${id}`);
export const getPeoples = () => api.get('/people');
export const getPeopleById = (id) => api.get(`/people/${id}`);
export const getSpecies = () => api.get('/species');
export const getSpecieById = (id) => api.get(`/species/${id}`);
export const getLocations = () => api.get('/locations');
export const getLocationById = (id) => api.get(`/locations/${id}`);
export const getVehicles = () => api.get('/vehicles');
export const getVehicleById = (id) => api.get(`/vehicles/${id}`);
