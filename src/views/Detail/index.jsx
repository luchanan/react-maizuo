import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink as Link } from 'react-router-dom'
import * as detailActions from '$redux/actions/detail'
import './detail'

const mapStateToProps = state => ({
  detail: state.detail.info
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(detailActions, dispatch)
})

class Detail extends Component {
  static propTypes = {
    match: PropTypes.object,
    actions: PropTypes.object,
    detail: PropTypes.object
  }
  componentDidMount () {
    let {match} = this.props
    let id = match.params.id
    this.props.actions.getFilmDetail({id})
  }
  formatDate (time) {
    let date = new Date(time * 1)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
    let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
    return year + '-' + month + '-' + day
  }
  render () {
    let {detail} = this.props
    if (Object.keys(detail).length === 0) return false
    return (
      <div id='detail'>
        <div className='img placeholder'>
          <img src={detail.cover.origin} />
        </div>
        <div className='film-desc'>
          <div className='film-title'>影片简介</div>
          <div className='info'>
            <div className='file-word'>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：{detail.director}</div>
            <div className='file-word'>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;演：112</div>
            <div className='file-word'>地区语言：{detail.nation}({detail.language})</div>
            <div className='file-word'>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型：{detail.category}</div>
            <div className='file-word'>上映日期：{this.formatDate(detail.premiereAt)}</div>
            <div className='sum file-word'>{detail.synopsis}</div>
          </div>
        </div>
        <Link className='go-pay' to={{pathname: '/cinema'}} >立即购票</Link>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detail)
