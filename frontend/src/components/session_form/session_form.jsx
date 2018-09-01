import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // need all - React controlled inputs
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);

    // if (this.props.errors && this.props.errors.length) {
    //   this.props.clearErrors();
    // }
  }

  handleClick(e) {
    this.node.contains(e.target) ? 'return' : this.props.history.push("/");
  }

  renderErrors() {
    return (
      <ul>
        {Object.values(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const clientId = `client_id=smU_1KlDE_K5EA`;
    const responseType = `response_type=code`;
    const state = `state=grouple`;
    const redirectURI = `redirect_uri=http://localhost:5000/api/oauth`;
    const duration = `duration=permanent`;
    const scope = `scope=identity`;
    const authURL = `https://www.reddit.com/api/v1/authorize?${clientId}&${responseType}&${state}&${redirectURI}&${duration}&${scope}`;
    const extendedForm = () => {
      return (
        <div className="login-form-container">
          <br />
          <input className="login-firstname"
            type="text"
            placeholder="First Name"
            value={this.state.first_name}
            onChange={this.update('first_name')}
          />
          <input className="login-lastname"
            type="text"
            placeholder="Last Name"
            value={this.state.last_name}
            onChange={this.update('last_name')}
          />
          <input className="login-email"
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.update('email')}
          />
          <a href={authURL}>login using red</a>
        </div>
      );
    };

    let formtype = this.props.formType === "signup" ? "Sign up" : "Log in";
    let bttntype = this.props.formType === "signup" ? "Sign Up" : "Log In";

    return (
      <div className="login-form-container" ref={node => this.node = node}>
        <form onSubmit={this.handleSubmit}>
          Welcome to Grouple!
          {" " + formtype + " now!"}
          <div className="login-form">
            {this.props.formType === "signup" ? extendedForm() : <br />}
            <input className="login-username"
              type="text"
              placeholder="Username"
              value={this.state.email}
              onChange={this.update('email')}
            />
            <input className="login-password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.update('password')}
            />
            {this.renderErrors()}
            <button className="submit-bttn" onClick={this.handleSubmit}>{bttntype}</button>
            <div className="session-form-ending-tag">{this.props.navLink}</div>
          </div>
        </form>
        <a href={authURL}>**login using red**</a>
      </div>
    );
  }
}

export default withRouter(SessionForm);