import { useHttp } from '../../hooks/http.hook';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
};

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
    const { request } = useHttp();
    return request('http://localhost:3001/heroes');
});

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroDelete: (state, action) => {
            state.heroes = state.heroes.filter(
                item => item.id !== action.payload
            );
        },
        heroAddToList: (state, action) => {
            state.heroes.push(action.payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

export const { heroDelete, heroAddToList } = heroesSlice.actions;
export default heroesSlice.reducer;
