import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import Header from 'components/Header'
import Menu from 'components/Offcanvas'

class Layout extends Component {
  static propTypes = {
    route: PropTypes.object
  }
  componentDidMount () {
  }
  render () {
    return (
      <div className='main-view'>
        {/* Header使用withRouter */}
        <Header />
        {/* Menu需要传递this.props下去，否者Menu组件无法使用this.props */}
        <Menu {...this.props} />
        <div className='view'>
          {/* 这里this.props不用传递，但是他的组件可以使用this.props.history.push等属性 */}
          {renderRoutes(this.props.route.childRoutes)}
        </div>
      </div>
    )
  }
}

export default Layout
