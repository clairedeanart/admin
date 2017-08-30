import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Lightbox extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      image: props.currentImage || null,
      images: props.images || []
    };

    this.portal = false;

    this.mount = this.mount.bind(this);
    this.unmount = this.unmount.bind(this);
    this.doRender = this.doRender.bind(this);
    this.reveal = this.reveal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount() {
    if (this.props.open) {
      if (!this.portal) this.mount(this.props);
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.open && !this.props.open) {
      this.mount(nextProps);
    } else if (!nextProps.open && this.props.open) {
      this.unmount();
      return;
    } else if (nextProps.open && this.props.open) {
      this.mount(nextProps);
    }

    if (nextProps.currentImage) {
      this.setState({
        image: nextProps.image,
      });
    }

    if (nextProps.images) {
      this.setState({
        images: nextProps.images
      });
    }
  }

  componentWillUnmount() {
   this.unmount();
  }

  mount(props) {
    if (!this.portal) {
      this.portal = document.createElement('div');
      this.portal.className = 'lightbox';
      document.body.appendChild(this.portal);
      this.doRender(props);
      setTimeout(this.reveal.bind(this), 10);
    }
  }

  doRender(props) {
    if (!props.image || (props.image && !props.image.elem)) return
    var closeIcon = (<i className="lightbox__close-icon icon-cancel-circled" onClick={this.handleClick} />);
    if (this.props.hideCloseIcon) {
      closeIcon = null;
    }

    var imageDimensions = this.getImageDimensions(props.image)

    //remove unnecessary div props
    const divProps = Object.assign({}, props);
    delete divProps.close;
    delete divProps.open;
    delete divProps.image;
    delete divProps.images;
    delete divProps.transition;
    delete divProps.allowClose;
    delete divProps.showCloseIcon;
    ReactDOM.render(<div
      style={{overflow: 'auto'}}
      onClick={this.handleClick}
      className="lightbox__backdrop">
      <div {...divProps}>
        <div className='lightbox__close-icon__wrapper'>
          {closeIcon}
        </div>
        <div className='lightbox__image__wrapper'>
          <img
            className='lightbox__image'
            src={props.image.data.location}
            alt={props.image.data.name || props.image.data.id}
            style={
              {
                transform: `translateY(${imageDimensions.height}px)`,
                height: imageDimensions.height,
                // width: imageDimensions.width,
              }
            }
            />
        </div>
      </div>
    </div>, this.portal);
  }

  getImageDimensions(image) {
    if (!image || (image && !image.elem)) return;
    var wh = window.innerHeight;
    var ww = window.innerWidth;
    var width = "";
    var height = "";

    if (image.elem.height > image.elem.width) {
      // Vertical image
      height = wh;
      width = wh * (image.elem.width / image.elem.height);
    } else if (image.elem.height < image.elem.width) {
      // Horizontal imag
      height = ww * (image.elem.height / image.elem.width);
      width = ww;
    } else {
      // Square image
      height = wh;
      width = wh * (image.elem.width / image.elem.height);
    }

    return {
      height: Math.max(wh, height),
      width: Math.max(ww, width)
    }
  }

  handleClick(e) {
    if (e.target.className === 'lightbox__backdrop') {
      this.props.close();
    }
    if (e.target.classList.contains('lightbox__close-icon')) {
      this.props.close();
    }
    if (e.target.dataset.forceClose) {
      this.props.close();
    }
  }

  reveal() {
    if (this.portal) {
      this.portal.classList.add('lightbox--fade-in');
      document.querySelector('.lightbox__image').style.transform = `translateY(0px)`

    }
    document.body.classList.add('no-scroll');
  }

  hide(callback) {
    if (this.portal) {
      this.portal.classList.remove('lightbox--fade-in');
      var d = this.getImageDimensions(this.props.image);
      document.querySelector('.lightbox__image').style.transform = `translateY(${d.height}px)`
      if (typeof callback === 'function') {
        setTimeout(callback, 350);
      }
    }
  }

  unmount() {
   if (this.portal) {
      this.hide(() => {
        if (this.portal) {
          ReactDOM.unmountComponentAtNode(this.portal);
          document.body.removeChild(this.portal);
          this.portal = false;
          this.props.close();
          setTimeout(() => {
            document.body.classList.remove('no-scroll');
          }, 100)
        }
      });
    }
  }

  render() {
    return null;
  }


  // render() {
  //
  //   return (
  //     <div className='lightbox'>
  //       <div className='lightbox__close-icon__wrapper'>
  //         <div className='icon-cancel-circled'></div>
  //       </div>
  //       <div className='lightbox__backdrop'>
  //         <div className='lightbox__image__wrapper'>
  //           <img className='lightbox__image'>
  //             {this.state.currentImage}
  //           </img>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
}

Lightbox.defaultProps = {
  close: function(){},
  allowClose: true,
  showCloseIcon: true,
  open: false,
  transition: 300
}

export default Lightbox
