import Field from '../ui/Field'
import { connect } from 'react-redux'
import { fetchPromos, fetchEvents, checkout } from '../../actions'

const mapStateToProps = (state) =>
    ({
        field: state.field,
        user: state.user
    });

const mapDispatchToProps = (dispatch) =>
    ({
        fetchPromos(id, token) {
            return dispatch(
                fetchPromos(id, token)
            )
        },
        fetchEvents(id, token) {
            return dispatch(
                fetchEvents(id, token)
            )
        },
        checkout(name, number, expires, verify, field_id, start, end, token) {
            return dispatch(
                checkout(name, number, expires, verify, field_id, start, end, token)
            )
        }
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Field);
export default Container
