import { useState } from 'react';
import { heroAddToList } from '../heroesList/heroesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescription, setHeroDescription] = useState('');
    const [heroOption, setHeroOption] = useState('');

    const { request } = useHttp();
    const { filters } = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescription,
            element: heroOption,
        };
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(dispatch(heroAddToList(newHero)))
            .catch(console.log(e));

        setHeroName('');
        setHeroDescription('');
        setHeroOption('');
    };

    return (
        <form className='border p-4 shadow-lg rounded' onSubmit={onSubmit}>
            <div className='mb-3'>
                <label htmlFor='name' className='form-label fs-4'>
                    Имя нового героя
                </label>
                <input
                    required
                    type='text'
                    name='name'
                    className='form-control'
                    id='name'
                    placeholder='Как меня зовут?'
                    value={heroName}
                    onChange={e => setHeroName(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label htmlFor='text' className='form-label fs-4'>
                    Описание
                </label>
                <textarea
                    required
                    name='text'
                    className='form-control'
                    id='text'
                    placeholder='Что я умею?'
                    style={{ height: '130px' }}
                    value={heroDescription}
                    onChange={e => setHeroDescription(e.target.value)}
                />
            </div>

            <div className='mb-3'>
                <label htmlFor='element' className='form-label'>
                    Выбрать элемент героя
                </label>
                <select
                    required
                    className='form-select'
                    id='element'
                    name='element'
                    value={heroOption}
                    onChange={e => setHeroOption(e.target.value)}
                >
                    <option>Я владею элементом...</option>
                    {filters.map(({ id, title, value }) => (
                        <option value={value} key={id}>
                            {title}
                        </option>
                    ))}
                </select>
            </div>

            <button type='submit' className='btn btn-primary'>
                Создать
            </button>
        </form>
    );
};

export default HeroesAddForm;
