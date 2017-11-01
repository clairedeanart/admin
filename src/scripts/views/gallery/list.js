import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImagesActions from '../../state/images/actions';
import UiActions from '../../state/ui/actions';
import Lightbox from '../components/lightbox';
import Masonry from 'react-masonry-component';
import Mousetrap from 'mousetrap';
import _ from 'underscore';
import Item from './item';

class Gallery extends Component {

  constructor(props) {

  	super(props);
  	this.state = {
      lightboxOpen: false,
      hover: false,
      images: props.images,
      image: {},
      multiselect: false,
    };

    this.selectItem = this.selectItem.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  componentDidMount() {
    Mousetrap.bind('command', (e) => {
      this.setState({
        multiselect: true
      });
    }, 'keydown');
    Mousetrap.bind('command', (e) => {
      this.setState({
        multiselect: false
      });
    }, 'keyup');
  }

  openLightbox(image, index, e) {
    this.lightboxOpen = true;
    this.props.actions.ui.openLightbox(image, this.props.type);
    this.setState({
      lightboxOpen: !this.state.lightboxOpen,
      image: {
        data: image,
        elem: e && e.target ? e.target : {},
      }
    });
  }

  closeLightbox() {
    this.lightboxOpen = false;
    this.props.actions.ui.closeLightbox()
    this.setState({
      lightboxOpen: false,
      image: { }
    });
  }

  selectItem(image, index, e) {
    setTimeout(() => {
      if (this.lightboxOpen) return;
      let change = {
        ...image,
        selected: !image.selected,
      }
      this.props.actions.images.updateImageData(change);
      this.props.actions.ui.updateLightboxImageData(change);
    }, 200)
  }

  renderImage(image, index) {
    return (
      <Item
        key={`image-render-${index}${image.id}`}
        image={image}
        index={index}
        multiselect={this.state.multiselect}
        selectItem={this.selectItem.bind(this, image, index)}
        openLightbox={this.openLightbox.bind(this, image, index)}
      />
    )
  }

  render() {
    const isEmpty = this.props.list.length < 1;
    let list;
    if (isEmpty) {
      list = (
        <div>
          No images here
        </div>
      )
    } else {
      list = (
        <Masonry
          className='gallery__grid'
          updateOnEachImageLoad={true}
          options={{
            gutter: 5,
            transitionDuration: '0.2s',
          }}
          ref={(c) => {this.masonry = this.masonry || c.masonry;}}>
          { _.map(this.props.list, this.renderImage) }
        </Masonry>
      )
    }

    return (
      <div>
        { list }
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
  return {
    actions: {
      ui: bindActionCreators(UiActions, dispatch),
      images: bindActionCreators(ImagesActions, dispatch),
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
