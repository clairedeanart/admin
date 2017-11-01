import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TetherComponent from 'react-tether'
import ImagesActions from '../state/images/actions';
import UiActions from '../state/ui/actions';
import cx from 'classnames';
import Api from '../helpers/api';
import Input from './components/input';
const _ = require('underscore');

class Content extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      floatingHeader: false,
      dropdownOpen: false,
      image: {}
    };

    this.isActive = this.isActive.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
    this.setAndSave = this.setAndSave.bind(this);
    this.setHidden = this.setHidden.bind(this);
    this.setLive = this.setLive.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.setUnsavedChanges = this.setUnsavedChanges.bind(this);
  }

  componentDidMount() {
    window.document.addEventListener('scroll', (e) => {
      let top = document.body.scrollTop;
      if (top > 3) {
        this.setState({
          floatingHeader: true,
        });
      } else {
        this.setState({
          floatingHeader: false,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    let { images } = this.props;
    let { lightboxImage } = nextProps.ui;
    let { dropdownOpen } = this.state;
    let image = lightboxImage;
    if (!image.id) dropdownOpen = false;
    this.setState({ image, dropdownOpen });
  }

  save(image) {
    Api.put(`/images/${this.props.ui.lightboxImage.id}`, image )
    .then(res => {
      let change = {
        ...res,
        unsaved: false,
      }
      this.props.actions.images.saveImageData(change);
      this.props.actions.ui.saveLightboxImageData(change);
      this.setState({ dropdownOpen: false });
    }).catch((error) => {
      console.error('error', error);
    });
  }

  handleChange(key, val) {
    if (val.value) val = val.value;
    var state = this.state;
    state.image[key] = val;
    this.setUnsavedChanges(state.image);
  }

  setUnsavedChanges(image) {
    let change = {
      ...image,
      unsaved: true
    }
    this.props.actions.images.updateImageData(change);
    this.props.actions.ui.updateLightboxImageData(change);
  }

  setAndSave(key) {
    let image = this[`set${key}`]()
    this.save(image);
  }

  setHidden() {
    let image = this.state.image;
    image = {
      ...image,
      unedited: false,
      hidden: true,
    };
    this.setState({ image });
    return image;
  }

  setLive() {
    let image = this.state.image;
    image = {
      ...image,
      unedited: false,
      hidden: false,
    };

    this.setState({ image });
    return image;
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  isTarget(t) {
    return t === this.props.location.pathname;
  }

  isActive(url) {
    return (
      url === this.props.location.pathname
      ? ''
      : ' floating-header__menu--active'
    )
  }

  render() {
    const floatHeader = cx({
      ' floating-header--float': this.state.floatingHeader
    });
    const imageEditMode = cx({
      ' floating-header--edit': this.props.ui.lightboxOpen,
    });
    const image = this.props.ui.lightboxImage;
    const isHidden = image && (image.hidden || image.unedited);
    const unsaved = cx({
      ' btn btn-secondary': image && image.unsaved,
      ' btn-outlined btn-primary': image && !image.unsaved,
    })
    const activeHeader = cx({
      ' floating-header__menu--active': this.isTarget('')
    });
    return (
      <div className="container">
        <div className='floating-header--margin'></div>
        <div className={`page-header floating-header${floatHeader}${imageEditMode}`}>
          <div className='floating-header__inner'>
            <div className={'floating-header__menu' + this.isActive('/hidden')}>
              <Link to='/live'>
                <h3>Live</h3>
              </Link>
            </div>
            <div className={'floating-header__menu' + this.isActive('/live')}>
              <Link to='/hidden'>
                <h3>Hidden</h3>
              </Link>
            </div>
          </div>

          {/* Floating header image menu */}
          <div className='floating-header__inner floating-header__edit-mode container'>
            <Input
              small
              handleUserInput={this.handleChange}
              submitOnEnter={this.save.bind(this, image)}
              type='text'
              label='Image name'
              formKey='name'
              value={this.state.image.name || ''}
              className='page-header__title'
            />
            <div className='page-header__buttons'>
              <TetherComponent
                attachment="bottom center"
                classPrefix={'dropdown-menu'}
                offset={'-14px 0px'}
                classes={{
                  'out-of-bounds': false
                }}
                constraints={[{
                  to: 'window',
                  attachment: 'together',
                  pin: true
                }]}
              >
                <div
                  onClick={this.toggleDropdown}
                  className='page-header__button btn-outlined btn--sm btn-primary'>
                  Info
                </div>
                {
                  this.state.dropdownOpen &&
                  <div className="dropdown-menu__inner">
                    <Input
                      small
                      handleUserInput={this.handleChange}
                      submitOnEnter={this.save.bind(this, image)}
                      type='text'
                      label='Dimensions'
                      formKey='dimensions'
                      value={this.state.image.dimensions || ''}
                      className='page-header__title'
                    />
                    <Input
                      small
                      handleUserInput={this.handleChange}
                      submitOnEnter={this.save.bind(this, image)}
                      type='text'
                      label='Medium'
                      formKey='medium'
                      value={this.state.image.medium || ''}
                      className='page-header__title'
                    />
                    <Input
                      small
                      handleUserInput={this.handleChange}
                      submitOnEnter={this.save.bind(this, image)}
                      type='text'
                      label='Price'
                      formKey='price'
                      iconClassName={'icon-dollar'}
                      value={image.price || ''}
                      className='page-header__title'
                    />
                  <div className='row m-t-xs-1'>
                      <p
                        className='col-xs-3'
                        style={{
                          fontSize: '16px',
                          textAlign: 'center',
                        }}>
                        Sold
                      </p>
                      <div className='col-xs-4'>
                        <input
                          name='sold'
                          id='isSold'
                          checked={image.sold}
                          type='radio'
                          onChange={this.handleChange.bind(this, 'sold', true)}/>
                        <label
                          style={{
                            fontSize: '15px'
                          }}
                          htmlFor='isSold'>Yes!</label>
                      </div>
                      <div className='col-xs-4'>
                        <input
                          name='sold'
                          id='isNotSold'
                          type='radio'
                          checked={!image.sold}
                          onChange={this.handleChange.bind(this, 'sold', false)}/>
                        <label
                          style={{
                            fontSize: '15px'
                          }}
                          htmlFor='isNotSold'>No</label>
                      </div>
                    </div>
                  </div>
                }
              </TetherComponent>
              <div
                onClick={this.setAndSave.bind(this, isHidden ? 'Live' : 'Hidden')}
                className='page-header__button btn-outlined btn--sm btn-primary'>
                { isHidden ? 'Mark as live' : 'Mark as hidden'}
              </div>
              <div
                onClick={this.save.bind(this, image)}
                className={'page-header__button btn--sm ' + unsaved}>
                Save
              </div>
            </div>
          </div>

        </div>
        { this.props.children }
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
)(Content);
