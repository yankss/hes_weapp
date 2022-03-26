import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import OrtherHeaderBar from '../../components/OrtherHeaderBar';
import SubscribeList from '../../components/subscribeList';
import styles from './index.module.scss';
export default function MySubscribe(props) {

    const [ current, setCurrent] = useState(0);

    const [subscribeList, setSubscribeList] = useState([])

    useEffect(() => {
      setSubscribeList([
        {
          landlordName: 'Qasdc',
          houseTitle: '整租 | 南山风井花园 近学校 拎包入住 免停车费 免物业费 生活便利',
          landLordPhone: '13466435767',
          subscribeDate: '2022-03-12',
          key: '1',
          houseLocation: 'Sidney No. 1 Lake Park'
        },
        {
          landlordName: 'Brown',
          houseTitle: '整租 | 南山风井花园 近学校 拎包入住 免停车费 免物业费 生活便利',
          landLordPhone: '13466435767',
          subscribeDate: '2022-03-12',
          key: '2',
          houseLocation: 'Sidney No. 1 Lake Park'
        },
        {
          landlordName: 'Joe',
          houseTitle: '整租 | 南山风井花园 近学校 拎包入住 免停车费 免物业费 生活便利',
          landLordPhone: '13466435767',
          subscribeDate: '2022-03-12',
          key: '3',
          houseLocation: 'Sidney No. 1 Lake Park'
        },
        {
          landlordName: 'Black',
          houseTitle: '整租 | 南山风井花园 近学校 拎包入住 免停车费 免物业费 生活便利',
          landLordPhone: '13466435767',
          subscribeDate: '2022-03-12',
          key: '4',
          houseLocation: 'Sidney No. 1 Lake Park'
        },
      ])
    }, [])

    const handleTabClick = (v) => {
      setCurrent(v)
    }

    const tabList = [{ title: '待处理' }, { title: '已完成' }]

    return (
      <View >
          <OrtherHeaderBar title={'我的预约'}/>
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
