import React, { useState } from 'react'
import './CityInfo.css'
import Modal from 'react-bootstrap/Modal';

const CityInfo = (props) => {
    // const calcSecond = (timeStamp) => {
    //     timeStamp = timeStamp * 1000
    //     return timeStamp.getHours() *3600 + timeStamp.getMinutes()*60 + timeStamp.getSeconds()
    // }
    // расчитываем координаты для полуокружности 200px*100px по формуле окружности x2 + y2 = R2
    const daySecond = 86400 // секунд в половине суток
    const R = 100 // радиус в px
    const imgX = 12 // смещение картинки по Х
    const imgY = 14 // смещение картинки по У
    let sunrise = new Date(props.sys.sunrise * 1000);
    let sunset = new Date(props.sys.sunset * 1000);

    sunrise = sunrise.getHours() * 3600 + sunrise.getMinutes() * 60 + sunset.getSeconds()
    sunset = sunset.getHours() * 3600 + sunset.getMinutes() * 60 + sunset.getSeconds()

    const xPos = {
        sunriseXPos: sunrise * 200 / daySecond,
        sunsetXPos: sunset * 200 / daySecond
    }

    const yPos = {
        sunriseYPos: Math.pow(Math.abs(Math.pow(R, 2) - Math.pow(xPos.sunriseXPos - 100, 2)), 0.5),
        sunsetYPos: Math.pow(Math.abs(Math.pow(R, 2) - Math.pow(xPos.sunsetXPos - 100, 2)), 0.5)
    }

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
                <div className="container-cube">
                    <div className="sunrise-sunset">
                        <p className="sun">
                            <i
                                style={{
                                    left: xPos.sunriseXPos - imgX,
                                    top: 100 - yPos.sunriseYPos - imgY   // меняем начало координат по оси У
                                }}
                                className="far fa-sun sunrise"
                            >
                            </i>
                            <i
                                style={{
                                    left: xPos.sunsetXPos - imgX,
                                    top: 100 - yPos.sunsetYPos - imgY // меняем начало координат по оси У
                                }}
                                className="far fa-moon sunset"
                            >
                            </i>
                        </p>
                    </div>
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