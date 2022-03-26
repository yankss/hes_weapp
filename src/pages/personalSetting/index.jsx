import React, { useState, useEffect } from 'react';
import { View, Text, Picker  } from '@tarojs/components'
import { AtInput, AtButton, AtList, AtListItem, AtAvatar, } from 'taro-ui'
import OrtherHeaderBar from '../../components/OrtherHeaderBar/index';
import styles from './index.module.scss';
export default function PersonalSetting() {

    const [userObject, setUserObject] = useState({
        avatar: 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/male',
        username: '我来找房子',
        grand: '男',
        birthday: '1997.07.21',
        zone: '广东省广州市',
        phone: '13544520424'
    });
    const [birthday, setBirthday] = useState('2017.07.21')
    const [ formItem, setFormItem ] = useState([
        {
            label: '头像',
            value: 'avatar',
            type: 'avatar',
            placeholder: '请输入昵称'
        },
        {
            label: '昵称',
            value: 'username',
            type: 'text',
            placeholder: '请输入昵称'
        },
        {
            label: '性别',
            value: 'grand',
            type: 'text',
            placeholder: '请选择性别'
        },
        {
            label: '生日',
            value: 'birthday',
            type: 'date',
            placeholder: '请选择生日日期'
        },
        {
            label: '地区',
            value: 'zone',
            type: 'text',
            placeholder: '请选择地区'
        },
        {
            label: '手机号',
            value: 'phone',
            type: 'text',
            placeholder: '请输入手机号'
        },
    ])

    const handleChange = (value, event) => {
        let { id } = event.mpEvent.currentTarget;
        let userObj = {};
        userObj[`${id}`] = value;
        userObj = Object.assign(userObject, userObj);
        setUserObject(userObj);
        console.log(userObject);
    }
    const onBirthDayChange = (e) => {
        let userObj = {}
        userObj.birthday = e.detail.value;
        userObj = Object.assign(userObject, userObj)
        setUserObject(userObj);
        console.log(userObject);
        setBirthday(e.detail.value)
    }

    const chooseImage = () => {
        console.log(111111111111);
        wx.chooseImage({
            success: res => {
                
                console.log(res);
                avatarChange('https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/female')
                // let userObj = {}
                // userObj.avatar = res.tempFilePaths[0];
                // userObj.avatar = 'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/female';
                // userObj = Object.assign(userObject, userObj);
                // setUserObject(userObj);
                // console.log(userObject);
            },
            error: err => {
                console.log(err);
            }
        })
    }

    const avatarChange = (v) => {
        let userObj = {}
        // userObj.avatar = res.tempFilePaths[0];
        userObj.avatar = v;
        userObj = Object.assign(userObject, userObj);
        setUserObject(userObj);
        console.log(userObject);
    }


    return (
        <View className={styles.mainContainer}>
            <OrtherHeaderBar title={'个人设置'}/>
            <View className={styles.formContainer}>
                
                {
                    formItem.map((item, index) => {
                        return (
                            item.type === 'text' ? (
                                <AtInput
                                    key={item.value}
                                    name={item.value}
                                    title={item.label}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    value={userObject[`${item.value}`]}
                                    onChange={handleChange}
                                    className={styles.formItem}
                                />
                            )
                            : item.type === 'date' ? (
                                <View>
                                    <View>
                                        <Picker mode='date'  onChange={onBirthDayChange} value={birthday}>
                                            <AtList>
                                                <AtListItem className={styles.birthdayBar} title='生日' extraText={birthday}/>
                                            </AtList>
                                        </Picker>
                                    </View>
                                </View>
                            )
                            : item.type === 'avatar' ? (
                                <View className={styles.avatarBar} onClick={chooseImage}>
                                    <View style={{marginLeft: '50rpx'}}>{item.label}</View>
                                    <AtAvatar
                                        className={styles.userAvatar} 
                                        circle 
                                        image={userObject[`${item.value}`]}
                                        onChange={avatarChange}
                                    ></AtAvatar>
                                </View>
                            )
                            : null
                        )
                    })
                }
            </View>

            <AtButton className={styles.logoutButton} type='secondary'>退出登录</AtButton>
            <AtButton className={styles.switchUserButton} type='secondary'>切换账户</AtButton>

        </View>
    )
}