import Place from '../ui/Place'
import { connect } from 'react-redux'

const mapStateToProps = (state) =>
    ({
        place: state.place
    });

const mapDispatchToProps = (dispatch) =>
    ({
        fetchPlace() {
            dispatch(

            )
        }
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(Place);
export default Container