import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtSegmentedControl, AtSearchBar } from 'taro-ui'
import HouseList from '../../components/HouseList/index';
import TopicList from '../../components/TopicList';
import styles from './index.module.scss';
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
      if(current === 0) {
        setTopicList([]);
        setHouseListData([
          1,2,3,4,5,
        ])
      } else if (current === 1) {
        setTopicList([
          {
              title: 'Quality design resources',
              username: `Ather`,
              avatar: 'https://joeschmoe.io/api/v1/random',
              description:
                  'Ant Design, a design language for background applications, is refined by Ant UED Team.',
              content:
                  'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.to help people create their product prototypes beautifully and efficiently.',
              topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/wallhaven-72rxqo.jpg'
          },
          {
              title: 'For background applications',
              username: `Beila`,
              avatar: 'https://joeschmoe.io/api/v1/random',
              description:
                  'Ant Design, a design language for background applications, is refined by Ant UED Team.',
              content:
                  'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
              topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/wallhaven-wqve97.png'
          },
        ])
        setHouseListData([])
      }
      console.log(topicList, houseListData);
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
