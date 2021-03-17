import React, { useState } from 'react'
import './Town.css'
import Modal from 'react-bootstrap/Modal';

const Town = (props) => {

    return (
        <div className="city">
            <label>{props.name}</label>
            {props.isLoaded ?
                <>
                    <label>{(props.main.temp - 273.15).toFixed(1)}°C</label>
                    <img src={`http://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`} alt={props.weather[0].descriptio}></img>
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm delete-button"
                        onClick={() => props.deleteCity(props.id)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </>
                : <label>Loading</label>
            }
        </div>
    )
}

export default Town