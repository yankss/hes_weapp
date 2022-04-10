import request from '../util/request';

export function upload(data){
  return request({
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    url: '/file/upload',
    method: 'post',
    body: data,
  })
}