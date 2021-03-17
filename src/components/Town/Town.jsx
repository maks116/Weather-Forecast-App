import React, { useState } from 'react'
import CityInfo from '../Modals/CityInfo/CityInfo';
import './Town.css'

const Town = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("Подождите...");

    const showModal = () => {
        if(props.isLoaded)
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
        setTitle("Подождите...");
    };

    const modalLoaded = () => {
        setTitle("Введите название города");
    };

    return (
        <div
            className="city"
        >
            <label onClick={showModal}>{props.name}</label>
            {props.isLoaded ?
                <>
                    <label>{props.main.temp}°C</label>
                    <img
                        src={`http://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`}
                        alt={props.weather[0].description}>
                    </img>
                </>
                : <label>Loading</label>
            }
            <button
                type="button"
                className="btn btn-outline-danger btn-sm delete-button"
                onClick={() => props.deleteCity(props.id)}
            >
                <i className="fas fa-trash-alt"></i>
            </button>
            {isOpen ?
                <CityInfo
                    {...props}
                    isOpen={isOpen}
                    title={title}
                    hideModal={hideModal}
                    modalLoaded={modalLoaded}
                />
                : null
            }
        </div>

    )
}

export default Town