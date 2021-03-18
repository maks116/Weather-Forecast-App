import React from 'react'
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
    let sunriseToday = new Date(props.daily[0].sunrise * 1000);
    let sunsetToday = new Date(props.daily[0].sunset * 1000);
    let sunriseTomorrow = new Date(props.daily[1].sunrise * 1000);
    let sunsetTomorrow = new Date(props.daily[1].sunset * 1000);


    function calcSec(timeStamp) {
        return timeStamp.getHours() * 3600 + timeStamp.getMinutes() * 60 + timeStamp.getSeconds()
    }

    function calcX(dateSec) {
        return dateSec * 200 / daySecond
    }
    function calcY(x) {
        return Math.pow(Math.abs(Math.pow(R, 2) - Math.pow(x - 100, 2)), 0.5)
    }

    sunriseToday = calcSec(sunriseToday)
    sunsetToday = calcSec(sunsetToday)
    sunriseTomorrow = calcSec(sunriseTomorrow)
    sunsetTomorrow = calcSec(sunsetTomorrow)

    const xPos = {
        sunriseToday: calcX(sunriseToday),
        sunsetToday: calcX(sunsetToday),
        sunriseTomorrow: calcX(sunriseTomorrow),
        sunsetTomorrow: calcX(sunsetTomorrow),
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
                                left: xPos.sunriseToday - imgX,
                                top: 100 - yPos.sunriseToday - imgY   // меняем начало координат по оси У
                            }}
                            className="far fa-sun sunrise"
                        >
                        </i>
                        <i
                            style={{
                                left: xPos.sunsetToday - imgX,
                                top: 100 - yPos.sunsetToday - imgY // меняем начало координат по оси У
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
                                left: xPos.sunriseTomorrow - imgX,
                                top: 100 - yPos.sunriseTomorrow - imgY   // меняем начало координат по оси У
                            }}
                            className="far fa-sun sunrise"
                        >
                        </i>
                        <i
                            style={{
                                left: xPos.sunsetTomorrow - imgX,
                                top: 100 - yPos.sunsetTomorrow - imgY // меняем начало координат по оси У
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