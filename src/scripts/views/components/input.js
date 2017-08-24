import React, { Component } from 'react';
import cx from 'classnames';
import _ from 'underscore'

// $untouched The field has not been touched yet
// $touched The field has been touched
// $pristine The field has not been modified yet
// $dirty The field has been modified
// $invalid The field content is not valid
// $valid The field content is valid

class Input extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      hasContent: false,
      valid: true,
      errors: [],
      value: '',
    };
    this.key = props.formKey || props.label.toLowerCase();
  }

  handleChange = (e) => {
    let value = e.target.value;

    this.setHasContent(this.hasContent(value));

    //check same as if compare === true
    if (this.props.shouldCompare) {
      if (value === this.props.compareValue) {

      } else {

      }
    }

    this.setState({
      value: value
    });
    this.props.handleUserInput(this.key, value);
  }

  handleKeyPress = (e) => {
    if (e.which === 13 || e.key === 'Enter' && _.isFunction(this.props.submitOnEnter)) {
      this.props.submitOnEnter()
    }
  }

  setHasContent(state) {
    this.setState({
      dirty: state
    });
  }

  hasContent(input) {
    return input && input.trim() && input.trim().length
  }

  createIcon() {
    let icon = null;
    if (this.props.iconClassName) {
      icon = (<i className={"form-group-icon " + this.props.iconClassName}></i>);
    }
    return icon;
  }

  switchValidity() {
    this.setState({
      valid: !this.state.valid,
      invalid: !this.state.invalid
    });
  }

  render() {
    let {className, iconClassName, id, type, label} = this.props;
    let hasContent = cx({
      ' dirty': this.state.dirty
    });
    let hasIcon = cx({
      ' has-icon': !!iconClassName
    });
    let validity = cx({
      ' valid': this.state.valid,
      ' invalid': this.state.invalid
    });
    let half = cx({
      ' half': this.props.half
    });

    return (
      <div id={id} className={className+" input-group" + hasContent + hasIcon + half}>
        <input
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          type={type}
          name={label.toLowerCase()}/>
        <label htmlFor={label.toLowerCase()}>{label}</label>
        <div className="bar"></div>
        {this.createIcon()}
        {this.state.errors.map(err => {
          return <div className="form-err">{err.msg}</div>
        })}
      </div>
    )
  }
}

Input.propTypes = {
  handleUserInput: React.PropTypes.func.isRequired,
  label: React.PropTypes.string.isRequired
};

Input.defaultProps = {
  iconClassName: false,
  type: 'text',
  shouldCompare: false,
  compareValue: '',
  half: false,
  className: '',
  id: '',
  isRequired: false,
  submitOnEnter: false,
};

export default Input;
