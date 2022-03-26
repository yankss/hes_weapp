import React, { useState, useEffect } from 'react';
import { View } from '@tarojs/components'
import { AtAvatar, AtTag, AtButton, AtIcon } from 'taro-ui'
import styles from './index.module.scss';
export default function HeaderBar() {

    const [landlordList, setLandLordList] = useState([]);

    useEffect(() => {
        const listData = [1,2,3,4,5,6,7];
        setLandLordList(listData);
    }, [])

    const getMoreLandlordInfo = () => {
        wx.navigateTo({
            url: '/pages/landlordDetailInfo/index',
        });
    }


    return (
        <View>
            {
                landlordList.map((item, index) => {
                    return (
                        <View key={index} className={styles.landlordInfo}>
                            <View className={styles.landlordText}>
                                <AtAvatar circle image='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'>
                                </AtAvatar>
                                <View className={styles.landlordMainText}>
                                    <View className={styles.landlordName}>余梓源</View>
                                    <View className={styles.landlordTag}>
                                </View>
                                    <AtTag className={styles.landlordTagStyle} circle={false} size="small" active={true} type="primary">标签</AtTag>
                                </View>
                            </View>
                            <AtButton onClick={getMoreLandlordInfo} type={'secondary'} size='small' className={styles.mroelandlordInfoButton}>
                                查看更多<AtIcon value='chevron-right' size='11' ></AtIcon>
                            </AtButton>
                        </View>
                    )
                })
            }
        </View>
    )
}
