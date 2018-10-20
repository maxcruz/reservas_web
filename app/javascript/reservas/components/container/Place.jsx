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
        },
        logout() {
            dispatch(
                logout()
            )
        }
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Place);
export default Container