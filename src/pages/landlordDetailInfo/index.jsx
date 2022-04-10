import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtRate , AtAvatar, AtToast, AtButton, AtIcon } from 'taro-ui'
import HouseList from '../../components/HouseList/index';
import OrtherHeaderBar from '../../components/OrtherHeaderBar/index';
import styles from './index.module.scss';
export default function LandlordDetailInfo() {

  const [houseRateValue, setHouseRateValue] = useState(2.5);
  const [serviceRateValue, setServiceRateValue] = useState(4.5);
  const [servicePeriod, setervicePeriod] = useState(6);
  const [numberOfService, setNumberOfService] = useState(17);
  const [checkingNumber, setCheckingNumber] = useState(0);
  const [isFavorites, setIsFavorites  ] = useState(false)
  const [toastText, setToastText] = useState('收藏成功');
  const [toastIconType, setToastIconType] = useState('check');
  const [openToast, setOpenToast] = useState(false);
  const [ houseListData, setHouseListData] = useState([]);

  const getFavorites = (e, key) => {
      console.log(e);
      console.log(key);
      if(key === true) {
          setToastText('收藏成功');
          setToastIconType('check')
      } else if(key === false) {
          setToastText('取消收藏');
          setToastIconType('blocked')
      }
      setOpenToast(true)
      setIsFavorites(key)
  }

  useEffect(() => {
    setHouseListData([
    ])
  }, [])
    

    return (
        <View>
          <OrtherHeaderBar title={'房东详情'}/>
          <AtToast isOpened={openToast} text={toastText} icon={toastIconType}></AtToast>
          <View className={styles.InfoCard}>
            <View className={styles.baseInfo}>
              <View>
                <View className={styles.landlordName}>虞紫鸢</View>
                <View className={styles.landordSchool}>仲恺大学</View>
              </View>
              <AtAvatar circle image='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'>
              </AtAvatar>
            </View>
            <View className={styles.rateBar}>
              <View className={styles.rateContainer}>
                <View className={styles.rateValue}>{houseRateValue}</View>
                <View style={{marginLeft: '20rpx'}}>
                  <View style={{fontSize: '26rpx'}}>房屋评分</View>
                  <AtRate value={houseRateValue}/>
                </View>
              </View>
              <View className={styles.rateContainer}>
                <View className={styles.rateValue}>{serviceRateValue}</View>
                <View style={{marginLeft: '20rpx'}}>
                  <View style={{fontSize: '26rpx'}}>服务水平</View>
                  <AtRate value={serviceRateValue}/>
                </View>
              </View>
            </View>
            <View className={styles.InfoForApp}>
              <View className={styles.InfoForAppItem}>
                <View>{servicePeriod}个月</View>
                <View>服务期限</View>
              </View>
              <View className={styles.InfoForAppItem}>
                <View>{numberOfService}</View>
                <View>服务人数</View>
              </View>
              <View className={styles.InfoForAppItem}>
                <View>{checkingNumber}</View>
                <View>带看次数</View>
              </View>
            </View>
          </View>
          <View>
            <View>Ta的房源</View>
            <HouseList houseListData={houseListData}/>
          </View>
        </View>
    )
}
