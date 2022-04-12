import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtIcon, AtAvatar, AtGrid, AtSteps, AtModal, AtModalContent, AtModalAction } from 'taro-ui'
import styles from './index.module.scss';
import * as userApi from '../../api/userApi';
export default function Personal() {
  const [moreActionTabList, setMoreActionTabList] = useState([
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
  ]);
  const [userObj, setUserObj] = useState({})
  const [current, setCurrent] = useState(4)
  const [items, setItems] = useState([])
  const [certificationStatus, setCertificationStatus] = useState(0)
  const [errorOpened, setErrorOpened] = useState(false)

  const noSubmitItems = [
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
      'title': '审核中', 
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

  const checkingItems = [
    { 
      'title': '未提交', 
      'icon': {
        value: 'edit',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '18',
      },
      'status': 'success'
    },
    { 
      'title': '审核中', 
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

  const failedItems = [
    { 
      'title': '未提交', 
      'icon': {
        value: 'edit',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '18',
      },
      'status': 'success'
    },
    { 
      'title': '审核中', 
      'icon': {
        value: 'loading-2',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14',
      },
      'status': 'success'
    },
    { 
      'title': '认证失败', 
      'icon': {
        value: 'check',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14',
      },
      'status': 'error'
    }
  ]

  const successedItems = [
    { 
      'title': '未提交', 
      'icon': {
        value: 'edit',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '18',
      },
      'status': 'success'
    },
    { 
      'title': '审核中', 
      'icon': {
        value: 'loading-2',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14',
      },
      'status': 'success'
    },
    { 
      'title': '认证成功', 
      'icon': {
        value: 'check',
        activeColor: '#fff',
        inactiveColor: '#78A4FA',
        size: '14',
      },
      'status': 'success'
    }
  ]

  useEffect(() => {
    setUserObj({
      avatar: wx.getStorageSync('avatar'),
      username: wx.getStorageSync('username')
    })
    userApi.findByUid(parseInt(wx.getStorageSync('uid'))).then(res => {
      console.log(res.data);
      let certificationStatus = res.data.certificationStatus
      setCertificationStatus(certificationStatus)
      switch (certificationStatus) {
        // 未提交
        case 0:
          setItems(noSubmitItems)
          break;
        // 审核中
        case 1:
          setCurrent(1)
          setItems(checkingItems)
          break;
        // 认证失败
        case 2:
          setItems(failedItems)
          break;
        // 认证成功
        case 3:
          setItems(successedItems)
          break;
      
        default:
          break;
      }
    })
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

  const showErrorTips = () => {
    console.log(1111111111);
    setErrorOpened(true);
  }

  

  return (
    <View className={styles.mainContainer}>
      <View className={styles.mainContainerTop}>
        <View className={styles.userInfoMain}>
          <View className={styles.userInfo}>
            <AtAvatar circle image={userObj.avatar}></AtAvatar>
            <View className={styles.userText}>
              <View className={styles.userName}>{userObj.username}</View>
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
        {
          certificationStatus === 2 ? 
          <image onClick={showErrorTips} className={styles.exclamationPoint} src={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%84%9F%E5%8F%B9%E5%8F%B7.png'}></image>
          : null
        }
        <AtModal isOpened={errorOpened} closeOnClickOverlay={false}>
          <AtModalContent>
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
            这里是正文内容，欢迎加入京东凹凸实验室
          </AtModalContent>
          <AtModalAction><button onClick={() => setErrorOpened(false)}>确定</button></AtModalAction>
        </AtModal>
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
