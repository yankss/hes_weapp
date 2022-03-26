import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import styles from './index.module.scss';
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
export default function SubscribeList(props) {

  const [actionSheetOpened, setActionSheetOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState({})

    useEffect(() => {
    }, [])

    const showActionSheet = (e, item) => {
      console.log(item);
      setSelectedItem(item);
      setActionSheetOpened(true);
    }

    const closeActionSheet = () => {
      setSelectedItem({});
      setActionSheetOpened(false);
    }

    const callHandle = () => {
      console.log(selectedItem.landLordPhone);
      wx.makePhoneCall({
        phoneNumber: selectedItem.landLordPhone
      })
    }

    return (
        <View>
          <AtActionSheet onClose={closeActionSheet} cancelText='取消' isOpened={actionSheetOpened}>
              <AtActionSheetItem>
                取消预约
              </AtActionSheetItem>
              <AtActionSheetItem onClick={callHandle}>
                联系房东
              </AtActionSheetItem>
          </AtActionSheet>
          {
            props.subscribeList.map(item => {
              return (
                <View className={styles.subscribeItem} key={item.key}>
                  <View className={styles.subscribeDateBar}>
                    {item.subscribeDate}
                    <image onClick={(e) => showActionSheet(e, item)} className={styles.extendChar} src='https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/kuozhanfu'></image>
                  </View>
                  <View className={styles.houseInfo}>
                    <image mode="widthFix" className={styles.houseImg} src='https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/wallhaven-439z1y.jpg'></image>
                    <View className={styles.houseText}>
                      <View className={styles.oneLine}>{item.houseTitle}</View>
                      <View className={styles.oneLine}>{item.houseLocation}</View>
                      <View>{item.landlordName}</View>
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
    )
}
