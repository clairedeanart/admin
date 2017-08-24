import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImagesActions from '../state/images/actions';
import cx from 'classnames';
import Api from '../helpers/api';
class Content extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      floatingHeader: false,
    };

    this.isTarget = this.isTarget.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', (e) => {
      let top = document.body.scrollTop;
      if (top > 20) {
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

  componentDidMount() {
    Promise.all([
      Api.get('/images'),
      Api.get('/images/unedited'),
      Api.get('/images/hidden')
    ])
    .then((res) => {
      this.props.addTo('live', res[0])
      this.props.addTo('unedited', res[1])
      this.props.addTo('hidden', res[2])
    }).catch((error) => {
      console.log('error', error)
    });
  }

  isTarget(t) {
    return t === this.props.location.pathname;
  }

  render() {
    const floatHeader = cx({
      ' floating-header--float': this.state.floatingHeader
    });
    const imageEditMode = cx({
      ' floating-header--edit': this.props.ui.lightboxOpen,
    });
    return (
      <div className="container">
        <div className='floating-header--margin'></div>
        <div className={`floating-header${floatHeader}${imageEditMode}`}>
          <div className='floating-header__inner container'>
              <div className={`floating-header__menu ${this.isTarget('/content/edit/live') ? 'floating-header__menu--active' : ''}`}>
                <Link to='/content/edit/live'>
                  <h3>Live</h3>
                </Link>
              </div>
              <div className={`floating-header__menu ${this.isTarget('/content/edit/new') ? 'floating-header__menu--active' : ''}`}>
                <Link to='/content/edit/new'>
                  <h3>Unedited</h3>
                </Link>
              </div>
              <div className={`floating-header__menu ${this.isTarget('/content/edit/hidden') ? 'floating-header__menu--active' : ''}`}>
                <Link to='/content/edit/hidden'>
                  <h3>Hidden</h3>
                </Link>
              </div>
            </div>
          <div className='floating-header__inner floating-header__edit-mode'>
            <div className={`floating-header__menu`}>
              <h3>Live</h3>
            </div>
            <div className={`floating-header__menu`}>
              <h3>Things</h3>
            </div>
            <div className={`floating-header__menu`}>
              <h3>Stuff</h3>
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
