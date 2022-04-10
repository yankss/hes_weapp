import request from '../util/request';

export function newTopic(data){
  console.log(data);
  return request({
    url: '/topics/newTopic',
    method: 'post',
    data: data,
  })
}

export function findById(tid) {
  return request({
    url: `/topics/findByTid/${tid}`,
    method: 'post',
  })
}

export function findCollectionTopicByUid(uid) {
  return request({
    url: `/topics/findCollectionTopicByUid/${uid}`,
    method: 'post',
  })
}

export function findByUid(uid) {
  return request({
    url: `/topics/findByUid/${uid}`,
    method: 'post',
  })
}

export function fuzzyQuery(topicTitle) {
  return request({
    url: `/topics/fuzzyQuery/${topicTitle}`,
    method: 'post',
  })
}

export function getAllTopic(){
  return request({
    url: '/topics/getAllTopic',
    method: 'get',
  })
}