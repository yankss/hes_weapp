import request from '../util/request';

export function houseCollected(data){
  console.log(data);
  return request({
    url: '/houseCollection/hosueCollect',
    method: 'post',
    data: data,
  })
}

export function cancleCollected(data){
  console.log(data);
  return request({
    url: '/houseCollection/cancleCollected',
    method: 'post',
    data: data,
  })
}

export function checkIsCollected(data){
  console.log(data);
  return request({
    url: '/houseCollection/checkIsCollected',
    method: 'post',
    data: data,
  })
}