import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFilmById, getFilms, getPeopleById, getSpecieById, getVehicleById } from '../../api/ghibliApi';

export const fetchFilms = createAsyncThunk('films/fetchFilms', async () => {
    const { data: films } = await getFilms();
    return films;
});

export const fetchFilmById = createAsyncThunk('films/fetchFilmById', async (id) => {
    const { data: film } = await getFilmById(id);

    const characters = await Promise.all(film.people.map(async (url) => {
        const { data } = await getPeopleById(url.split('/').pop());
        return data;
    }));
    const species = await Promise.all(film.species.map(async (url) => {
        const { data } = await getSpecieById(url.split('/').pop());
        return data;
    }));
    const vehicles = await Promise.all(film.vehicles.map(async (url) => {
        const { data } = await getVehicleById(url.split('/').pop());
        return data;
    }));

    return {
        film,
        characters,
        species,
        vehicles,
    };
});

const filmsSlice = createSlice({
    name: 'films',
    initialState: {
        films: [],
        selectedFilm: null,
        characters: [],
        species: [],
        vehicles: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.films = action.payload;
            })
            .addCase(fetchFilms.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchFilmById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFilmById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedFilm = action.payload.film;
                state.characters = action.payload.characters;
                state.species = action.payload.species;
                state.vehicles = action.payload.vehicles;
            })
            .addCase(fetchFilmById.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default filmsSlice.reducer;
