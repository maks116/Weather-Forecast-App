import { cityApi } from "../api/api"
const DELETE_CITY = "DELETE_CITY"
const ADD_CITY = "ADD_CITY"
const UPDATE_CITY = "UPDATE_CITY"
const UPDATE_ALL_CITY = "UPDATE_ALL_CITY"

const initialState = {
    citys: [
    ],
    firstLoad: true
}

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_CITY: {
            const idx = state.citys.findIndex((el) => el.id === action.cityId)
            return { ...state, citys: [...state.citys.slice(0, idx), ...state.citys.slice(idx + 1)] }
        }

        case ADD_CITY: {
            const { newCity, isLoaded } = action;
            return {
                ...state,
                citys: (() => {
                    if (state.firstLoad)
                        newCity.name = "Моё местоположение"
                    newCity['isLoaded'] = isLoaded
                    newCity['daily'] = []
                    return [...state.citys, newCity]
                })(),
                firstLoad: false
            }
        }
        
        case UPDATE_CITY: {
            const { newCity, cityId } = action;
            return {
                ...state,
                citys: state.citys.map(city => {
                    if (city.id === cityId) {
                        city.id = newCity.id
                        city.main = newCity.main
                        city.coord = newCity.coord
                        city.weather = newCity.weather
                        city.isLoaded = true
                    }
                    return city
                })
            }
        }

        case UPDATE_ALL_CITY: {
            const { newCity, cityId } = action;
            return {
                ...state,
                citys: state.citys.map(city => {
                    if (city.id === cityId) {
                        city.daily = newCity.daily
                        city.main.temp = newCity.current.temp
                        city.weather = newCity.current.weather
                    }
                    return city
                })
            }
        }
        default:
            return state;
    }
}

export const deleteCity = (cityId) => ({ type: DELETE_CITY, cityId })
export const addCity = (newCity, isLoaded?= true) => ({ type: ADD_CITY, newCity, isLoaded })
// мой компилятор ругается говорит, что должен быть ts, но работает)
export const addUpdateCity = (newCity, cityId) => ({ type: UPDATE_CITY, newCity, cityId })
export const updateCity = (newCity, cityId) => ({ type: UPDATE_ALL_CITY, newCity, cityId })

export const addCityByLocation = (lat, lon) => {
    return (dispatch) => {
        cityApi.getCityByLocation(lat, lon).then(data => {
            dispatch(addCity(data))
            cityApi.getTomorrowByLocation(lat, lon).then(data2 => {
                dispatch(updateCity(data2, data.id))
            })
        })
            .catch(error => {
                console.log('error addCityByLocation in Reducers')
            });
    }
}

export const addCityByName = (newCity, isLoaded, cityId) => {
    return (dispatch) => {
        dispatch(addCity(newCity, isLoaded));
        cityApi.getCityByName(newCity.name).then(data => {
            dispatch(addUpdateCity(data, cityId))
            cityApi.getTomorrowByLocation(data.coord.lat, data.coord.lon).then(data2 => {
                dispatch(updateCity(data2, data.id))
            })
        })
            .catch(error => {
                console.log('error addCityByName in Reducers')
            });
    }
}

export const updateAllCity = (newCity) => {
    return (dispatch) => {
        cityApi.getTomorrowByLocation(newCity.coord.lat, newCity.coord.lon).then(data => {
            dispatch(updateAllCity(data, newCity.id))
        })
            .catch(error => {
                console.log('error updateAllCity in Reducers')
            });
    }
}

export default myReducer