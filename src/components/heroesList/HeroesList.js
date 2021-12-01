import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createSelector } from 'reselect';
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroDelete,
} from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import './HeroesList.scss';

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        state => state.filters.activeFilter,
        state => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === 'all') {
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter);
            }
        }
    );

    const filteredHeroes = useSelector(filteredHeroesSelector);

    const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const onDeleteHero = useCallback(id => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(dispatch(heroDelete(id)))
            .catch(e => alert('Упс, произошла ошибка при удалении'));
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(heroesFetching());
        request('http://localhost:3001/heroes')
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()));
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (heroesLoadingStatus === 'error') {
        return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
    }

    const renderHeroesList = arr => {
        if (arr.length === 0) {
            return (
                <CSSTransition classNames='hero' timeout={0}>
                    <h5 className='text-center mt-5'>Героев пока нет</h5>
                </CSSTransition>
            );
        }

        return arr.map(({ id, ...props }) => {
            return (
                <CSSTransition classNames='hero' key={id} timeout={500}>
                    <HeroesListItem
                        {...props}
                        onDeleteHero={() => onDeleteHero(id)}
                    />
                </CSSTransition>
            );
        });
    };

    const elements = renderHeroesList(filteredHeroes);
    return <TransitionGroup component='ul'>{elements}</TransitionGroup>;
};

export default HeroesList;
