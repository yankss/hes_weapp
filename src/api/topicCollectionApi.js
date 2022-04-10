import request from '../util/request';

export function topicCollected(data){
  console.log(data);
  return request({
    url: '/topicCollection/topicCollect',
    method: 'post',
    data: data,
  })
}

export function cancleCollected(data){
  console.log(data);
  return request({
    url: '/topicCollection/cancleCollected',
    method: 'post',
    data: data,
  })
}

export function checkIsCollected(data){
  console.log(data);
  return request({
    url: '/topicCollection/checkIsCollected',
    method: 'post',
    data: data,
  })
}