import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UIActions from '../../state/ui/actions';
import Lightbox from '../components/lightbox';
import Masonry from 'react-masonry-component';
import _ from 'underscore';
import cx from 'classnames';

import Item from './item';

class Gallery extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
      lightboxOpen: false,
      hover: false,
      images: props.images,
      image: {},
    };

    this.handleClick = this.handleClick.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  openLightbox(image, index, e) {
    this.props.openLightbox(image, e.target);
    this.setState({
      lightboxOpen: !this.state.lightboxOpen,
      image: {
        data: image,
        elem: e.target,
      }
    });
  }

  closeLightbox() {
    this.props.closeLightbox()
    this.setState({
      lightboxOpen: false,
      image: { }
    });
  }

  handleClick(key, image, index, e) {

  }

  renderImage(image, index) {
    return (
      <Item
        image={image}
        index={index}
        openLightbox={this.openLightbox.bind(this, image, index)}
      />
    )
  }

  render() {
    return (
      <div>
        <Masonry
          className='gallery__grid'
          updateOnEachImageLoad={true}
          options={{
            gutter: 5,
            transitionDuration: '0.2s',
          }}>
          { _.map(this.props.list, this.renderImage) }
        </Masonry>
        <Lightbox
          image={this.state.image}
          images={this.props.list}
          open={this.state.lightboxOpen}
          close={this.closeLightbox}/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(UIActions , dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);