import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

import './HeroesList.scss';

const HeroesList = () => {
    const { data: heroes = [], isLoading, isError } = useGetHeroesQuery();
    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);
    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(item => item.element === activeFilter);
        }
        // eslint-disable-next-line
    }, [heroes, activeFilter]);

    const onDeleteHero = useCallback(id => {
        deleteHero(id);
        //eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
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
