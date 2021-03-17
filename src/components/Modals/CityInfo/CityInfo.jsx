import React, { useState } from 'react'
import './CityInfo.css'
import Modal from 'react-bootstrap/Modal';

const CityInfo = (props) => {
    return (
        <Modal show={props.isOpen} onHide={props.hideModal} onEntered={props.modalLoaded}>
            <Modal.Header>
                <Modal.Title>{props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="line-info">
                    <label>Сегодня</label>
                    <label>{props.daily[0].temp.day}°C.</label>
                    <img 
                        src={`http://openweathermap.org/img/wn/${props.daily[0].weather[0].icon}@2x.png`} 
                        alt={props.daily[0].weather[0].description}>
                    </img>
                </div>
                <div>
                    Тут радуга=)
                </div>
                <div className="line-info">
                    <label>Завтра</label>
                    <label>{props.daily[1].temp.day}°C.</label>
                    <img 
                        src={`http://openweathermap.org/img/wn/${props.daily[1].weather[0].icon}@2x.png`}
                        alt={props.daily[1].weather[0].description}>
                    </img>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.hideModal}>Отменить</button>
            </Modal.Footer>
        </Modal>
    )
}

export default CityInfo