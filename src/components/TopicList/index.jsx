import React, { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components'
import TopicListItem from '../TopicListItem';
export default function TopicList(props) {
    

    return (
        <View>
            {
                props.topicList.map(item => {
                    return (
                        <TopicListItem
                            listItem={item}
                            isComment={props.isComment}
                        />
                    )
                })
            }
        </View>
    )
}
