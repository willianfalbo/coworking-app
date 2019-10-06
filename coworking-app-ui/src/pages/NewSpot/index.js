import React, { useState, useMemo } from 'react';
import api from '../../services/api'

import camera from '../../assets/camera.svg'

import './styles.css';

export default function NewSpot({ history }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const imagePreview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();

        const user_id = localStorage.getItem('user');

        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label
                id="thumbnail"
                style={{ backgroundImage: `url(${imagePreview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}>
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="" />
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                type="text"
                name="company"
                id="company"
                placeholder="Sua empresa"
                value={company}
                onChange={event => setCompany(event.target.value)} />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separados por virgula)</span></label>
            <input
                type="text"
                name="techs"
                id="techs"
                placeholder="Quais tecnologias?"
                value={techs}
                onChange={event => setTechs(event.target.value)} />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para gratuito)</span></label>
            <input
                type="text"
                name="price"
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)} />

            <button type="submit" className="btn">Cadastrar</button>
        </form>
    );
}
