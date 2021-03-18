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
            let stateCopy = { ...state };
            stateCopy.citys = [...state.citys];
            action.newCity['daily'] = []
            action.newCity['isLoaded'] = action.isLoaded
            stateCopy.citys.push(action.newCity);
            if (stateCopy.firstLoad) {
                stateCopy.citys[0].name = "Моё местоположение"
                stateCopy.firstLoad = false
            }
            return stateCopy;
        }
        case UPDATE_CITY: {
            const idx = state.citys.findIndex((el) => el.id === action.cityId)
            let stateCopy = { ...state };
            stateCopy.citys = [...state.citys];
            stateCopy.citys[idx].id = action.newCity.id
            stateCopy.citys[idx].main = action.newCity.main
            stateCopy.citys[idx].coord = action.newCity.coord
            stateCopy.citys[idx].weather = [...action.newCity.weather]
            stateCopy.citys[idx].isLoaded = true
            return stateCopy
        }
        case UPDATE_ALL_CITY: {            
            const idx = state.citys.findIndex((el) => el.id === action.cityId)
            let stateCopy = { ...state };
            stateCopy.citys = [...state.citys];
            stateCopy.citys[idx].daily = [...action.newCity.daily];
            stateCopy.citys[idx].weather = [...action.newCity.current.weather]
            stateCopy.citys[idx].main.temp = action.newCity.current.temp
            stateCopy.citys[idx]['isLoaded'] = true
            return stateCopy
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