import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
});

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all',
// };

export const fetchFilters = createAsyncThunk('filters/fetchFilters', () => {
    const { request } = useHttp();
    return request('http://localhost:3001/filters');
});

const heroesFilterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChange: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filtersLoadingStatus = 'loading';
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                filtersAdapter.setAll(state, action.payload);
                state.filtersLoadingStatus = 'idle';
            })
            .addCase(fetchFilters.rejected, state => {
                state.filtersLoadingStatus = 'error';
            });
    },
});

export const { selectAll } = filtersAdapter.getSelectors(
    state => state.filters
);
export const { activeFilterChange } = heroesFilterSlice.actions;
export default heroesFilterSlice.reducer;
