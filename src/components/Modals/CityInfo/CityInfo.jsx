import React from 'react'
import './CityInfo.css'
import Modal from 'react-bootstrap/Modal';

const CityInfo = (props) => {
    // const calcSecond = (timeStamp) => {
    //     timeStamp = timeStamp * 1000
    //     return timeStamp.getHours() *3600 + timeStamp.getMinutes()*60 + timeStamp.getSeconds()
    // расчитываем координаты для полуокружности 200px*100px по формуле окружности x2 + y2 = R2
    const daySecond = 86400 // секунд в сутках
    const R = 100 // радиус в px
    const imgSize = 12 // смещение картинки по Х
    let sunriseToday = new Date(props.daily[0].sunrise * 1000);
    let sunsetToday = new Date(props.daily[0].sunset * 1000);
    let sunriseTomorrow = new Date(props.daily[1].sunrise * 1000);
    let sunsetTomorrow = new Date(props.daily[1].sunset * 1000);

    let calcSec = timeStamp => timeStamp.getHours() * 3600 + timeStamp.getMinutes() * 60 + timeStamp.getSeconds()

    let calcX = dateSec => dateSec * 200 / daySecond

    let calcY = x => Math.pow(Math.abs(Math.pow(R, 2) - Math.pow(x - 100, 2)), 0.5)

    const xPos = {
        sunriseToday: calcX(calcSec(sunriseToday)),
        sunsetToday: calcX(calcSec(sunsetToday)),
        sunriseTomorrow: calcX(calcSec(sunriseTomorrow)),
        sunsetTomorrow: calcX(calcSec(sunsetTomorrow)),
    }

    const yPos = {
        sunriseToday: calcY(xPos.sunriseToday),
        sunsetToday: calcY(xPos.sunsetToday),
        sunriseTomorrow: calcY(xPos.sunriseTomorrow),
        sunsetTomorrow: calcY(xPos.sunsetTomorrow)
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
                        <i
                            style={{
                                left: xPos.sunriseToday - imgSize,
                                top: 100 - yPos.sunriseToday - imgSize   // меняем начало координат по оси У
                            }}
                            className="far fa-sun sunrise"
                        >
                        </i>
                        <i
                            style={{
                                left: xPos.sunsetToday - imgSize,
                                top: 100 - yPos.sunsetToday - imgSize // меняем начало координат по оси У
                            }}
                            className="far fa-moon sunset"
                        >
                        </i>
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
                <div className="container-cube">
                    <div className="sunrise-sunset">
                        <i
                            style={{
                                left: xPos.sunriseTomorrow - imgSize,
                                top: 100 - yPos.sunriseTomorrow - imgSize   // меняем начало координат по оси У
                            }}
                            className="far fa-sun sunrise"
                        >
                        </i>
                        <i
                            style={{
                                left: xPos.sunsetTomorrow - imgSize,
                                top: 100 - yPos.sunsetTomorrow - imgSize // меняем начало координат по оси У
                            }}
                            className="far fa-moon sunset"
                        >
                        </i>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.hideModal}>Отменить</button>
            </Modal.Footer>
        </Modal>
    )
}

export default CityInfo