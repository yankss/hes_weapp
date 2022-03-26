import React, { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components'
import { AtAvatar, AtBadge } from 'taro-ui'
import styles from './index.module.scss';
export default function TopicListItem(props) {

    const { username, title, avatar, content, topicImage } = props.listItem;

    const goToTopicDetail = () => {
        wx.navigateTo({
            url: '/pages/topicDetail/index',
        });
    }

    return (
        <View className={styles.topicItem} onClick={goToTopicDetail}>
            <View className={styles.topicContainer}>
                <View className={styles.userInfo}>
                    <AtAvatar className={styles.userAvatar} circle  image={avatar}></AtAvatar>
                    <View style={{marginLeft: '20rpx'}}>{username}</View>
                    { props.isComment === true ? <View className={styles.badge}>12</View> : null }
                </View>
                <View className={styles.topicTitle}>{title}</View>
            </View>
            <View className={styles.topicMainContainer}>
                <View className={styles.topicContent}>{content}</View>
                <image mode="aspectFill" className={styles.topicImage} src={topicImage}></image>
            </View>
            
        </View>
    )
}
