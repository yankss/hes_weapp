import request from '../util/request';


export function findHouseFacilityByid(hid) {
  return request({
    url: `/houseFacility/findHouseFacilityByHid/${hid}`,
    method: 'post',
  })
} 