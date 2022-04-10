import request from '../util/request';

export function addSubscribe() {
  return request({
    url: '/subscribe/addSubscribe',
    method: 'post',
  })
}