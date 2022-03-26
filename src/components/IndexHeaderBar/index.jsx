import React, { useState } from 'react';
import { View, Text } from '@tarojs/components'
import { AtSearchBar, AtIcon } from 'taro-ui'
import styles from './index.module.scss';
export default function HeaderBar() {

    const [searchValue, setSearchValue] = useState('')

    const ChangeSearchValue = (e) => {
        console.log(e);
    }

    return (
        <View className={styles.headerBar}>
            <View className={styles.headerBarContainer}>
                <View className={styles.appName}>房无忧</View>
                <AtSearchBar
                className={styles.searchBar}
                    value={searchValue}
                    onChange={ChangeSearchValue}
                />
            </View>
            
        </View>
    )
}
