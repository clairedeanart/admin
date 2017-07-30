import React, { Component } from 'react';
import Nav from './nav';

class Template extends Component {
  render() {
    return (
      <div className='main-content'>
        <Nav />

        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Template
