import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addCityByLocation, addCityByName, updateAllCity } from '../../../redux/myReducer'
import AddNewCity from './AddNewCity';

const AddNewCityContainer = (props) => {

    useEffect(() => {
        function getLocation() {
            const success = (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                props.addCityByLocation(lat, lon);
            }
            function error(err) {
                alert(`ERROR(${err.code}): ${err.message}`);
            };
            navigator.geolocation.getCurrentPosition(success, error);
        }

        getLocation()
    }, []); // Реакт выдает предупреждение о зависимости от пропсов, но логика вынесена за пределы фк, буду благодарен, если поможете понять эту мысль (по сути перерисовка по геолокации нам не нужна так, что думаю все ок) 

    const delay = 30; //тест
    const delay2 = props.citys.length // количество запросов в секунду, чтобы не превышать 60запросов в минуту
    console.log(delay2)

      useEffect(() => {
        const interval = setInterval(() => {
            props.citys.map((city) =>props.updateAllCity(city))
        }, delay * 1000);
        return () => clearInterval(interval);
      }, [props.citys]
      );



    return (
        <AddNewCity
            citys={props.citys}
            addCityByName={props.addCityByName}
        />
    )
}


let mapStateToProps = (state) => {
    return {
        citys: state.citys
    }
}

export default connect(mapStateToProps, { addCityByLocation, addCityByName, updateAllCity })(AddNewCityContainer);