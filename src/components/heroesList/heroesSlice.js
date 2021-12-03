import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
};

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {
            state.heroesLoadingStatus = 'loading';
        },
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: state => {
            state.heroesLoadingStatus = 'error';
        },
        heroDelete: (state, action) => {
            state.heroes = state.heroes.filter(
                item => item.id !== action.payload
            );
        },
        heroAddToList: (state, action) => {
            state.heroes.push(action.payload);
        },
    },
});

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroDelete,
    heroAddToList,
} = heroesSlice.actions;
export default heroesSlice.reducer;
