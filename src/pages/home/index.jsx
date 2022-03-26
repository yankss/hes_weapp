import React, { useState, useEffect } from 'react';
import { View, Swiper, SwiperItem } from '@tarojs/components'
import { AtGrid } from 'taro-ui';
import HouseList from '../../components/HouseList/index';
import styles from './index.module.scss';
export default function Home() {
    // const [ actionBarList, setActionBarList] = useState([[
    //   {
    //     image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    //     value: '领取中心'
    //   },
    //   {
    //     image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    //     value: '找折扣'
    //   },
    //   {
    //     image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
    //     value: '领会员'
    //   },
    // ]]);
    const [ houseListData, setHouseListData] = useState([]);

    useEffect(() => {
        setHouseListData([
          1,2,3,4,5,6,7,
        ])
    }, [])

    return (
        <View className={styles.mainContainer}>
          <View>
              <Swiper
                  className={styles.swiper}
                  indicatorColor='#999'
                  indicatorActiveColor='#333'
                  vertical={false}
                  circular={true}
                  indicatorDots
                  autoplay={true}
              >
                <SwiperItem>
                    <View className={styles.swiperImg1}></View>
                </SwiperItem>
                <SwiperItem>
                    <View className={styles.swiperImg2}></View>
                </SwiperItem>
                <SwiperItem>
                    <View className={styles.swiperImg3}></View>
                </SwiperItem>
              </Swiper>
          </View>
          
            {/* <AtGrid 
                data={actionBarList}
                hasBorder={false}
                className={styles.actionList}
            /> */}
            <HouseList houseListData={houseListData}/>
        </View>
    )
}
