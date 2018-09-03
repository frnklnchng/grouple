import Greeting from './greeting';
import { connect } from 'react-redux';
import { logout } from '../../util/session_api_util';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);