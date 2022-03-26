import React from 'react';
import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import OrtherHeaderBar from '../OrtherHeaderBar'
import styles from './index.module.scss';
export default function NoHouse(props) {
    

    const goToHomePage = () => {
        wx.redirectTo({
            url: '/pages/index/index',
        });
    }

    return (
        <View style={{position: 'relative'}}>
            <OrtherHeaderBar title={props.title}/>
            <View className={styles.mainContainer}>
                <Image style={{height: '300px'}} src={props.showImage}></Image>
                <View>{props.tip}</View>
                <AtButton onClick={goToHomePage} className={styles.btn} type='secondary'>去看新房</AtButton>
            </View>

        </View>
    )
}
