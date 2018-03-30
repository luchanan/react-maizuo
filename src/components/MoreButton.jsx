import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const MoreButton = ({ obj }) => (
  <Link to={obj.router} className='more-button'>{obj.text}</Link>
)

MoreButton.prototype.propTypes = {
  obj: PropTypes.object
}

export default MoreButton
