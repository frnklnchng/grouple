// import { receiveErrors } from '../../actions/session_actions';
import { connect } from 'react-redux';
import Splash from './splash';
import { login } from '../../util/session_api_util';

const mdp = (dispatch) => {
  return {
    login: user => dispatch(login(user)),
    // clearErrors: () => dispatch(receiveErrors([]))
  };
};

// export default connect(null, null)(Splash);
// export default connect(() => ({}), () => ({}))(Splash);
export default connect(() => ({}), mdp)(Splash);