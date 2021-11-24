const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading',
            };
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
            };
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error',
            };
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
            };
        case 'HERO_CREATE':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
            };
        case 'HERO_DELETE':
            const newHeroesList = state.heroes.filter(
                item => item.id !== action.payload
            );
            return {
                ...state,
                heroes: newHeroesList,
            };
        default:
            return state;
    }
};

export default reducer;
