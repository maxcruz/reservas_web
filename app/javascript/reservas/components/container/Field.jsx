import Field from '../ui/Field'
import { connect } from 'react-redux'

const mapStateToProps = (state) =>
    ({
        field: state.field
    });

const mapDispatchToProps = (dispatch) =>
    ({
        fetchPlace() {
            dispatch(

            )
        }
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Field);
export default Container