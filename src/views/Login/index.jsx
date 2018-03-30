import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MyInput from 'components/FormValidate/Input'
import Formsy from 'formsy-react'
import './login'

class Login extends Component {
  static propTypes = {
    history: PropTypes.object
  }
  state = {
    canSubmit: false
  }
  submit = (data) => {
    let params = {
      username: data.username,
      password: data.password
    }
    console.log(params)
    this.props.history.push('/home')
  }
  enableButton = () => {
    this.setState({
      canSubmit: true
    })
  }
  disableButton = () => {
    this.setState({
      canSubmit: false
    })
  }
  render () {
    return (
      <div id='login'>
        <Formsy onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
          <MyInput name='username' placeholder='输入手机号/邮箱' validationError='输入手机号/邮箱' required />
          <MyInput name='password' type='password' placeholder='输入密码/验证码' required />
          <button className='submit' type='submit' disabled={!this.state.canSubmit}>登录</button>
        </Formsy>
      </div>
    )
  }
}

export default Login
