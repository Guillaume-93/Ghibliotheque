import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFilmById, getPeopleById, getPeoples, getSpecieById } from '../../api/ghibliApi';

export const fetchPeoples = createAsyncThunk('people/fetchPeoples', async () => {
    const { data: peoples } = await getPeoples();

    const characterPromises = peoples.map(people => getPeopleById(people.id));
    const charactersData = await Promise.all(characterPromises);

    const filmIds = new Set();
    const speciesIds = new Set();

    charactersData.forEach(({ data: char }) => {
        char.films.forEach(filmUrl => filmIds.add(filmUrl.split('/').pop()));
        const speciesId = char.species.split('/').pop();
        if (speciesId) {
            speciesIds.add(speciesId);
        }
    });

    const films = await Promise.all([...filmIds].map(id => getFilmById(id)));
    const species = await Promise.all([...speciesIds].map(id => getSpecieById(id)));

    const filmMap = new Map(films.map(({ data: film }) => [film.id, film.title]));
    const speciesMap = new Map(species.map(({ data: spec }) => [spec.id, spec.name]));

    return charactersData.map(({ data: char }) => ({
        ...char,
        films: char.films.map(filmUrl => ({ id: filmUrl.split('/').pop(), title: filmMap.get(filmUrl.split('/').pop()) })),
        species: speciesMap.get(char.species.split('/').pop())
    }));
});

const peopleSlice = createSlice({
    name: 'people',
    initialState: {
        peoples: [],
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPeoples.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPeoples.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.peoples = action.payload;
            })
            .addCase(fetchPeoples.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default peopleSlice.reducer;
