import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../helpers/api';
import Gallery from './gallery/list';
// const Masonry = require('masonry-layout');
// const imagesLoaded = require('imagesloaded')
import StackGrid, { transitions } from "react-stack-grid";
import cx from 'classnames';
const { scaleDown } = transitions;

var Dropzone = require('react-dropzone');

class Upload extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      images: [],
    };

    this.grid = null;
    this.elem = null;
    this.masonry = null;

    this.onDrop = this.onDrop.bind(this);
    this.upload = this.upload.bind(this);
    this.displayPreviews = this.displayPreviews.bind(this);
  }
  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({
      images: acceptedFiles,
      dragOver: false,
      loading: false,
      successMessage: null,
    });
  }

  upload() {
    this.setState({
      loading: true,
    });
    var len = this.state.images.length;
    Api.upload(this.state.images)
    .then((uploaded) => {
      alert('upload success!')
      this.setState({
        images: [],
        loading: false,
        successMessage: `${len} images uploaded successfully!`
      });
      setTimeout(() => {
        this.setState({
          successMessage: null
        }, 3000);
      })
    })
    .catch((e) => { alert('upload error :(!') })
  }

  displayPreviews(images) {
    images = images.map((image, index) => {
      // return this.state.images.map((img) => {
      //     return (<img className="dropzone-preview" key={img.name} src={img.preview} />)
      //   })
      return {
        ...image,
        location: image.preview,
        hideMenu: true,
        name: null,
        type: 'preview',
        id: Math.random()
      }
    });

    return (
      <div className='gallery__grid'>
        {
          images.map((img, index) => {
            return (
              <div key={'img-'+index} className='grid__item grid__item--small'>
                <img  src={img.preview} alt=''/>
              </div>
            )
          })
        }
      </div>
    )
  }

  render() {
    var drag = cx({
      ' dropzone__icons--expanded': this.state.dragOver
    });
    var shrinkDropzone = cx({
      ' dropzone-wrapper--shrink': this.state.images.length,
    });
    var buttons = (
      !this.state.images.length
      ? null
      : (
        <div className='page-header__buttons page-header__buttons--fixed'>
          <div
            onClick={() => {
              this.setState({
                images: [],
              });
            }}
            className='page-header__button btn-outlined btn-secondary'>
            Reset
          </div>
          <div
            onClick={this.upload}
            className='page-header__button btn-outlined btn-secondary'>
            Save Images
          </div>
        </div>
      )
    )
    var loading = (
      this.state.loading
      ? (
        <div className='loadin'>

        </div>
      ) : null
    )
    return (
      <div className='container'>
        <div className='page-header'>
          <h3 className='page-header__title'>Upload</h3>
          { buttons }
        </div>
        <Dropzone
          onDragEnter={() => {
            this.setState({
              dragOver: true
            });
          }}
          onDragLeave={() => {
            this.setState({
              dragOver: false
            });
          }}
          name='photos'
          className={'dropzone-wrapper'+shrinkDropzone}
          onDrop={this.onDrop}>
          <div className={'dropzone__icons'+drag}>
            <i className='icon-file-image dropzone__empty-icon'></i>
            <i className='icon-picture dropzone__empty-icon'></i>
            <i className='icon-pictures dropzone__empty-icon'></i>
          </div>
          <div className='dropzone__title'>
            <h3 className='dropzone__title__text'>
              Drag and drop or click to upload images...
            </h3>
          </div>
        </Dropzone>
        <div className='container'>
          { this.displayPreviews(this.state.images) }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return { }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
