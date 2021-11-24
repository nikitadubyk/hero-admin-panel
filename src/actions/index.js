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
