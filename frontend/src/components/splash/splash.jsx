import React from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom';
import SessionFormContainer from '../session_form/session_form_container';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement('#root');
  }

  componentWillUnmount() {
    this.closeModal();
  }

  openModal() {
    return () => {
      this.setState({ showModal: true });
    };
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  logout() {
    this.props.logout();
  }

  render() {
    let whichOne = (
      <div>
        <p>Joining is as easy as creating a Reddit account.</p>
        <button className="splash-quote-signup" onClick={this.openModal('login')}>Log In</button>
      </div>
    );
    let whichButton = <button className="splash-login" onClick={this.openModal('login')}>Log In</button>;

    if (this.props.currentUser) {
      whichOne = <input className="searchbar" placeholder="Search for a subreddit" />;
      whichButton = <button className="splash-login" onClick={this.logout.bind(this)}>Log Out</button>;
    }

    return (
      <div className="splash">
        <div className="splash-nav">
          <Link to="/">
            <h2 className="splash-logo"><span role="img" aria-label="staff">💬</span> Grouple</h2>
          </Link>
          <div className="splash-auth">{ whichButton }</div>
        </div>

        <ReactModal className="auth-modal"
          isOpen={this.state.showModal}
          contentLabel="UserAuth modal"
          onRequestClose={this.closeModal}
          overlayClassName="auth-modal-overlay">
          <SessionFormContainer location={this.props.location} closeModal={this.closeModal} />
        </ReactModal>

        <div className="splash-quote">
          <p className="splash-quote-header">Chat with fellow Redditors! <span role="img" aria-label="staff">😄</span></p>
          <p>Explore the Grouple community.</p>
          { whichOne }
        </div>
      </div>
    );
  }
}

export default Splash;
