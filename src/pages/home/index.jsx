import React, { useState, useEffect } from 'react';
import { View, Swiper, SwiperItem } from '@tarojs/components'
import * as houseApi from '../../api/houseApi';
import HouseList from '../../components/HouseList/index';
import styles from './index.module.scss';
export default function Home() {
    const [ houseListData, setHouseListData] = useState([]);

    useEffect(() => {
        houseApi.getAllHouse().then(res => {
            console.log(res);
            let houseList = res.data;
            houseList = houseList.filter(item => {
                return item.leaseState !== 1;
            })
            houseList = houseList.map(item => {
                item.tag = item.tag.split('、');
                item.carouselImg = item.carouselImg.slice(0, item.carouselImg.indexOf('、'));
                return item;
            })
            setHouseListData(houseList)
        })
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
          
            <HouseList houseListData={houseListData}/>
        </View>
    )
}
