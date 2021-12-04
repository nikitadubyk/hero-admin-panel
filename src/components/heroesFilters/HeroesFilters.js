import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../spinner/Spinner';
import {
    activeFilterChange,
    selectAll,
    fetchFilters,
} from './heroesFilterSlice';
import classNames from 'classnames';
import store from '../../store';

const HeroesFilters = () => {
    const { activeFilter, filtersLoadingStatus } = useSelector(
        state => state.filters
    );
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        //eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className='text-center mt-5'>Ошибка при загрузки</h5>;
    }

    return (
        <div className='card shadow-lg mt-4'>
            <div className='card-body'>
                <p className='card-text'>Отфильтруйте героев по элементам</p>
                <div className='btn-group'>
                    {filters.map(({ id, title, value, className }) => {
                        const btnClass = classNames('btn', className, {
                            active: value === activeFilter,
                        });

                        return (
                            <button
                                className={btnClass}
                                key={id}
                                onClick={() => {
                                    dispatch(activeFilterChange(value));
                                }}
                            >
                                {title}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HeroesFilters;
