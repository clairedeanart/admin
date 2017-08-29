import React, { Component } from 'react';
import { Link } from 'react-router';

class Nav extends Component {

  render() {
    return (
      <div className='main-content__navigation container'>
        <div className='navigation__logo'>
          <Link to="/">
            <img src='/assets/logos/black/png/small-v2.png'/>
          </Link>
        </div>

        <ul className='navigation__menu'>
          <li className='navigation__menu__item'>
            <Link to="/content/edit/live">Content</Link>
          </li>
          <li className='navigation__menu__item'>
            <Link to="/upload">Upload</Link>
          </li>
          <li className='navigation__menu__item'>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Nav
