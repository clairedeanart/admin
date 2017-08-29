import React, { Component } from 'react';
import Nav from './nav';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Api from '../../helpers/api';
import ImagesActions from '../..//state/images/actions';

class Template extends Component {
  componentDidMount() {
    Api.get('/images/all')
    .then((res) => {
      this.props.append(res);
    }).catch((error) => {
      console.log('error', error)
    });
  }
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

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    ImagesActions,
    dispatch,
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Template);
