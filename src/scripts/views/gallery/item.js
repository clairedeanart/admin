import React, { Component } from 'react';
import cx from 'classnames';
import Transition from 'react-transition-group/Transition';

class GalleryImage extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
      show: false,
      hover: false,
      name: props.image.name || '',
      editName: false,
      changes: {},
    };

    this.nameInput = null;

  }

  hover(enter) {
    this.setState({
      hover: enter === 'enter'
    });
  }

  render() {
    const {
      image,
      index,
    } = this.props;
    var hover = cx({
      ' grid__item--hover': this.state.hover
    });
    var unsaved = (
      image.unsaved
      ? (
        <div className='grid__item__alert'>
           <h4>Unsaved</h4>
        </div>
      ) : null
    )

    return (
      <div
        key={`image-${index}${image.id}`}
        onClick={this.props.openLightbox}
        onMouseEnter={this.hover.bind(this, 'enter')}
        onMouseLeave={this.hover.bind(this, 'leave')}
        className={'grid__item'+hover}
      >
        { unsaved }
        <img src={image.location} />
        <div className='grid__item__top-menu'>
          <h4>{image.name || 'Untitled'}</h4>
        </div>
        <ItemMenu
          image={this.props.image}/>
      </div>
    )
  }
}

const ItemMenu = ({
  image
}) => {
  // Publicy visible properties
  // 'name',
  // 'medium',
  // 'date',
  // 'dimensions',
  // 'price',
  // 'sold',
  // 'tags',

  return (
    <div className='row grid__item__menu'>
      <div className='grid__item__menu-item col-xs-12'>
        <p className='row-header'>Medium: {image.medium}</p>
      </div>
      <div className='grid__item__menu-item col-xs-12'>
        <p className='row-header'>Date: {image.date}</p>
      </div>
      <div className='grid__item__menu-item col-xs-12'>
        <p className='row-header'>Dimensions: {image.dimensions}</p>
      </div>
      <div className='grid__item__menu-item col-xs-12'>
        <p className='row-header'>Price: ${image.price}</p>
      </div>
      <div className='grid__item__menu-item col-xs-12'>
        <p className='row-header'>Sold: {image.sold ? 'Yes' : 'No'}</p>
      </div>
      <div className='grid__item__menu-item col-xs-12'>
        <p className='row-header'>Tags: {image.tags}</p>
      </div>
    </div>
  )
}

export default GalleryImage
