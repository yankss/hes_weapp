import React, { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components'
import OrtherHeaderBar from '../../components/OrtherHeaderBar/index';
import { AtSearchBar, AtActionSheet, AtActionSheetItem  } from 'taro-ui'
import styles from './index.module.scss';
import TopicList from '../../components/topicList';
import * as topicApi from '../../api/topicApi';
import * as userApi from '../../api/userApi';
export default function TopicPage() {
    
    const [topicList, setTopicList] = useState([]);
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
        let newTopicList = [];
        topicApi.fuzzyQuery(searchValue).then(res1 => {
            newTopicList = res1.data;
        }).then(res2 => {
            newTopicList = newTopicList.map(item => {
                userApi.findByUsername(item.username).then(res2 => {
                    item.avatar = res2.data.avatar;
                    console.log(item.avatar);
                })
                return item;
            })
        })
        
        setTimeout(() => {
            setTopicList(newTopicList);
        }, 500);

    }

    const clearSearchHandle = () => {
        setSearchValue('');
        let newTopicList = [];
        topicApi.getAllTopic().then(res1 => {
            newTopicList = res1.data;
        }).then(res2 => {
            newTopicList = newTopicList.map(item => {
                userApi.findByUsername(item.username).then(res2 => {
                    item.avatar = res2.data.avatar;
                    console.log(item.avatar);
                })
                return item;
            })
        }).then(res3 => {
            setTimeout(() => {
                setTopicList(newTopicList);
            }, 500);
        })
    }

    const selectFilterType = (key) => {
        setActionSheetOpened(true);
        console.log(key);
        switch (key) {
            case 'time':
                setActionSheetTitle('?????????????????????')
                setActionSheetItem([
                    {
                        label: '????????????'
                    },
                    {
                        label: '????????????'
                    }
                ])
                break;
        
            case 'comment':
                setActionSheetTitle('???????????????????????????')
                setActionSheetItem([
                    {
                        label: '????????????'
                    },
                    {
                        label: '????????????'
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
        let newTopic = wx.getStorageSync('newTopic');
        let newTopicList = [];
        topicApi.getAllTopic().then(res1 => {
            console.log(res1);
            newTopicList = res1.data;
            setTopicList(newTopicList);
        })
    },[])


    return (
        <View style={{position: 'relative'}}>
            <View className={styles.headerBar}><OrtherHeaderBar title={'??????'}/></View>
            <View className={styles.actionBar}>
                <AtSearchBar
                    value={searchValue}
                    onChange={handleChange}
                    onConfirm={handleSearch}
                    onActionClick={handleSearch}
                    className={styles.searchInput}
                    placeholder={'???????????????????????????...'}
                    onClear={clearSearchHandle}
                />
                <button onClick={goToNewTopic} className={styles.newTopicBtn}>????????????</button>
            </View>
            <View className={styles.filterBar}>
                <button onClick={e => selectFilterType('time')} className={styles.filterBtn}>????????????</button>
                <button onClick={e => selectFilterType('comment')} className={styles.filterBtn}>???????????????</button>
            </View>
            <View>
                <TopicList topicList={topicList}/>
            </View>
            <AtActionSheet 
                title={actionSheetTitle}
                isOpened={actionSheetOpened}
                cancelText='??????'
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
