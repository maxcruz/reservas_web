import Place from '../ui/Place'
import { connect } from 'react-redux'
import {fetchPlace, clearField, fetchField, logout} from '../../actions'

const mapStateToProps = (state) =>
    ({
        place: state.place,
        field: state.field,
        session: state.session
    });

const mapDispatchToProps = (dispatch) =>
    ({
        clearField() {
            return dispatch(
                clearField()
            )
        },
        fetchPlace() {
            dispatch(
                fetchPlace()
            )
        },
        logout() {
            dispatch(
                logout()
            )
        },
        fetchField(id) {
            return dispatch(
                fetchField(id)
            )
        },
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Place);
export default Container