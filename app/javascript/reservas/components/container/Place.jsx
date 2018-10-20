import Place from '../ui/Place'
import { connect } from 'react-redux'
import { fetchPlace, clearField, fetchField } from '../../actions'

const mapStateToProps = (state) =>
    ({
        place: state.place,
        field: state.field
    });

const mapDispatchToProps = (dispatch) =>
    ({
        fetchPlace() {
            dispatch(
                fetchPlace()
            )
        },
        fetchField(id) {
            dispatch(
                fetchField(id)
            )
        },
        clearField() {
            dispatch(
                clearField()
            )
        }
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Place);
export default Container