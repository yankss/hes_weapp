import React, { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components'
import Taro, {} from '@tarojs/taro'
import { AtAvatar, AtBadge } from 'taro-ui'
import styles from './index.module.scss';
export default function TopicListItem(props) {

    const { tid, username, topicTitle, userAvatar, mainContent, illustrations } = props.listItem;

    const goToTopicDetail = () => {
        Taro.navigateTo({
            url: '/pages/topicDetail/index?tid=' + tid,
        });
    }

    return (
        <View className={styles.topicItem} onClick={goToTopicDetail}>
            <View className={styles.topicContainer}>
                <View className={styles.userInfo}>
                    <AtAvatar className={styles.userAvatar} circle  image={userAvatar}></AtAvatar>
                    <View style={{marginLeft: '20rpx'}}>{username}</View>
                    { props.isComment === true ? <View className={styles.badge}>12</View> : null }
                </View>
                <View className={styles.topicTitle}>{topicTitle}</View>
            </View>
            <View className={styles.topicMainContainer}>
                <View className={styles.topicContent}>{mainContent}</View>
                <image mode="aspectFill" className={styles.topicImage} src={illustrations}></image>
            </View>
            
        </View>
    )
}
