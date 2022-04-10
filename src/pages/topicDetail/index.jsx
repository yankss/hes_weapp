import React, { useState, useEffect, useRef } from 'react';
import { View, Image } from '@tarojs/components'
import Taro, { Current, getStorageSync } from '@tarojs/taro'
import { AtAvatar, AtIcon, AtInput, AtToast } from 'taro-ui'
import OrtherHeaderBar from '../../components/OrtherHeaderBar';
import { getNowFormatDate } from '../../util/index';
import styles from './index.module.scss';
import * as topicApi from '../../api/topicApi';
import * as userApi from '../../api/userApi';
import * as commentApi from '../../api/commentApi';
import * as topicCollectionApi from '../../api/topicCollectionApi';
export default function TopicDetail(props) {
    
    const [topicObject, setTopicObject] = useState({});
    const [topicOtherComment, setTopicOtherComment] = useState([]);
    const [myComments, setMyComment] = useState([]);
    const [userObject, setUserObject] = useState({});
    const [collectionOpened, setCollectionOpened] = useState(false);
    const [toastText, setToastText] = useState('');
    const [toastImage, setToastImage] = useState('');
    const [collectionState, setCollectionState] = useState(false);
    const refContainer = useRef(null);

    useEffect(() => {
        let topicCollection = {
            uid: wx.getStorageSync('uid'),
            topicId: Current.router.params.tid
        }
        topicCollectionApi.checkIsCollected(topicCollection).then(res => {
            console.log(res);
            setCollectionState(Boolean(res.data))
        })
        console.log([] === true);
        let tid = parseInt(Current.router.params.tid);
        console.log(tid);
        let uid = getStorageSync('uid');
        wx.setStorageSync(
            'tid',
            tid
        )
        // 获取该话题的详细数据
        topicApi.findById(tid).then(res => {
            let topicData = res.data
            userApi.findByUsername(topicData.username).then(res2 => {
                topicData.avatar = res2.data.avatar;
                setTopicObject(res.data)
            })
        })

        // 获取当前用户对该话题的评论
        commentApi.findByUid(uid).then(res => {
            let myComments = res.data
            myComments = myComments.filter(item => {
                return item.tid === tid;
            })
            setMyComment(myComments)
        })

        // 获取该话题的其他
        let otherComment = [];
        commentApi.findByTid(tid).then(res => {
            otherComment = res.data;
            otherComment = otherComment.filter(item => {
                return item.uid !== uid;
            })
            otherComment = otherComment.map(item => {
                userApi.findByUsername(item.username).then(res => {
                    item.avatar = res.data.avatar
                })
                return item;
            })
        })
        setTimeout(() => {
            setTopicOtherComment(otherComment)
        }, 500);
        setUserObject({
            username: wx.getStorageSync('username'),
            avatar: wx.getStorageSync('avatar')
        })

        
    }, [])

    const sendComment = (v, e) => {
        let myCommentItem = {};
        let newMyComments = [];
        myCommentItem.tid = wx.getStorageSync('tid');
        myCommentItem.uid = wx.getStorageSync('uid');
        myCommentItem.username = wx.getStorageSync('username');
        myCommentItem.commentContent = v;
        // myCommentItem.commentTime = getNowFormatDate();
        console.log(myCommentItem);
        commentApi.newComment(myCommentItem).then(res => {
            console.log(res);
        })
        newMyComments = [myCommentItem, ...myComments];
        setMyComment(newMyComments)
    }

    const handleCollection = () => {
        let topicCollection = {
            uid: wx.getStorageSync('uid'),
            topicId: Current.router.params.tid
        }
        setCollectionOpened(true)
        if(collectionState === true) {
            topicCollectionApi.cancleCollected(topicCollection).then(res => {
                console.log(res);
            })
            setCollectionState(false)
            setToastText('取消收藏')
            setToastImage('https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E5%8F%96%E6%B6%88%E6%94%B6%E8%97%8F.png')
        }else if(collectionState === false) {
            topicCollectionApi.topicCollected(topicCollection).then(res => {
                console.log(res);
            })
            setCollectionState(true)
            setToastText('收藏成功')
            setToastImage('https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%94%B6%E8%97%8F.png')
        }
        setTimeout(() => {
            setCollectionOpened(false)
        }, 2000);
    }

    return (
        <View ref={refContainer} style={{position: 'relative'}}>
            <AtToast duration={2000} isOpened={collectionOpened} text={toastText} image={toastImage}></AtToast>
            <View className={styles.headerBar}><OrtherHeaderBar title={'话题详情'}/></View>
            <View>
                <View className={styles.topicBar}>
                    <View className={styles.topicTitle}>{topicObject.topicTitle}</View>
                    {
                        collectionState === false ? 
                        (
                            <button 
                                onClick={() => handleCollection()} 
                                className={styles.collectionBtn}
                            >
                                <AtIcon value='star-2' size='12' color='#a2a2a2'></AtIcon>收藏
                            </button>
                        )
                        : (
                            <button 
                                onClick={() => handleCollection()} 
                                className={styles.collectionBtn}
                            >
                                <AtIcon value='star-2' size='12' color='#52a29d'></AtIcon>已收藏
                            </button>
                        )
                    }
                </View>
                <View className={styles.mainContainer}>
                    <View className={styles.authorInfo}>
                        <AtAvatar className={styles.userAvatar} circle  image={topicObject.avatar}></AtAvatar>
                        <View style={{marginLeft: '20rpx'}}>{topicObject.username}</View>
                    </View>
                    <View className={styles.topicContent}>{topicObject.mainContent}</View>
                </View>
            </View>
            <View className={styles.diverBar}></View>
            <View className={styles.myCommentContainer}>
                <View className={styles.myCommentTitle}>我的评论</View>
                <View className={styles.commentBar}>
                    <AtAvatar className={styles.commentBarUserAvatar} circle  image={userObject.avatar}></AtAvatar>
                    <AtInput
                        name='value'
                        type='text'
                        placeholder='说说你的看法...'
                        confirmType='send'
                        onConfirm={sendComment}
                        className={styles.commentInput}
                    />
                </View>
                <View className={styles.myComments}>
                    {
                        myComments.map(item => {
                            return (
                                <View>
                                    <View className={styles.commenterInfo}>
                                        <AtAvatar className={styles.userAvatar} circle  image={userObject.avatar}></AtAvatar>
                                        <View style={{marginLeft: '20rpx'}}>{userObject.username}</View>
                                    </View>
                                    <View className={styles.commentContent}>{item.commentContent}</View>
                                    <View className={styles.commentTime}>{item.commentTime}</View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View className={styles.diverBar}></View>
            <View className={styles.commentContainer}>
                <View className={styles.moduleTitle}>更多评论</View>
                {
                    topicOtherComment.length === 0 ? <View style={{padding: '30rpx', textAlign: 'center'}}>暂无更多评论...</View> : 
                    (
                        topicOtherComment.map(item => {
                            return (
                                <View>
                                    <View className={styles.commenterInfo}>
                                        <AtAvatar className={styles.userAvatar} circle  image={item.avatar}></AtAvatar>
                                        <View style={{marginLeft: '20rpx'}}>{item.username}</View>
                                    </View>
                                    <View className={styles.commentContent}>{item.commentContent}</View>
                                    <View className={styles.commentTime}>{item.commentTime}</View>
                                    <View style={{marginTop: '30rpx'}} className={styles.diverBar}></View>
                                </View>
                                
                            )
                        })
                    )
                }
            </View>
            <View style={topicOtherComment.length < 1 ? {position: 'fixed'} : null} className={styles.commentBottomBar}>
                <AtAvatar className={styles.userAvatar} circle  image={userObject.avatar}></AtAvatar>
                <AtInput
                    name='value'
                    type='text'
                    placeholder='说说你的看法...'
                    confirmType='send'
                    onConfirm={sendComment}
                    className={styles.commentInput}
                />
            </View>
        </View>
    )
}
