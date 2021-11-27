export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING',
    };
};

export const heroesFetched = heroes => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes,
    };
};

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR',
    };
};

export const filtersFetched = filters => {
    return { type: 'FILTERS_FETCHED', payload: filters };
};

export const activeFilterChange = filter => {
    return { type: 'FILTER_CHANGE', payload: filter };
};

export const filterAllElements = () => {
    return { type: 'FILTER_ELEMENTS' };
};

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
