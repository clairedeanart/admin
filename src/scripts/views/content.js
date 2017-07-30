import React, { Component } from 'react';
import { connect } from 'react-redux';

class Content extends Component {
  render() {
    return (
      <div className="container">
        <h3>Content</h3>
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
)(Content);
