import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtActivityIndicator } from 'taro-ui'
import OrtherHeaderBar from '../../components/OrtherHeaderBar';
import SubscribeList from '../../components/subscribeList';
import styles from './index.module.scss';
import * as subscribeApi from '../../api/subscribeApi';
import * as hosueApi from '../../api/houseApi';
import * as userApi from '../../api/userApi';
export default function MySubscribe(props) {

    const [ current, setCurrent] = useState(0);

    const [subscribeList, setSubscribeList] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      getSubscribeList(0);
    }, [])

    const handleTabClick = (v) => {
      setCurrent(v)
      if(v === 0) {
        getSubscribeList(0)
      } else {
        getSubscribeList(1)
      }
    }

    const getSubscribeList = (current) => {
      let subscribeList = []
      let newSubscribeList = []
      subscribeApi.findByUid(parseInt(wx.getStorageSync('uid'))).then(res => {
        subscribeList = res.data;
      }).then(res => {
        subscribeList.forEach(item => {
          hosueApi.findHouseByid(item.houseId).then(res => {
            let newItem = {...item, ...res.data};
            userApi.findByUid(newItem.uid).then(res => {
              newItem = {...newItem, ...res.data}
              newSubscribeList.push(newItem);
            })
          })
        })
      })
      setSubscribeList([])
      setLoading(true)
      setTimeout(() => {
        if(current === 0) {
          newSubscribeList = newSubscribeList.filter(item => {
            return item.subscribeStatus === 0
          })
        } else {
          newSubscribeList = newSubscribeList.filter(item => {
            return item.subscribeStatus === 1
          })
        }
        console.log(newSubscribeList);
        setSubscribeList(newSubscribeList)
        setLoading(false)
      }, 1000);
    }

    const tabList = [{ title: '待处理' }, { title: '已完成' }]

    return (
      <View >
          <OrtherHeaderBar title={'我的预约'}/>
          <AtActivityIndicator isOpened={loading} content='加载中...' size={60} mode='center'></AtActivityIndicator>
          <View style={{margin: '30rpx'}}>
            <AtTabs current={current} tabList={tabList} onClick={handleTabClick}>
              <AtTabsPane current={current} index={0} >
                <View style={{height: '77vh'}}>
                  <SubscribeList subscribeList={subscribeList}/>
                </View>
              </AtTabsPane>
              <AtTabsPane current={current} index={1}>
                <View style={{height: '82vh'}}>
                  <SubscribeList subscribeList={subscribeList}/>
                </View>
              </AtTabsPane>
            </AtTabs>
          </View>
      </View>
    )
}
