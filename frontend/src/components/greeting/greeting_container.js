import { connect } from 'react-redux';
import { logout } from '../../util/session_api_util';
import Greeting from './greeting';

const mapStateToProps = ({ session }) => {
  return {
    currentUser: session
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Greeting);