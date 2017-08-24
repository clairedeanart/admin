import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Gallery from './list';

class GalleryWrapper extends Component {
  constructor(props) {
  	super(props);
    this.getImagesByType = this.getImagesByType.bind(this);
  }


  getImagesByType(type) {
    type = type.substring(type.lastIndexOf('/') + 1, type.length)
    switch (type) {
      case 'new': return this.props.images.unedited
      case 'live': return this.props.images.live
      case 'hidden': return this.props.images.hidden
      default: []
    }
  }

  render() {
    return (
      <Gallery
        list={this.getImagesByType(this.props.location.pathname)}
        type={this.props.type}
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
