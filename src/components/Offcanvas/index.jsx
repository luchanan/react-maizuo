import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as appActions from '$redux/actions/app'
import { bindActionCreators } from 'redux'
import { slide as Menu } from 'react-burger-menu'
import './sidebar'

const mapStateToProps = state => ({
  isOpen: state.app.openSidebar
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appActions, dispatch)
})

class Offcanvas extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    actions: PropTypes.object,
    history: PropTypes.object
  }
  onStateChange = (p) => {
    if (!p.isOpen) {
      this.props.actions.openSidebar(false)
    }
  }
  go (e, path) {
    let {history} = this.props
    this.props.actions.openSidebar(false)
    history.push(path)
  }
  render () {
    return (
      <aside id='sidebar'>
        <Menu isOpen={this.props.isOpen} onStateChange={this.onStateChange}>
          <a href='javascript:;' onClick={(e, path) => { this.go(e, '/') }}>首页<i className='iconfont icon-arrow-right' /></a>
          <a href='javascript:;' onClick={(e, path) => { this.go(e, '/film') }}>影片<i className='iconfont icon-arrow-right' /></a>
          <a href='javascript:;' onClick={(e, path) => { this.go(e, '/cinema') }}>影院<i className='iconfont icon-arrow-right' /></a>
          <a href='javascript:;' onClick={(e, path) => { this.go(e, '/') }}>商城<i className='iconfont icon-arrow-right' /></a>
          <a href='javascript:;' onClick={(e, path) => { this.go(e, '/login') }}>我的<i className='iconfont icon-arrow-right' /></a>
          <a href='javascript:;' onClick={(e, path) => { this.go(e, '/') }}>卖座卡<i className='iconfont icon-arrow-right' /></a>
        </Menu>
      </aside>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Offcanvas)
