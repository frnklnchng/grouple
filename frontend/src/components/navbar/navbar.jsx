import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <div className="splash-nav">
        <Link to="/"><h2 className="splash-logo">💬 Grouple</h2></Link>
        <div className="splash-auth">
          <button className="splash-login" onClick="">Log In</button>
        </div>
      </div>
    );
  }
}

export default Navbar;