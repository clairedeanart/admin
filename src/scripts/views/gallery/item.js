import React, { Component } from 'react';
import cx from 'classnames';

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

  componentWillReceiveProps(nextProps) {
    if (this.props.image.unsaved && !nextProps.image.unsaved) {
      this.setState(this.state);
    }
  }

  getBanner(show, title, location) {
    location = ` grid__item__alert--${location}`;
    return (
      show
      ? (
        <div className={'grid__item__alert'+location}>
           <h4>{title}</h4>
        </div>
      ) : null
    )
  }

  render() {
    const {
      image,
      index,
    } = this.props;
    const hover = cx({
      ' grid__item--hover': this.state.hover
    });

    const selected = cx({
      ' grid__item--selected': image.selected,
    });

    return (
      <div
        key={`image-${index}${image.id}`}
        onDoubleClick={this.props.openLightbox}
        onClick={this.props.selectItem}
        onMouseEnter={this.hover.bind(this, 'enter')}
        onMouseLeave={this.hover.bind(this, 'leave')}
        className={'grid__item'+hover+selected}
      >
        { this.getBanner(image.unsaved, 'Unsaved', 'top') }
        { this.getBanner(image.selected, 'Selected', 'bottom') }
        <img alt='' src={image.location} />
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
