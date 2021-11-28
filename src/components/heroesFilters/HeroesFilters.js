import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import {
    filtersFetched,
    activeFilterChange,
    filterAllElements,
} from '../../actions';
import classNames from 'classnames';

const HeroesFilters = () => {
    const { request } = useHttp();
    const { filters, activeFilter } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        request('http://localhost:3001/filters')
            .then(res => dispatch(filtersFetched(res)))
            .catch(e => console.log(e));
        //eslint-disable-next-line
    }, []);

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
                                    dispatch(filterAllElements());
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
