import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtSegmentedControl, AtSearchBar } from 'taro-ui'
import HouseList from '../../components/HouseList/index';
import TopicList from '../../components/TopicList';
import styles from './index.module.scss';
import * as topicApi from '../../api/topicApi';
import * as houseApi from '../../api/houseApi';
export default function Favorites(props) {

    const [ current, setCurrent] = useState(0);
    const [ searchValue, setSearchValue] = useState('');
    const [ topicList, setTopicList ] = useState([]);
    const [ houseListData, setHouseListData] = useState([]);

    const checkTab = (value) => {
        setCurrent(value)
    }

    const searchValueChange = (v, e) => {
      setSearchValue(v)
    }

    const searchHandle = () => {
      console.log(11111111111);
    }

    useEffect(() => {
      
    }, [])

    useEffect(() => {
      let uid = parseInt(wx.getStorageSync('uid'));
      if(current === 0) {
        setTopicList([]);
        houseApi.findCollectionHouseByUid(uid).then(res => {
          let hosueList = res.data;
          hosueList = hosueList.map(item => {
            item.tag = item.tag.split('、');
            item.carouselImg = item.carouselImg.slice(0, item.carouselImg.indexOf('、'));
            return item;
          })
          setHouseListData(hosueList)
        })
      } else if (current === 1) {
        topicApi.findCollectionTopicByUid(uid).then(res => {
          setTopicList(res.data)
        })
        setHouseListData([])
      }
    }, [current])

    const marinContainerStyle = {
      height: '74vh'
    }

    return (
        <View className={styles.mainContainer} style={topicList.length < 3 && houseListData.length === 0 ? marinContainerStyle : 
          houseListData.length < 4 && topicList.length === 0 ? marinContainerStyle : {height: 'atuo'}}>
          <AtSearchBar
            value={searchValue}
            onChange={searchValueChange}
            onActionClick={searchHandle}
          />
          <AtSegmentedControl
            values={['房屋收藏夹', '话题收藏夹']}
            onClick={checkTab}
            current={current}
          />
          {
            current === 0 ? 
            <View className='tab-content'>
                <HouseList houseListData={houseListData} isDelete={props.isDelete}/>
            </View>
            : null
          }
          {
            current === 1 ? 
            (
              <TopicList isComment={false} topicList={topicList}/>
            )
            : null
          }
        </View>
    )
}
