import React, { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components'
import TopicListItem from '../TopicListItem';
import styles from './index.module.scss';
export default function TopicList(props) {
    

    return (
        <View>
            {
                props.topicList.length != 0 ? 
                (
                    props.topicList.map(item => {
                        return (
                            <TopicListItem
                                listItem={item}
                                isComment={props.isComment}
                            />
                        )
                    })
                ) : 
                (
                    <View className={styles.noContainer}>
                        <Image style={{height: '300px'}} src={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%9A%82%E6%97%A0%E5%9B%BE%E7%89%87.png'}></Image>
                        <View style={{marginTop: '60rpx', fontSize: '34rpx'}}>暂无话题收藏信息，快去查阅有趣的话题吧 ~ </View>
                    </View>
                )
                
            }
        </View>
    )
}
