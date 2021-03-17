import * as axios from 'axios';

const instanse = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
    params: {
        "appid": 'a91517bb5e6960f36a9c4ff7467b8642'
    }
})

export const cityApi = {
    getCityByLocation (lat = 35, lon= 139) {

        return instanse.get(`?lat=${lat}&lon=${lon}`)
        .then(response => {
            return response.data;
        });
    },
    getCityByName(name) {    
        return instanse.get(`?q=${name}`)
        .then(response => {            
            return response.data;
        });
    }
}