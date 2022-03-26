import React, { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import OrtherHeaderBar from '../../components/OrtherHeaderBar/index';
import styles from './index.module.scss';
export default function MyHouse() {
    const [ houseInfoItem, setHouseInfoItem ] = useState([
        {
            label: '房型',
            key: 'houseLayout'
        },
        {
            label: '面积',
            key: 'area'
        },
        {
            label: '楼层',
            key: 'floor'
        },
        {
            label: '朝向',
            key: 'toward'
        },
        {
            label: '月租金',
            key: 'rent'
        },
        {
            label: '电单价',
            key: 'electricityRate'
        },
        {
            label: '水电价',
            key: 'waterRate'
        },
        {
            label: '房东姓名',
            key: 'landlordName'
        },
        {
            label: '房东电话',
            key: 'landlordPhone'
        },
    ]);

    const [ userObject, setUserObject ] = useState({})
    const [ houseObject, setHouseObject ] = useState({})

    useEffect(() => {
        setHouseObject({
            houseLayout: '3室2厅1卫',
            area: '100',
            floor: '4',
            toward: '南',
            rent: '2000',
            electricityRate: '1.5',
            waterRate: '5.0',
            landlordName: '于至元',
            landlordPhone: '13434244979'
        })
    }, [])




    return (
        <View>
            <OrtherHeaderBar title={'我的房子'}/>
            <View>
                {
                    houseInfoItem.map((item, index) => {
                        return (
                            <View className={styles.colItem} key={item.key}>
                                <View className={styles.itemLabel}>{item.label} : </View>
                                {
                                    item.key === 'area' ? 
                                    (<View className={styles.itemValue}>{houseObject[`${item.key}`]}m²</View>)
                                    : item.key === 'floor' ?
                                    (<View className={styles.itemValue}>{houseObject[`${item.key}`]}层</View>)
                                    : item.key === 'rent' ?
                                    (<View className={styles.itemValue}>{houseObject[`${item.key}`]}元/月</View>)
                                    : item.key === 'electricityRate' ?
                                    (<View className={styles.itemValue}>{houseObject[`${item.key}`]}元/度</View>)
                                    : item.key === 'waterRate' ?
                                    (<View className={styles.itemValue}>{houseObject[`${item.key}`]}元/升</View>)
                                    :(<View className={styles.itemValue}>{houseObject[`${item.key}`]}</View>)
                                }
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}
