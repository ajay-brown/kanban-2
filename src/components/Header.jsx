import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  render = () => {
    const { user } = this.props;
    return (
      <header>
        <Link to="/" className="header-title">
          &nbsp;React Kanban
        </Link>
      </header>
    );
  };
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Header);
