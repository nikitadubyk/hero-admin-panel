const initialState = {
    heroes: [], // герои
    heroesLoadingStatus: 'idle',
    filters: [], // кнопки
    filteredHeroes: [], // отфильтрованные персонажи
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
                filteredHeroes: action.payload,
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
        case 'FILTER_CHANGE':
            return {
                ...state,
                activeFilter: action.payload,
            };
        case 'FILTER_ELEMENTS':
            if (state.activeFilter === 'all') {
                return {
                    ...state,
                    filteredHeroes: state.heroes,
                };
            } else {
                return {
                    ...state,
                    filteredHeroes: state.heroes.filter(
                        item => item.element === state.activeFilter
                    ),
                };
            }
        case 'HERO_CREATE':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                filteredHeroes:
                    state.activeFilter === 'all'
                        ? [...state.heroes, action.payload]
                        : state.heroes.filter(
                              item => item.element === state.activeFilter
                          ),
            };
        case 'HERO_DELETE':
            const newHeroesList = state.heroes.filter(
                item => item.id !== action.payload
            );
            return {
                ...state,
                heroes: newHeroesList,
                filteredHeroes: newHeroesList,
            };
        default:
            return state;
    }
};

export default reducer;
