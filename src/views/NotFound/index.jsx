import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as appActions from '$redux/actions/app'
import './notFound'

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(appActions, dispatch)
})

class notFound extends Component {
  static propTypes = {
    actions: PropTypes.object
  }
  componentWillMount () {
    let {actions} = this.props
    actions.changeTitle('404')
  }
  render () {
    return (
      <div id='notFound'>
        <div className='notFoundImg' />
        <p>这个页面，神秘失踪了…</p>
        <p>不如<Link to='/'>返回卖座电影首页</Link>吧</p>
      </div>
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(notFound)
