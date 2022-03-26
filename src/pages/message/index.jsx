import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtSegmentedControl, AtSearchBar } from 'taro-ui'
import TopicList from '../../components/TopicList/index';
import styles from './index.module.scss';
export default function Message(props) {
    const [ current, setCurrent] = useState(0);
    const [ searchValue, setSearchValue] = useState('');
    const [topicList, setTopicList] = useState([]);


    useEffect(() => {
      
    }, [])

    useEffect(() => {
      current === 0 ? (
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
            {
                title: 'Refined by Ant UED',
                username: `Duboo`,
                avatar: 'https://joeschmoe.io/api/v1/random',
                description:
                    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content:
                    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E8%AF%9D%E9%A2%98item%E5%9B%BE'
            },
            {
                title: 'Create their product',
                username: `Recheal`,
                avatar: 'https://joeschmoe.io/api/v1/random',
                description:
                    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content:
                    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E8%AF%9D%E9%A2%98item%E5%9B%BE'
            },
            {
                title: 'Supply a series of design',
                username: `Pire`,
                avatar: 'https://joeschmoe.io/api/v1/random',
                description:
                    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content:
                    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E8%AF%9D%E9%A2%98item%E5%9B%BE'
            },
          ])
        ) : (
          setTopicList([
              {
                title: 'Quality design resources',
                username: `Yankss`,
                avatar: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/female',
                description:
                    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content:
                    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.to help people create their product prototypes beautifully and efficiently.',
                topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/wallhaven-72rxqo.jpg'
            },
            // {
            //     title: 'For background applications',
            //     username: `Yankss`,
            //     avatar: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/female',
            //     description:
            //         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            //     content:
            //         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            //     topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/test_house_image'
            // },
            // {
            //     title: 'Refined by Ant UED',
            //     username: `Yankss`,
            //     avatar: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/female',
            //     description:
            //         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            //     content:
            //         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            //     topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/test_house_image'
            // },
            // {
            //     title: 'Create their product',
            //     username: `Yankss`,
            //     avatar: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/female',
            //     description:
            //         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            //     content:
            //         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            //     topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/test_house_image'
            // },
            // {
            //     title: 'Supply a series of design',
            //     username: `Yankss`,
            //     avatar: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/female',
            //     description:
            //         'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            //     content:
            //         'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            //     topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/test_house_image'
            // },
          ])
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
