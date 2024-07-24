import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFilmById, getPeopleById, getSpecies } from '../../api/ghibliApi';

export const fetchSpecies = createAsyncThunk('species/fetchSpecies', async () => {
    const { data: species } = await getSpecies();

    const speciesPromises = species.map(async (spec) => {
        const characterIds = spec.people.map(url => url.split('/').pop());
        const characterPromises = characterIds.map(id => getPeopleById(id));
        const charactersData = await Promise.all(characterPromises);

        const filmIds = new Set();
        charactersData.forEach(({ data: char }) => {
            char.films.forEach(filmUrl => filmIds.add(filmUrl.split('/').pop()));
        });

        const filmPromises = [...filmIds].map(id => getFilmById(id));
        const filmsData = await Promise.all(filmPromises);

        const filmMap = new Map(filmsData.map(({ data: film }) => [film.id, film.title]));

        const detailedCharacters = charactersData.map(({ data: char }) => ({
            ...char,
            films: char.films.map(filmUrl => ({
                id: filmUrl.split('/').pop(),
                title: filmMap.get(filmUrl.split('/').pop())
            }))
        }));

        return {
            ...spec,
            characters: detailedCharacters.sort((a, b) => a.name.localeCompare(b.name)),
        };
    });

    return await Promise.all(speciesPromises);
});

const speciesSlice = createSlice({
    name: 'species',
    initialState: {
        species: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpecies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSpecies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.species = action.payload;
            })
            .addCase(fetchSpecies.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default speciesSlice.reducer;
