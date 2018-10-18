import Field from '../ui/Field'
import { connect } from 'react-redux'
import { fetchPromos } from '../../actions'

const mapStateToProps = (state) =>
    ({
        field: state.field
    });

const mapDispatchToProps = (dispatch) =>
    ({
        fetchPromos(id) {
            dispatch(
                fetchPromos(id)
            )
        }
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Field);
export default Container