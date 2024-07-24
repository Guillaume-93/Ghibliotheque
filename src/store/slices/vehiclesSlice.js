import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFilmById, getPeopleById, getVehicles } from '../../api/ghibliApi';

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async () => {
    const { data: vehicles } = await getVehicles();

    const vehiclePromises = vehicles.map(async (vehicle) => {
        const { data: pilotData } = await getPeopleById(vehicle.pilot.split('/').pop());

        const filmPromises = vehicle.films.map(async (filmUrl) => {
            const filmId = filmUrl.split('/').pop();
            const { data: filmData } = await getFilmById(filmId);
            return filmData;
        });
        const filmsData = await Promise.all(filmPromises);

        return {
            ...vehicle,
            pilot: pilotData,
            films: filmsData,
        };
    });

    return await Promise.all(vehiclePromises);
});

const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState: {
        vehicles: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.vehicles = action.payload;
            })
            .addCase(fetchVehicles.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default vehiclesSlice.reducer;
