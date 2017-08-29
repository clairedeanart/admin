import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TetherComponent from 'react-tether'
import ImagesActions from '../state/images/actions';
import cx from 'classnames';
import Api from '../helpers/api';
import Input from './components/input';
import Select from 'react-select';
const _ = require('underscore');

class Content extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      floatingHeader: false,
      dropdownOpen: false,
      image: {
        name: props.ui.lightboxImage.name || '',
      }
    };

    this.isTarget = this.isTarget.bind(this);
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
    let {
      images,
    } = this.props;
    let image = {};
    if (nextProps.ui.lightboxImage.id) {
      let list = this.props.images.list;
      image = _.find(list, (img) => {return img.id == nextProps.ui.lightboxImage.id})
    }
    let dropdownOpen = this.state.dropdownOpen;
    if (!image.id) {
      dropdownOpen = false;
    }
    this.setState({ image, dropdownOpen });
  }

  save(image) {
    image = image || this.state.image;
    console.log('saving image', image);
    Api.put(`/images/${this.props.ui.lightboxImage.id}`, image )
    .then(res => {
      let saved = {
        ...res,
        unsaved: true
      }
      this.setState({
        dropdownOpen: false,
      });
      this.props.updateImageData(saved);
    }).catch((error) => {
      console.error('error', error);
    });
  }

  isTarget(t) {
    return t === this.props.location.pathname;
  }

  handleChange(key, val) {
    if (val.value) val = val.value;
    var state = this.state;
    state.image[key] = val;
    state.image.unsaved = true;
    this.setState({ state });
    // this.setUnsavedChanges();
  }

  setUnsavedChanges() {
    let change = {
      ...this.state.image,
      id: this.props.ui.lightboxImage.id,
      unsaved: true
    }
    this.props.updateImageData(change);
  }

  setAndSave(key) {
    let image = this[`set${key}`]()
    this.save(image)
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
      hidden: !image.hidden,
    };

    this.setState({ image });
    return image;
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const floatHeader = cx({
      ' floating-header--float': this.state.floatingHeader
    });
    const imageEditMode = cx({
      ' floating-header--edit': this.props.ui.lightboxOpen,
    });
    const unsaved = cx({
      ' btn btn-secondary': this.state.image && this.state.image.unsaved,
      ' btn-outlined btn-primary': this.state.image && !this.state.image.unsaved,
    })
    const isHidden = this.state.image && this.state.image.hidden
    return (
      <div className="container">
        <div className='floating-header--margin'></div>
        <div className={`page-header floating-header${floatHeader}${imageEditMode}`}>
          <div className='floating-header__inner'>
            <div className={`floating-header__menu ${this.isTarget('/content/edit/live') ? 'floating-header__menu--active' : ''}`}>
              <Link to='/content/edit/live'>
                <h3>Live</h3>
              </Link>
            </div>
            <div className={`floating-header__menu ${this.isTarget('/content/edit/hidden') ? 'floating-header__menu--active' : ''}`}>
              <Link to='/content/edit/hidden'>
                <h3>Hidden</h3>
              </Link>
            </div>
          </div>
          <div className='floating-header__inner floating-header__edit-mode container'>
            <Input
              small
              handleUserInput={this.handleChange}
              submitOnEnter={this.save}
              type='text'
              label='Image name'
              formKey='name'
              value={this.state.image.name}
              className='page-header__title'
            />
            <div className='page-header__buttons'>
              <TetherComponent
                attachment="bottom center"
                classPrefix={'dropdown-menu'}
                offset={'-20px 0px'}
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
                    <h3 className=''>
                      Image info
                    </h3>

                    <Input
                      small
                      handleUserInput={this.handleChange}
                      submitOnEnter={this.save}
                      type='text'
                      label='Dimensions'
                      formKey='dimensions'
                      value={this.state.image.dimensions}
                      className='page-header__title'
                    />
                    <Input
                      small
                      handleUserInput={this.handleChange}
                      submitOnEnter={this.save}
                      type='text'
                      label='Medium'
                      formKey='medium'
                      value={this.state.image.medium}
                      className='page-header__title'
                    />
                    <Input
                      small
                      handleUserInput={this.handleChange}
                      submitOnEnter={this.save}
                      type='text'
                      label='Price'
                      formKey='price'
                      iconClassName={'icon-dollar'}
                      value={this.state.image.price}
                      className='page-header__title'
                    />
                    <div className='row'>
                      <p
                        className='col-xs-12'
                        style={{
                          marginTop: '5px',
                          fontSize: '13px'
                        }}>
                        Sold
                      </p>
                      <div className='col-xs-6'>
                        <input
                          name='sold'
                          id='isSold'
                          checked={this.state.image.sold}
                          type='radio'
                          onChange={this.handleChange.bind(this, 'sold', true)}/>
                        <label
                          style={{
                            fontSize: '16px'
                          }}
                          htmlFor='isSold'>Yes!</label>
                      </div>
                      <div className='col-xs-6'>
                        <input
                          name='sold'
                          id='isNotSold'
                          checked={!this.state.image.sold}
                          type='radio'
                          onChange={this.handleChange.bind(this, 'sold', false)}/>
                        <label
                          style={{
                            fontSize: '16px'
                          }}
                          htmlFor='isNotSold'>Eh no..</label>
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
                onClick={this.save.bind(this, this.state.image)}
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
  return bindActionCreators(
    ImagesActions,
    dispatch,
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
