import React, { Component } from 'react';
import { connect } from 'react-redux';
import Api from '../helpers/api';
var Dropzone = require('react-dropzone');


class Upload extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      images: [],
    };

    this.onDrop = this.onDrop.bind(this);
    this.upload = this.upload.bind(this);
    this.displayPreviews = this.displayPreviews.bind(this);
  }
  onDrop(acceptedFiles, rejectedFiles) {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    this.setState({
      images: acceptedFiles,
    });
  }

  upload() {
    Api.upload(this.state.images)
    .then((uploaded) => {
      alert('upload success!')
      this.setState({
        images: []
      });
    })
    .catch((e) => { alert('upload error :(!') })
  }

  displayPreviews() {
    return this.state.images.map((img) => {
        return (<img className="dropzone-preview" key={img.name} src={img.preview} />)
      })
  }

  render() {
    return (
      <div className="container">
        <h3>Upload</h3>
        <Dropzone name="photos" className="dropzone-wrapper col-xs-6 col-xs-offset-3" onDrop={this.onDrop}>
          <i className="icon-picture empty-icon"></i>
          <div>Drag and drop or click to upload images...</div>
          <div className='dropzone-preview__wrapper'>
            {this.displayPreviews()}
          </div>
        </Dropzone>
        <div onClick={this.upload} className='btn-outlined'>
          Upload
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
