import Field from '../ui/Field'
import { connect } from 'react-redux'
import { fetchPromos, fetchEvents } from '../../actions'

const mapStateToProps = (state) =>
    ({
        field: state.field,
        user: state.user
    });

const mapDispatchToProps = (dispatch) =>
    ({
        fetchPromos(id) {
            dispatch(
                fetchPromos(id)
            )
        },
        fetchEvents(id) {
            dispatch(
                fetchEvents(id)
            )
        }
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Field);
export default Container