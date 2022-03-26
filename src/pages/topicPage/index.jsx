import React, { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components'
import OrtherHeaderBar from '../../components/OrtherHeaderBar/index';
import { AtSearchBar, AtActionSheet, AtActionSheetItem  } from 'taro-ui'
import styles from './index.module.scss';
import TopicList from '../../components/topicList';
export default function TopicPage() {
    
    const [topicList, setTopicList] = useState([
        {
            title: 'Quality design resources',
            username: `Ather`,
            avatar: 'https://joeschmoe.io/api/v1/random',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.to help people create their product prototypes beautifully and efficiently.',
            topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/wallhaven-wqve97.png'
        },
        {
            title: 'For background applications',
            username: `Beila`,
            avatar: 'https://joeschmoe.io/api/v1/random',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/wallhaven-439z1y.jpg'
        },
        {
            title: 'Refined by Ant UED',
            username: `Duboo`,
            avatar: 'https://joeschmoe.io/api/v1/random',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/wallhaven-wqve97.png'
        },
        {
            title: 'Create their product',
            username: `Recheal`,
            avatar: 'https://joeschmoe.io/api/v1/random',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/wallhaven-wqve97.png'
        },
        {
            title: 'Supply a series of design',
            username: `Pire`,
            avatar: 'https://joeschmoe.io/api/v1/random',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/wallhaven-wqve97.png'
        },
    ]);
    const [searchValue, setSearchValue] = useState('');
    const [actionSheetTitle, setActionSheetTitle] = useState('')
    const [actionSheetOpened, setActionSheetOpened] = useState(false)
    const [actionSheetItem, setActionSheetItem] = useState([]);

    const handleChange = (v, e) => {
        console.log(v);
        setSearchValue(v)
    }

    const handleSearch = () => {
        console.log(searchValue);
    }

    const selectFilterType = (key) => {
        setActionSheetOpened(true);
        console.log(key);
        switch (key) {
            case 'time':
                setActionSheetTitle('按时间排序方式')
                setActionSheetItem([
                    {
                        label: '由早到晚'
                    },
                    {
                        label: '由晚到早'
                    }
                ])
                break;
        
            case 'comment':
                setActionSheetTitle('按评论数量排序方式')
                setActionSheetItem([
                    {
                        label: '由多到少'
                    },
                    {
                        label: '由少到多'
                    }
                ])
                break;
     
            default:
                break;
        }
    }

    const selectActionSheetItem = (v, e) => {
        console.log(v);
        console.log(e);
    }

    const goToNewTopic = () => {
        wx.navigateTo({
            url: '/pages/newTopicPage/index',
        });
    }

    useEffect(() => {
        let newTopic = wx.getStorageSync('newTopic')
        console.log(newTopic);
        
    },[])


    return (
        <View style={{position: 'relative'}}>
            <View className={styles.headerBar}><OrtherHeaderBar title={'话题'}/></View>
            <View className={styles.actionBar}>
                <AtSearchBar
                    value={searchValue}
                    onChange={handleChange}
                    onActionClick={handleSearch}
                    className={styles.searchInput}
                    placeholder={'请输入相关标题内容...'}
                />
                <button onClick={goToNewTopic} className={styles.newTopicBtn}>新建话题</button>
            </View>
            <View className={styles.filterBar}>
                <button onClick={e => selectFilterType('time')} className={styles.filterBtn}>时间排序</button>
                <button onClick={e => selectFilterType('comment')} className={styles.filterBtn}>评论数排序</button>
            </View>
            <View>
                <TopicList topicList={topicList}/>
            </View>
            <AtActionSheet 
                title={actionSheetTitle}
                isOpened={actionSheetOpened}
                cancelText='取消'
            >
                {
                    actionSheetItem.map(item => {
                        return (
                            <AtActionSheetItem
                                onClick={e => selectActionSheetItem(item.label, e)}
                            >
                                {item.label}
                            </AtActionSheetItem>
                        )
                    })
                }
            </AtActionSheet>
        </View>
    )
}
