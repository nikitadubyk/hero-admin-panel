import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';
import { fetchFilters, activeFilterChange } from '../../actions';
import classNames from 'classnames';

const HeroesFilters = () => {
    const { request } = useHttp();
    const { filters, activeFilter, filtersLoadingStatus } = useSelector(
        state => state.filters
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters(request));
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
