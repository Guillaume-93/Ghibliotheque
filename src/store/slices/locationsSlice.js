import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFilmById, getLocations, getPeopleById } from '../../api/ghibliApi';

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async () => {
    const { data: locations } = await getLocations();

    const locationPromises = locations.map(async (location) => {
        const residentsData = await Promise.all(location.residents
            .filter(residentUrl => !residentUrl.includes('TODO'))
            .map(async (residentUrl) => {
                return await getPeopleById(residentUrl.split('/').pop());
            })
        );

        const filmsData = await Promise.all(location.films.map(async (filmUrl) => {
            return await getFilmById(filmUrl.split('/').pop());
        }));

        return {
            ...location,
            residents: residentsData.map(({ data }) => data),
            films: filmsData.map(({ data }) => data),
        };
    });

    return await Promise.all(locationPromises);
});

const locationsSlice = createSlice({
    name: 'locations',
    initialState: {
        locations: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.locations = action.payload;
            })
            .addCase(fetchLocations.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default locationsSlice.reducer;
