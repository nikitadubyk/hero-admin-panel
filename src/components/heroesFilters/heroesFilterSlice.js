import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
};

const heroesFilterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {
            state.filtersLoadingStatus = 'loading';
        },
        filtersFetched: (state, action) => {
            state.filters = action.payload;
            state.filtersLoadingStatus = 'idle';
        },
        filtersFetchingError: state => {
            state.filtersLoadingStatus = 'error';
        },
        activeFilterChange: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
});

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChange,
} = heroesFilterSlice.actions;
export default heroesFilterSlice.reducer;
