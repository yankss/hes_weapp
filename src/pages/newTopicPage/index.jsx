import React, { useState, useEffect } from 'react';
import { View, Image } from '@tarojs/components'
import Taro, {  } from '@tarojs/taro'
import { AtAvatar, AtImagePicker, AtInput, AtTextarea, AtCheckbox, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtSearchBar } from 'taro-ui'
import OrtherHeaderBar from '../../components/OrtherHeaderBar';
import styles from './index.module.scss';
import * as tagApi from '../../api/tagApi';
import * as topicApi from '../../api/topicApi';
import * as uploadApi from '../../api/uploadApi';
export default function NewTopicPage(props) {
    
    const [userObject, setUserObject] = useState({});
    const [illustrations, setIllustrations] = useState([])
    const [topicFormItem, setTopicFormItem] = useState([
        {
            label: '标签类型',
            key: 'tag',
            type: 'Checkbox'
        },
        {   
            label: '话题标题',
            key: 'topicTitle',
            type: 'text'
        },
        {
            label: '话题内容',
            key: 'mainContent',
            type: 'textarea'
        },
        {
            label: '插图',
            key: 'illustrations',
            type: 'image'
        },
    ])
    const [newTopicObject, setNewTopicObject] = useState({});
    const [tagModalShow, setTagModalShow] = useState(false)
    const [tagModalShowIsOpened, setTagModalShowIsOpened] = useState(false)
    const [tagCheckedList, setTagCheckedList] = useState([])
    const [checkboxOption, setCheckboxOption] = useState([])
    const [tagSearchValue, setTagSearchValue] = useState([])
    const [newTag, setNewTag] = useState({})


    useEffect(() => {
        setUserObject({
            authorName: wx.getStorageSync('username'),
            avatar: wx.getStorageSync('avatar')
        })
        tagApi.getAllTag().then(res => {
            let checkboxOptions = res.data;
            checkboxOptions = checkboxOptions.map(item => {
                item.value = item.tagName;
                item.label = item.tagName;
                item.desc = item.tagDescribe
                return item;
            })
            setCheckboxOption(checkboxOptions);
        })
    }, [])

    const imageChangeHandle = (files, o, i) => {
        setIllustrations(files)
        let topicObj = {}
        topicObj.illustrations = files;
        topicObj = Object.assign(newTopicObject, topicObj);
        setNewTopicObject(topicObj);
        
    }

    const handleChange = (v, e) => {
        let topicObj = {}
        if(e) {
            let { id } = e.mpEvent.currentTarget;
            id !== 'topicTitle' ? id = 'mainContent' : id = id;
            topicObj[`${id}`] = v
        } else {
            topicObj.tag = tagCheckedList.toString();
        }
        topicObj = Object.assign(newTopicObject, topicObj);
        setNewTopicObject(topicObj)
    }

    const showModal = (v, e) => {
        setTagModalShow(true)
    }

    const handleCheckboxChange = (v) => {
        setTagCheckedList(v);
    }

    const tagSearchValueHandle = (v, e) => {
        setTagSearchValue(v)
    }

    const closeModal = (key) => {
        setTagModalShow(false)
        switch (key) {
            case 'cancle':
                break;

            case 'select':
                handleChange()
                break;
        
            default:
                break;
        }
    }

    const closeTagModal = (key) => {
        setTagModalShowIsOpened(false)
        switch (key) {
            case 'cancle':
                break;
            case 'yes':
                // 修改多选框的option
                newTag.value = newTag.tagName;
                newTag.label = newTag.tagName;
                newTag.desc = newTag.tagDescribe
                let tagList = checkboxOption;
                tagList.unshift(newTag);
                setCheckboxOption(tagList);
                tagApi.newTag(newTag).then(res => {
                    console.log(res);
                })
                break;
        
            default:
                break;
        }
    }

    const showTagModal = () => {
        setTagModalShowIsOpened(true)
    }

    const handleNewTagChange = (v, e) => {
        let tagObj = {}
        let { id } = e.mpEvent.currentTarget;
        id !== 'tagName' ? id = 'tagDescribe' : id = id;
        tagObj[`${id}`] = v
        tagObj = Object.assign(newTag, tagObj);
        setNewTag(tagObj)
    }

    const canclePublishHandle = () => {
        wx.navigateBack({
            delta: 1
        })
    }
    const publishHandle = () => {
        if(newTopicObject.illustrations !== undefined) {
            newTopicObject.illustrations = newTopicObject.illustrations.map(item =>  item.url);
            newTopicObject.illustrations = newTopicObject.illustrations.toString();
        }
        try {
            newTopicObject.uid = wx.getStorageSync('uid');
            newTopicObject.username = wx.getStorageSync('username')
            newTopicObject.userAvatar = wx.getStorageSync('avatar')
        if (newTopicObject.uid) {
            topicApi.newTopic(newTopicObject).then(res => {
                if(res.state === 200) {
                    wx.setStorage({
                        key: 'newTopic',
                        data: newTopicObject
                    })
                    setIllustrations([]);
                    setNewTopicObject({});
                    wx.navigateTo({
                        url: '/pages/topicPage/index'
                    });
                }
            })
            
        }
        } catch (e) {
        } 
        
        
        
        
        
    }

    const searchHandle = () => {
        tagApi.fuzzyQuery(tagSearchValue).then(res => {
            let checkboxOptions = res.data;
            checkboxOptions = checkboxOptions.map(item => {
                item.value = item.tagName;
                item.label = item.tagName;
                item.desc = item.tagDescribe
                return item;
            })
            setCheckboxOption(checkboxOptions);
        })
    }

    const clearHandle = () => {
        setTagSearchValue('')
        tagApi.getAllTag().then(res => {
            let checkboxOptions = res.data;
            checkboxOptions = checkboxOptions.map(item => {
                item.value = item.tagName;
                item.label = item.tagName;
                item.desc = item.tagDescribe
                return item;
            })
            setCheckboxOption(checkboxOptions);
        })
    }

    return (
        <View style={{position: 'relative', height: '100vh'}}>
            <View className={styles.headerBar}><OrtherHeaderBar title={'新建话题'}/></View>
            <View style={{margin: '30rpx'}}>
                <View className={styles.userInfoBar}>
                    <AtAvatar className={styles.userAvatar} circle  image={userObject.avatar}></AtAvatar>
                    <View style={{marginLeft: '30rpx'}}>{userObject.authorName}</View>
                </View>
                <View className={styles.topicForm}>
                    {
                        topicFormItem.map(item => {
                            return (
                                item.type === 'text' ?
                                (
                                    <AtInput
                                        key={item.key}
                                        name={item.key}
                                        title={item.label}
                                        type={item.type}
                                        placeholder={item.placeholder}
                                        value={newTopicObject[`${item.value}`]}
                                        onChange={handleChange}
                                        className={styles.formItem}
                                    />
                                )
                                : item.type === 'textarea' ?
                                (
                                    <AtTextarea
                                        name={item.key}
                                        className={styles.formItem}
                                        value={newTopicObject[`${item.key}`]}
                                        onChange={handleChange}
                                        maxLength={200}
                                        placeholder='请输入话题内容'
                                    />
                                )
                                : item.type === 'image' ?
                                (
                                    <View className={styles.formItem}>
                                        {item.label}
                                        <AtImagePicker
                                            count={3}
                                            length={3}
                                            files={illustrations}
                                            onChange={imageChangeHandle}
                                        />
                                    </View>
                                )
                                : item.type === 'Checkbox' ?
                                (
                                    <AtInput
                                        key={item.key}
                                        name={item.key}
                                        title={item.label}
                                        type={item.type}
                                        placeholder={item.placeholder}
                                        value={newTopicObject[`${item.key}`]}
                                        onChange={handleChange}
                                        className={styles.formItem}
                                        onFocus={showModal}
                                    />
                                )
                                : null
                            )
                        })
                    }
                    <AtModal closeOnClickOverlay={false} className={styles.newTagModal} isOpened={tagModalShowIsOpened}>
                    <AtModalHeader className={styles.modalHeader}>
                            新建房屋标签
                        </AtModalHeader>
                        <AtModalContent>
                            <AtInput
                                title={'标签名'}
                                name='tagName'
                                type={'text'}
                                placeholder={'请输入标签名'}
                                value={newTag.label}
                                onChange={handleNewTagChange}
                                className={styles.formItem}
                            />
                            <AtTextarea
                                className={styles.formItem}
                                name='tagDescribe'
                                value={newTag.desc}
                                onChange={handleNewTagChange}
                                maxLength={100}
                                placeholder='请输入标签含义'
                            />
                        </AtModalContent>
                        <AtModalAction>
                            <button onClick={() => closeTagModal('cancle')}>取消</button>
                            <button onClick={() => closeTagModal('yes')}>确定</button> 
                        </AtModalAction>
                    </AtModal>
                    <AtModal closeOnClickOverlay={false} isOpened={tagModalShow}>
                        <AtModalHeader className={styles.modalHeader}>
                            选择房屋标签
                            <button onClick={showTagModal} className={styles.newTagButton}>新建标签</button>
                        </AtModalHeader>
                        <AtModalContent>
                            <AtSearchBar
                                showActionButton={false}
                                value={tagSearchValue}
                                onChange={tagSearchValueHandle}
                                className={styles.tagSearchBar}
                                onConfirm={searchHandle}
                                onActionClick={searchHandle}
                                onClear={clearHandle}
                            />
                            <AtCheckbox
                                options={checkboxOption}
                                selectedList={tagCheckedList}
                                onChange={handleCheckboxChange}
                            />
                        </AtModalContent>
                        <AtModalAction>
                            <button onClick={() => closeModal('cancle')}>取消</button>
                            <button onClick={() => closeModal('select')}>确定</button> 
                        </AtModalAction>
                    </AtModal>
                </View>
            </View>
            <View className={styles.actionBottomBar}>
                <button onClick={canclePublishHandle} className={styles.actionButton}>取消</button>
                <button onClick={publishHandle} className={styles.actionButton}>发布</button>
            </View>
        </View>
    )
}
