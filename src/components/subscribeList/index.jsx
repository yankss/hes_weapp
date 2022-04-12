import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import styles from './index.module.scss';
import { AtRate , AtActionSheetItem } from "taro-ui"
export default function SubscribeList(props) {

  const [rate, setRate] = useState(3)

    useEffect(() => {
    }, [])

    const handleRateChange = (v, itemRate) => {
      if(itemRate != 0) {
        return;
      }
      console.log(v);
      console.log(itemRate);
      setRate(v)
    }
    const markingHandle = () => {
      console.log(1111111111111);
    }

    return (
        <View>
          {
            props.subscribeList.map(item => {
              return (
                <View className={styles.subscribeItem} key={item.sid}>
                  <View className={styles.subscribeDateBar}>
                    {`${item.subscribeDay} ${item.subscribeTime}`}
                    {item.subscribeStatus === 0 ? <button style={{background: '#E53935'}} className={styles.actionBtn}>取消预约</button> : null}
                    {item.subscribeStatus === 1 ? <button onClick={markingHandle} disabled={item.landlordRate != 0 ? true : false} className={styles.actionBtn}>评分</button> : null}
                    <button className={styles.actionBtn}>联系房东</button>
                  </View>
                  <View className={styles.houseInfo}>
                    <image mode="widthFix" className={styles.houseImg} src='https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/wallhaven-439z1y.jpg'></image>
                    <View className={styles.houseText}>
                      <View className={styles.oneLine}>{item.houseTitle}</View>
                      <View className={styles.oneLine}>{item.address}</View>
                      <View>{item.landlordName}</View>
                    </View>
                  </View>
                  {
                    item.subscribeStatus === 1 ? 
                    <View>
                      <View className={styles.rateBar}>
                        房东评价:
                        <AtRate
                          value={item.landlordRate}
                          onChange={(v) => handleRateChange(v, item.landlordRate)}
                        />
                        <image className={styles.successRate} src={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%88%90%E5%8A%9F%20%281%29.png'}></image>
                      </View>
                      <View className={styles.rateBar}>
                        房屋评价:
                        <AtRate
                          value={item.houseRate}
                          onChange={(v) => handleRateChange(v, item.houseRate)}
                        />
                        <image className={styles.successRate} src={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%88%90%E5%8A%9F%20%281%29.png'}></image>
                      </View>
                    </View>
                    : null
                  }
                </View>
              )
            })
          }
        </View>
    )
}
