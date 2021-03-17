import * as axios from 'axios';

const instanse = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
        "appid": '16ee1f3f51cbf5f906b8708917f3adef',
        "units": "metric"
    }
})

export const cityApi = {
    getCityByLocation(lat = 35, lon = 139) {

        return instanse.get(`?lat=${lat}&lon=${lon}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log("error getCityByLocation")
            });
    },
    getCityByName(name) {
        return instanse.get(`?q=${name}`)
            .then(response => {
                //console.log(`getCityByName = ${name}`)
                return response.data;
            })
            .catch(error => {
                console.log("error getCityByName")
            });
    },
    getTomorrowByLocation(lat = 35, lon = 139) {
        return instanse.get('https://api.openweathermap.org/data/2.5/onecall?lat=35&lon=139&cnt=1&exclude=current,minutely,hourly,alerts&appid=a91517bb5e6960f36a9c4ff7467b8642')//(`?lat=${lat}&lon=${lon}&cnt=1&exclude=current,minutely,hourly,alerts`)
            .then(response => {
                console.log (`lat = ${lat}, lon = ${lon}`)
                return response.data;
            })
            .catch(error => {
                console.log("error getTomorrowByLocation")
            });
    },
}