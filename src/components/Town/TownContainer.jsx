import { connect } from 'react-redux';
import Town from './Town'
import { deleteCity, updateCity } from '../../redux/myReducer'


const TownContainer = (props) => {

    const elements = props.citys.map((city, index) => {
        return (
            <Town
                key={index}
                {...city}
                deleteCity={props.deleteCity}
                updateCity={props.updateCity}
            />
        )
    })

    return elements
}

let mapStateToProps = (state) => {
    return {
        citys: state.citys
    }
}


export default connect(mapStateToProps, { deleteCity, updateCity })(TownContainer);