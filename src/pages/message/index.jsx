import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtSegmentedControl, AtSearchBar } from 'taro-ui'
import TopicList from '../../components/TopicList/index';
import * as commentApi from '../../api/commentApi';
import * as topicApi from '../../api/topicApi';
import styles from './index.module.scss';
export default function Message(props) {
    const [ current, setCurrent] = useState(0);
    const [ searchValue, setSearchValue] = useState('');
    const [topicList, setTopicList] = useState([]);


    useEffect(() => {
      
    }, [])

    useEffect(() => {
      current === 0 ? (
          commentApi.findByUid(wx.getStorageSync('uid')).then(res => {
              let myTrackComment = res.data;
              let myTrackTopicId = []
              myTrackComment = myTrackComment.map(item => {
                  return item.tid;
              })
              myTrackComment.forEach(item => {
                  if(myTrackTopicId.indexOf(item) === -1) {
                      myTrackTopicId.push(item);
                  }
              })
              topicApi.getAllTopic().then(res => {
                  let myTrackTopic = [];
                  res.data.forEach(item => {
                      myTrackTopicId.forEach(item2 => {
                          if(item.tid === item2) {
                            myTrackTopic.push(item);
                          }
                      })
                  })
                  setTopicList(myTrackTopic)
              })
          })
        ) : (
          topicApi.findByUid(wx.getStorageSync('uid')).then(res => {
            setTopicList(res.data)
          })
        )
    }, [current])


    const checkTab = (value) => {
      setCurrent(value)
    }

    const searchValueChange = (v, e) => {
      setSearchValue(v)
    }

    const searchHandle = () => {
      console.log(11111111111);
    }

    const marinContainerStyle = {
        height: '76.2vh'
    }

    return (
        <View className={styles.marinContainer} style={topicList.length < 3 ? marinContainerStyle : null}>
            <AtSearchBar
              value={searchValue}
              onChange={searchValueChange}
              onActionClick={searchHandle}
            />
            <AtSegmentedControl
              values={['话题足迹', '我的话题']}
              onClick={checkTab}
              current={current}
            />
            {
              current === 0 ? 
              <View className='tab-content'>
                  <TopicList isComment={true} topicList={topicList}/>
              </View>
              : current === 1 ?
               <View className='tab-content'>
                  <TopicList isComment={true} topicList={topicList}/>
               </View>
              : null
            }
        </View>
    )
}
