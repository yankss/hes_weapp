import React, { useEffect, useState } from 'react';
import { View, Image } from '@tarojs/components';
import { AtTag, AtActionSheet, AtActionSheetItem  } from 'taro-ui';
import NoDataPage from '../../components/noDataPage';
import styles from './index.module.scss';
export default function HouseList(props) {


    const goHouseDetail = (hid) => {
        wx.navigateTo({
            url: '/pages/houseDetail/index?hid=' + hid,
        });
    }
    const showIsDelete = (e) => {
        e.stopPropagation()
    }

    useEffect(() => {
    }, [])

    return (
        <View className={styles.houseList}>
            {
                props.houseListData.length != 0 ? 
                (
                    props.houseListData.map((houseItem, index) => {
                        return (
                            <View key={houseItem.hid}>
                                <View className={styles.listItem} onClick={() => goHouseDetail(houseItem.hid)}>
                                    <image mode="aspectFill" className={styles.houseImg} src={houseItem.carouselImg}></image>
                                    <View className={styles.houseInfo}>
                                        <View className={styles.houseDescriptionTitle}>{`整租 | ${houseItem.houseTitle}`}</View>
                                        <View className={styles.houseSizeInfo}>{`${houseItem.houseLayout} · ${houseItem.houseArea}平方 · `}美好居 · 车陂</View>
                                        <View className={styles.houseTag}>
                                            {
                                                houseItem.tag.map((item, index) => {
                                                    if(index<3) {
                                                        return (
                                                            <AtTag className={styles.tagStyle} size="small" active={true} type="primary">{item}</AtTag>
                                                        )
                                                    }else {
                                                        return null
                                                    }
                                                })
                                            }
                                        </View>
                                        <View className={styles.houseRent}>{houseItem.monthlyRent}元 / 月</View>
                                    </View>
                                    {
                                        props.isDelete === true ? 
                                        <Image 
                                            className={styles.isDeleteIcon} 
                                            src="https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/kuozhanfu"
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
                ) :
                (
                    <View className={styles.noContainer}>
                        <Image style={{height: '300px'}} src={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%9A%82%E6%97%A0%E5%9B%BE%E7%89%87.png'}></Image>
                        <View style={{marginTop: '60rpx', fontSize: '34rpx'}}>暂无房屋收藏信息，快去找心仪的房子吧 ~ </View>
                    </View>
                )
            }
        </View>
    )
}
