import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as appActions from '$redux/actions/app'
import { bindActionCreators } from 'redux'
import './header'

const mapStateToProps = state => ({
  title: state.app.headerTitle
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appActions, dispatch)
})

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    actions: PropTypes.object
  }
  openSidebar = () => {
    this.props.actions.openSidebar(true)
  }
  goMy = (e) => {
    console.log(this.props)
  }
  render () {
    const { title } = this.props
    return (
      <nav id='header' data-flex='cross:center main:justify box:justify'>
        <a className='go-menu' onClick={this.openSidebar} href='javascript:;'><i className='iconfont icon-menu' /></a>
        <div className='title' data-flex='cross:center main:justify'>
          <p>{title}</p>
        </div>
        <div data-flex='cross:center'>
          <a className='go-city'>深圳<i className='iconfont icon-dropdown' /></a>
          <a className='go-mine' href='javascript:;' onClick={this.goMy}><i className='iconfont icon-people' /></a>
        </div>
      </nav>
    )
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header))
