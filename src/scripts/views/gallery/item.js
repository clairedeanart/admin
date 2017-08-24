import React, { Component } from 'react';
import cx from 'classnames';

class GalleryImage extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
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

  handleChange(key, e) {
    var state = this.state
    var changes = this.state.changes;

    state[key] = e.target.value;
    state.changes[key] = e.target.value;

    this.setState(state);
  }

  toggleFieldEditState(key, e) {
    e.stopPropagation();
    var state = this.state;
    state[`edit${key}`] = !state[`edit${key}`]
    if (this.nameInput)
      this.nameInput.focus()
    this.setState( state );
  }

  render() {
    const {
      image,
      index,
    } = this.props;
    var hover = cx({
      ' grid__item--hover': this.state.hover
    })
    var titleInput =
      (this.state.editName)
      ? (
        <div className='edit-field-wrapper edit-field-wrapper--editing'>
          <input
            ref={(i) => { this.nameInput = i}}
            type='text' onChange={this.handleChange.bind(this, 'name')}
            value={this.state.name}
          />
        </div>
      ) : (
        <div onClick={this.toggleFieldEditState.bind(this, 'Name')} className='edit-field-wrapper'>
          <i className='icon-pencil'></i>
          <h4>{this.state.name}</h4>
        </div>
      );
    return (
      <div
        key={`image-${index}${image.id}`}
        onClick={this.props.openLightbox}
        onMouseEnter={this.hover.bind(this, 'enter')}
        onMouseLeave={this.hover.bind(this, 'leave')}
        className={'grid__item'+hover}
      >
        <div className='grid__item__menu'>
          <div className='grid__item__menu-item row'>
            <div
              onClick={this.toggleFieldEditState.bind(this, 'Name')}
              className='col-xs-12 edit-field-wrapper'
            >
              <i className='icon-pencil'></i>
              <h4>{this.state.name}</h4>
            </div>
            <div
              className='col-xs-12 edit-field-wrapper edit-field-wrapper--editing'
            >
              <input
                ref={(i) => { this.nameInput = i}}
                type='text' onChange={this.handleChange.bind(this, 'name')}
                value={this.state.name}
              />
            </div>
          </div>
          <div className='grid__item__menu-item'>
            <i className='icon-pencil'></i>
            <h4>View</h4>
          </div>
        </div>
        <img src={image.location} />
      </div>
    )
  }
}

export default GalleryImage
