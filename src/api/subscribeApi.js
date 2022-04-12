import request from '../util/request';

export function addSubscribe(data) {
  return request({
    url: '/subscribe/addSubscribe',
    method: 'post',
    data: data
  })
}

export function findByUid(uid){
  return request({
    url: `/subscribe/findByUid/${uid}`,
    method: 'post',
  })
}