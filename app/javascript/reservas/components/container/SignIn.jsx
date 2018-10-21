import SignIn from '../ui/SignIn'
import { connect } from 'react-redux'
import { login } from '../../actions'

const mapStateToProps = (state) =>
    ({
        session: state.session
    });

const mapDispatchToProps = (dispatch) =>
    ({
        login(email, password) {
            return dispatch(
                login(email, password)
            )
        }
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(SignIn);
export default Container