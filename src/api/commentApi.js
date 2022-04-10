import request from '../util/request';

export function newComment(data){
  return request({
    url: '/comments/newComment',
    method: 'post',
    data: data,
  })
}

export function findByUid(uid) {
  return request({
    url: `/comments/findByUid/${uid}`,
    method: 'post',
  })
} 

export function findByTid(tid) {
  return request({
    url: `/comments/findByTid/${tid}`,
    method: 'post',
  })
} 