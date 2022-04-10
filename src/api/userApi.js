import request from '../util/request';

export function login(data){
  console.log(data);
  return request({
    url: '/users/login',
    method: 'post',
    data: data,
  })
}

export function registered(data){
  return request({
    url: '/users/reg',
    method: 'post',
    data: data,
  })
}

export function findByUsername(username) {
  return request({
    url: `/users/findByUsername/${username}`,
    method: 'post',
  })
} 

export function getListData() {
  return request({
    url: '/users/getAllUser',
    method: 'get',
  })
} 