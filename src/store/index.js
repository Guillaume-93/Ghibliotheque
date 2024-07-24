import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from './slices/filmsSlice';
import locationsReducer from './slices/locationsSlice';
import peopleReducer from './slices/peopleSlice';
import speciesReducer from './slices/speciesSlice';
import vehiclesReducer from './slices/vehiclesSlice';

export const store = configureStore({
    reducer: {
        films: filmsReducer,
        locations: locationsReducer,
        people: peopleReducer,
        species: speciesReducer,
        vehicles: vehiclesReducer,
    },
});

export default store;
