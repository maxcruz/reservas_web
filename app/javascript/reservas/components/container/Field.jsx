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
        fetchPromos(id) {
            return dispatch(
                fetchPromos(id)
            )
        },
        fetchEvents(id) {
            return dispatch(
                fetchEvents(id)
            )
        },
        checkout(name, number, expires, verify, field_id, start, end) {
            return dispatch(
                checkout(name, number, expires, verify, field_id, start, end)
            )
        }
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Field);
export default Container