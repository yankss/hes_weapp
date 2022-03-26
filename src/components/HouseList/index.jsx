import React, { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { AtTag, AtActionSheet, AtActionSheetItem  } from 'taro-ui';
import styles from './index.module.scss';
export default function HouseList(props) {

    const goHouseDetail = () => {
        wx.navigateTo({
            url: '/pages/houseDetail/index',
        });
    }
    const showIsDelete = (e) => {
        e.stopPropagation()
    }

    useEffect(() => {
        console.log(props);
    }, [])

    return (
        <View className={styles.houseList}>
            {
            props.houseListData.map((houseItem, index) => {
                return (
                    <View>
                        <View className={styles.listItem} onClick={goHouseDetail}>
                            <image mode="aspectFill" className={styles.houseImg} src="https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%88%BF%E5%B1%8BlistItem%E5%9B%BE"></image>
                            <View className={styles.houseInfo}>
                                <View className={styles.houseDescriptionTitle}>整租 | 美好居 一室一厅 电梯房 地铁房 素质小区</View>
                                <View className={styles.houseSizeInfo}>1室 · 40平方 · 美好居 · 车陂</View>
                                <View className={styles.houseTag}>
                                    <AtTag className={styles.tagStyle} size="small" active={true} type="primary">标签</AtTag>
                                    <AtTag className={styles.tagStyle} size="small" active={true} type="primary">标签</AtTag>
                                </View>
                                <View className={styles.houseRent}>1500元 / 月</View>
                            </View>
                            {
                                props.isDelete === true ? 
                                <Image 
                                    className={styles.isDeleteIcon} 
                                    src="https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/24gf-ellipsis.png"
                                    onClick={showIsDelete}
                                >
                                </Image>
                                : null
                            }
                        </View>
                        
                        <View className={styles.diver}></View>
                        {
                            props.isDelete === true ? 
                            <AtActionSheet isOpened={false} cancelText='取消'>
                                <AtActionSheetItem>
                                    按钮一 
                                </AtActionSheetItem>
                                <AtActionSheetItem>
                                    按钮二
                                </AtActionSheetItem>
                            </AtActionSheet>
                            : null
                        }
                    </View>
                    
                )
            })
            }
        </View>
    )
}
