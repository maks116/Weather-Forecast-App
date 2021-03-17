import { cityApi } from "../api/api"

const DELETE_CITY = "DELETE_CITY"
const ADD_CITY = "ADD_CITY"
const UPDATE_CITY = "UPDATE_CITY"

const initialState = {
    citys: [
    ]
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
            action.newCity['isLoaded'] = action.isLoaded
            stateCopy.citys.push(action.newCity);
            //console.log("Added");
            return stateCopy;
        }
        case UPDATE_CITY: {
            const idx = state.citys.findIndex((el) => el.id === action.cityId)
            let stateCopy = { ...state };
            stateCopy.citys = [...state.citys];
            stateCopy.citys[idx] = action.newCity
            stateCopy.citys[idx]['isLoaded'] = true
            console.log('Update' + stateCopy)
            return stateCopy
        }
        default:
            return state;
    }
}



export const deleteCity = (cityId) => ({ type: DELETE_CITY, cityId })
export const addCity = (newCity, isLoaded?= true) => ({ type: ADD_CITY, newCity, isLoaded })
export const updateCity = (newCity, cityId) => ({ type: UPDATE_CITY, newCity, cityId })


export const addCityByLocation = (lat, lon) => {
    return (dispatch) => {
        cityApi.getCityByLocation(lat, lon).then(data => {
            cityApi.getTomorrowByLocation(lat, lon).then(data2 => {
                data['daily'] = data2.daily
                dispatch(addCity(data))
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
            cityApi.getTomorrowByLocation(data.coord.lat, data.coord.lon).then(data2 => {
                data['daily'] = data2.daily
                dispatch(updateCity(data, cityId))
            })
        })
        .catch(error => {
            console.log('error addCityByName in Reducers')
        });
    }
}

export const updateAllCity = (newCity) => {
    return (dispatch) => {
        cityApi.getCityByName(newCity.name).then(data => {
            cityApi.getTomorrowByLocation(newCity.coord.lat, newCity.coord.lon).then(data2 => {
                data['daily'] = data2.daily
                dispatch(updateCity(data, newCity.id))
            })
        })
        .catch(error => {
            console.log('error updateAllCity in Reducers')
        });
    }
}

export default myReducer