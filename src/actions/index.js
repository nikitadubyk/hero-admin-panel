export const fetchHeroes = request => dispatch => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = request => dispatch => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
        .then(res => dispatch(filtersFetched(res)))
        .catch(() => dispatch(filtersFetchingError));
};

export const heroesFetching = () => {
    return { type: 'HEROES_FETCHING' };
};

export const heroesFetched = heroes => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes,
    };
};

export const heroesFetchingError = () => {
    return { type: 'HEROES_FETCHING_ERROR' };
};

export const filtersFetching = () => {
    return { type: 'FILTERS_FETCHING' };
};

export const filtersFetched = filters => {
    return { type: 'FILTERS_FETCHED', payload: filters };
};

export const filtersFetchingError = () => {
    return { type: 'FILTERS_FITCHING_ERROR' };
};

export const activeFilterChange = filter => {
    return { type: 'FILTER_CHANGE', payload: filter };
};

// export const activeFilterChange = filter => dispatch => {
//     setTimeout(() => {
//         dispatch({ type: 'FILTER_CHANGE', payload: filter });
//     }, 1000);
// };

export const heroAddToList = hero => {
    return {
        type: 'HERO_CREATE',
        payload: hero,
    };
};

export const heroDelete = id => {
    return {
        type: 'HERO_DELETE',
        payload: id,
    };
};
