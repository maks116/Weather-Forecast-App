import React from 'react'
import './Town.css'

const Town = (props) => {
    const elements = props.citys.map((obj, index) => {
        return (
            <div key={index} className="city">
                <label>{obj.name}</label>
                {obj.isLoaded?  
                <>
                    <label>{(obj.main.temp - 273.15).toFixed(1)}°C</label>
                    <img src={`http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`} alt={obj.weather[0].descriptio}></img>
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm delete-button"
                        onClick={() => props.deleteCity(obj.id)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </> 
                : <label>Loading</label>    
                }
            </div>
        )
    })


    return elements
}

export default Town