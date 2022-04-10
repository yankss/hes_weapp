import request from '../util/request';

export function getAllHouse() {
  return request({
    url: '/houses/getAllHouses',
    method: 'get',
  })
}

export function findHouseByid(hid) {
  return request({
    url: `/houses/findHouseById/${hid}`,
    method: 'post',
  })
}

export function findCollectionHouseByUid(uid) {
  return request({
    url: `/houses/findCollectionHouseByUid/${uid}`,
    method: 'post',
  })
} 