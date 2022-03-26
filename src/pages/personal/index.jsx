import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtIcon, AtAvatar, AtGrid, AtSteps } from 'taro-ui'
import styles from './index.module.scss';
export default function Personal() {
  const [hotActionTabList, sethotActionTabList] = useState([]);
  const [moreActionTabList, setMoreActionTabList] = useState([]);
  const [current, setCurrent] = useState(4)

  useEffect(() => {
    sethotActionTabList([
      { 
        value: '认证申请', 
        image: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E8%AE%A4%E8%AF%81%E4%B8%AD%E5%BF%83.png', 
      },
      { 
        value: '话题', 
        image: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E8%AF%9D%E9%A2%98.png', text: '100', 
        max: 99 }
    ])
    setMoreActionTabList([
      {
        image: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E8%AE%A4%E8%AF%81%E4%B8%AD%E5%BF%83.png',
        value: '认证申请',
      },
      {
        image: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%88%BF%E5%AD%90.png',
        value: '我的房子'
      },
      {
        image: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%94%B6%E6%8D%AE%E7%82%B9%E5%87%BB.png',
        value: '我的收据'
      },
      {
        image: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E5%90%88%E7%BA%A6%EF%BC%881%EF%BC%89.png',
        value: '我的合约'
      },
      {
        image: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E9%A2%84%E7%BA%A6%E6%97%A5%E6%9C%9F.png',
        value: '我的预约'
      },
      {
        image: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E8%AF%9D%E9%A2%98.png',
        value: '话题'
      }
    ])
    console.log('123'.length);
  }, []);

  const hotActionDandleClick = (object, index) => {
    console.log(object);
    console.log(index);
  };

  const goPersonalSetting = () => {
    // 可返回跳转
    wx.navigateTo({
      url: '/pages/personalSetting/index',
    });
  }

  const moreActionHandleClick = (object, index) => {
    console.log(object);
    console.log(index);
    switch (index) {
      case 0:
        wx.navigateTo({
          url: '/pages/certificationApplication/index',
        });
        break;

      case 1:
        // 可返回跳转
        wx.navigateTo({
          url: '/pages/myHouse/index',
        });
        break;
    

      case 2:
        wx.navigateTo({
          url: '/pages/noReceipt/index',
        });
        break;
    

      case 3:
        wx.navigateTo({
          url: '/pages/noContract/index',
        });
        break;
    

      case 4:
        wx.navigateTo({
          url: '/pages/mySubscribe/index',
        });
        break;
    

      case 5:
        wx.navigateTo({
          url: '/pages/topicPage/index',
        });
        break;
    
    
      default:
        break;
    }
  }
  const stepsChange = () => {

  }

  const items = [
    { 
      'title': '未提交', 
      'icon': {
        value: 'edit',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '18',
      },
      'status': ''
    },
    { 
      'title': '未审核', 
      'icon': {
        value: 'loading-2',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14',
      },
      'status': ''
    },
    { 
      'title': '认证完成', 
      'icon': {
        value: 'check',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14',
      },
      'status': ''
    }
  ]

  return (
    <View className={styles.mainContainer}>
      <View className={styles.mainContainerTop}>
        <View className={styles.userInfoMain}>
          <View className={styles.userInfo}>
            <AtAvatar circle image='https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/male'></AtAvatar>
            <View className={styles.userText}>
              <View className={styles.userName}>Yankss</View>
              <View className={styles.identity}>租客</View>
            </View>
          </View>
          <AtIcon onClick={goPersonalSetting} className={styles.settingsIcon} value='settings' size='20' color='000'></AtIcon>
        </View>
        <View className={styles.userValue}>
          <View className={styles.valueStyle}>
            <View>123,123</View>
            <View className={styles.numericalLabel}>活跃度</View>
          </View>
          <View className={styles.valueStyle}>
            <View>423,41</View>
            <View className={styles.numericalLabel}>积分值</View>
          </View>
        </View>
      </View>
      <View className={styles.mainContainerMiddle}>
        <View className={styles.certificationStatus}>认证状态</View>
        <AtSteps
          items={items}
          current={current}
          onChange={stepsChange}
        />
      </View>
      <View className={styles.mainContainerBottom}>
        <View style={{ padding: '30rpx', fontWeight: 'bold' }}>更多服务</View>
        <AtGrid
          className={styles.moreList}
          mode='square'
          data={moreActionTabList}
          onClick={moreActionHandleClick}
          hasBorder={false}
          columnNum={4}
        />
      </View>
    </View>
  )
}
