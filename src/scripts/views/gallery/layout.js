import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Gallery from './list';
const _ = require('underscore');

class GalleryWrapper extends Component {
  constructor(props) {
  	super(props);
    this.getType = this.getType.bind(this);
    this.getImagesByType = this.getImagesByType.bind(this);
  }

  getType() {
    let type = this.props.location.pathname;
    return type.substring(type.lastIndexOf('/') + 1, type.length);
  }
  getImagesByType() {
    let type = this.getType();

    let images = {
      hidden: [],
      live: [],
    }

    _.each(this.props.images.list, (img) => {
      if (img.hidden || img.unedited) images.hidden.push(img)
      else images.live.push(img);
    });

    return _.sortBy(images[type], 'createdAt')
  }

  render() {
    return (
      <Gallery
        list={this.getImagesByType()}
        type={this.getType()}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GalleryWrapper);
