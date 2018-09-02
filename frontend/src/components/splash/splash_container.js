// import { receiveErrors } from '../../actions/session_actions';
import Splash from './splash';
import { connect } from 'react-redux';
import { logout } from '../../util/session_api_util';

const msp = (state) => {
  return {
    currentUser: state.session.id,
  };
};

const mdp = (dispatch) => {
  return {
    logout: () => dispatch(logout())
    // clearErrors: () => dispatch(receiveErrors([]))
  };
};

// export default connect(null, null)(Splash);
// export default connect(() => ({}), () => ({}))(Splash);
export default connect(msp, mdp)(Splash);