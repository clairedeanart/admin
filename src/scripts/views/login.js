import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from './components/input';
import Api from '../helpers/api';

class Login extends Component {

  constructor(props) {
  	super(props);
  	this.state = {
      form: {
        username: '',
        password: '',
      }
    };

    this.handleInput = this.handleInput.bind(this);
    this.login = this.login.bind(this);
  }

  handleInput(key, val) {
    let form = this.state.form;
    form[key] = val;
    this.setState({ form })
  }

  login() {
    // Move this outta here
    Api.post('/auth/login', this.state.form)
    .then((res) => {
      Cache.set('user', res.user)
      Cache.set('token', res.token)
      this.props.router.push('/')
    }).catch((error) => {
      console.error('error', error)
    });
  }

  render() {
    return (
      <div className='container login-wrapper'>
        <div className='login__background'></div>
        <div className='floating-input__wrapper'>

          <div className='floating-input__header'>
            <h3>
              Login
            </h3>
          </div>

          <div className='floating-input__content'>
            <div className='row'>
              <div className='col-xs-12'>
                <Input
                  label='Username'
                  type='email'
                  value={this.state.form.username}
                  iconClassName='icon-user-secret'
                  handleUserInput={this.handleInput.bind(this)}
                />
              </div>
              <div className='col-xs-12'>
                <Input
                  label='Password'
                  type='password'
                  value={this.state.form.password}
                  iconClassName='icon-lock'
                  submitOnEnter={this.login}
                  handleUserInput={this.handleInput.bind(this)}
                />
              </div>
            </div>
          </div>

          <div className='col-xs-12 m-b-xs-1'>
            <div className='d-flex d-flex--justify-end'>
              <div onClick={this.login} className='btn'>Submit</div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
