import qs from 'qs'
import merge from 'lodash/merge'

export function commonRequest (passData, defultParams = true, requestType = 'post') {
  let params = {
    'json': JSON.stringify(
      merge({
        'id': new Date().getTime(),
        'params': defultParams ? { 'openId': '' } : {},
        'version': '1.0'
      }, passData || {})
    )
  }
  return requestType === 'post' ? qs.stringify(params) : params
}
