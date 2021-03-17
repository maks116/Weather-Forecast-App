import { connect } from 'react-redux';
import Town from './Town'
import {deleteCity, updateCity} from '../../redux/myReducer'


let mapStateToProps = (state) => {
    return {
        citys: state.citys
    }
}

const TownContainer = connect(mapStateToProps, {deleteCity, updateCity})(Town);

export default TownContainer