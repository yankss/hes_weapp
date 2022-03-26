import React, { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components'
import { AtAvatar, AtIcon, AtInput, AtToast } from 'taro-ui'
import OrtherHeaderBar from '../../components/OrtherHeaderBar';
import { getNowFormatDate } from '../../util/index';
import styles from './index.module.scss';
export default function TopicDetail(props) {
    
    const [topicObject, setTopicObject] = useState({});
    const [topicOtherComment, setTopicOtherComment] = useState([]);
    const [myComments, setMyComment] = useState([]);
    const [userObject, setUserObject] = useState({});
    const [collectionOpened, setCollectionOpened] = useState(false);
    const [toastText, setToastText] = useState('');
    const [toastImage, setToastImage] = useState('');
    const [collectionState, setCollectionState] = useState(false);

    useEffect(() => {
        setTopicObject({
            href: 'https://ant.design',
            title: `A design language for background applications, is refined by Ant UED Team.`,
            avatar: 'https://joeschmoe.io/api/v1/random',
            authorName:
                'Ant Design',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.to help people create their product prototypes beautifully and efficiently.',
            topicImage: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/src%3Dhttp___upload.lcqixing.com_upload_202103_14_ba9a55b7d7425dbfea6f447e50fcda10.jpg%26refer%3Dhttp___upload.lcqixing.webp'
        })
        setMyComment([
            {
                commentContent: 'To help people create their product prototypes beautifully and efficiently.to help people create their product prototypes beautifully and efficiently',
                commentTime: '2022-03-14 14:22'
            },
        ])
        setUserObject({
            authorName: 'Yankss',
            avatar: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/male'
        })
        setTopicOtherComment([
            {
                avatar: 'https://joeschmoe.io/api/v1/random',
                authorName: 'Ather',
                commentContent: 'Help people create their product prototypes beautifully and efficiently',
                commentTime: '2022-02-24 14:22'
            },
            {
                avatar: 'https://joeschmoe.io/api/v1/random',
                authorName: 'Beila',
                commentContent: 'Help people create their product prototypes beautifully and efficiently',
                commentTime: '2022-05-02 14:22'
            },
            {
                avatar: 'https://joeschmoe.io/api/v1/random',
                authorName: 'Duboo',
                commentContent: 'Help people create their product prototypes beautifully and efficiently',
                commentTime: '2022-11-04 14:22'
            },
            {
                avatar: 'https://joeschmoe.io/api/v1/random',
                authorName: 'Recheal',
                commentContent: 'Help people create their product prototypes beautifully and efficiently',
                commentTime: '2022-06-22 14:22'
            },
        ])
    }, [])

    const sendComment = (v, e) => {
        let myCommentItem = {};
        let newMyComments = [];
        myCommentItem.commentContent = v;
        myCommentItem.commentTime = getNowFormatDate();
        newMyComments = [myCommentItem, ...myComments];
        setMyComment(newMyComments)
    }

    const handleCollection = () => {
        console.log('renderrrrrrrrrrrrrr');
        setCollectionOpened(true)
        if(collectionState === true) {
            setCollectionState(false)
            setToastText('取消收藏')
            setToastImage('https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E5%8F%96%E6%B6%88%E6%94%B6%E8%97%8F.png')
        }else if(collectionState === false) {
            setCollectionState(true)
            setToastText('收藏成功')
            setToastImage('https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%94%B6%E8%97%8F.png')
        }
        setTimeout(() => {
            setCollectionOpened(false)
        }, 2000);
    }

    return (
        <View style={{position: 'relative'}}>
            <AtToast duration={2000} isOpened={collectionOpened} text={toastText} image={toastImage}></AtToast>
            <View className={styles.headerBar}><OrtherHeaderBar title={'话题详情'}/></View>
            <View>
                <View className={styles.topicBar}>
                    <View className={styles.topicTitle}>{topicObject.title}</View>
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
                        <View style={{marginLeft: '20rpx'}}>{topicObject.authorName}</View>
                    </View>
                    <View className={styles.topicContent}>{topicObject.content}</View>
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
                                        <View style={{marginLeft: '20rpx'}}>{userObject.authorName}</View>
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
                    topicOtherComment.map(item => {
                        return (
                            <View>
                                <View className={styles.commenterInfo}>
                                    <AtAvatar className={styles.userAvatar} circle  image={item.avatar}></AtAvatar>
                                    <View style={{marginLeft: '20rpx'}}>{item.authorName}</View>
                                </View>
                                <View className={styles.commentContent}>{item.commentContent}</View>
                                <View className={styles.commentTime}>{item.commentTime}</View>
                                <View style={{marginTop: '30rpx'}} className={styles.diverBar}></View>
                            </View>
                            
                        )
                    })
                }
            </View>
            <View className={styles.commentBottomBar}>
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
