import React, { Component } from 'react'
import { propTypes, withFormsy } from 'formsy-react'

class Input extends Component {
  changeValue = (event) => {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    this.props.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value'])
  }
  render () {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = `form-group ${this.props.showRequired() ? 'required' : ''} ${this.props.showError() ? 'error' : ''}`
    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.props.getErrorMessage()
    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input
          className='form-control'
          onChange={this.changeValue}
          name={this.props.name}
          type={this.props.type || 'text'}
          value={this.props.getValue() || ''}
          placeholder={this.props.placeholder}
          autoComplete='off'
        />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    )
  }
}
Input.propTypes = {
  ...propTypes
}
export default withFormsy(Input)
