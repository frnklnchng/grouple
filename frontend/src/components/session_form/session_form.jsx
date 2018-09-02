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
      last_name: '',
      password2: ''
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
      <ul className="errors-list">
        {Object.values(this.props.errors).map((error, i) => (
          <li className="errors" key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const extendedForm = () => {
      return (
        <div className="login-form-container">
          <br />
          <input className="login-password"
              type="password"
              placeholder="Password2"
              value={this.state.password2}
              onChange={this.update('password2')}
            />

 

        </div>
      );
    };

    // let formtype = this.props.formType === "signup" ? "Sign up" : "Log in";
    let bttntype = this.props.formType === "signup" ? "Sign Up" : "Log In";
     
    return (
      <div className="login-form-container" ref={node => this.node = node}>
        <form onSubmit={this.handleSubmit}>
          <div className="login-form-greeting-1">Welcome to Grouple!</div>
          <div className="login-form-greeting-2">We're so excited to have you!</div>
          {/* {" " + formtype + " now!"} */}
          <div className="login-form">
            <input className="login-email"
              type="text"
              placeholder="Email"
              value={this.state.email}
              onChange={this.update('email')}
              />
            <input className="login-password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.update('password')}
              />
            {this.props.formType === "signup" ? extendedForm() : <br />}
            {this.renderErrors()}
            <button className="submit-bttn" onClick={this.handleSubmit}>{bttntype}</button>
            <div className="session-form-ending-tag">{this.props.navLink}</div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);