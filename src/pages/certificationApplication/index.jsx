import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtImagePicker , AtInput,  } from 'taro-ui'
import OrtherHeaderBar from '../../components/OrtherHeaderBar';
import styles from './index.module.scss';
export default function CertificationApplication(props) {

  const [formItems, setFormItems] = useState([
      {
        label: '账号',
        key: 'account',
        type: 'input',
        disabled: true
      },
      {
        label: '用户名',
        key: 'username',
        type: 'input',
        disabled: false
      },
      {
        label: '电话',
        key: 'phone',
        type: 'input',
        disabled: false
      },
      {
        label: '电子邮箱',
        key: 'email',
        type: 'input',
        disabled: true
      },
      {
        label: '性别',
        key: 'gender',
        type: 'input',
        disabled: true
      },
      {
        label: '年龄',
        key: 'age',
        type: 'input',
        disabled: false
      },
      {
        label: '身份证',
        key: 'idCard',
        type: 'idImage',
        disabled: false
      },
      {
        label: '学生证',
        key: 'studentCard',
        type: 'studentImage',
        disabled: false
      },
  ])
  const [idCard, setIdCard] = useState([]);
  const [studentCard, setStudentCard] = useState([])

  const [userObject, setUserObject] = useState({})

  useEffect(() => {
    setUserObject({
      account: 'yzy13544520424',
      username: 'Yankxx',
      phone: '13434255878',
      email: '2395624352@qq.com',
      gender: '男',
      age: '18'
    })
  }, [])

  const handleChange = (v, e) => {
      let userObj = {}
      let { id } = e.mpEvent.currentTarget;
      userObj[`${id}`] = v
      userObj = Object.assign(userObject, userObj);
      setUserObject(userObj)
      console.log(userObject);
  }

  const imageChangeHandle = (files, o, i, type) => {
      console.log(files,o , i, type);
      switch (type) {
        case 'idCard':
          setIdCard(files);
          break;

        case 'studentCard':
          setStudentCard(files)
          break;
      
        default:
          break;
      }
      let userObj = {}
      userObj[`${type}`] = files;
      userObj = Object.assign(userObject, userObj);
      setUserObject(userObj);
  }

  const cancleHandle = () => {
    wx.navigateBack({
      delta: 1
    })
  }
    
    return (
        <View style={{position: 'relative'}}>
          <View className={styles.headerBar}><OrtherHeaderBar title={'认证申请'}/></View>
          <View style={{margin: '30rpx', paddingBottom: '20rpx'}}>
            {
              formItems.map(item => {
                return (
                    item.type === 'input' ?
                    (
                        <AtInput
                            key={item.key}
                            name={item.key}
                            title={item.label}
                            type={item.type}
                            placeholder={item.placeholder}
                            value={userObject[`${item.key}`]}
                            onChange={handleChange}
                            className={styles.formItem}
                            disabled={item.disabled}
                        />
                    )
                    : item.type === 'idImage' ?
                    (
                        <View className={styles.formItem}>
                            {item.label}
                            <AtImagePicker
                                count={3}
                                length={3}
                                files={idCard}
                                onChange={(files, o, i) => imageChangeHandle(files, o, i, `${item.key}`)}
                            />
                        </View>
                    )
                    : item.type === 'studentImage' ?
                    (
                        <View className={styles.formItem}>
                            {item.label}
                            <AtImagePicker
                                count={3}
                                length={3}
                                files={studentCard}
                                onChange={(files, o, i) => imageChangeHandle(files, o, i, `${item.key}`)}
                            />
                        </View>
                    )
                    : null
                )
              })
            }
          </View>
          <View className={styles.actionBottomBar}>
            <button onClick={cancleHandle} className={styles.actionButton}>取消</button>
            <button className={styles.actionButton}>确定申请</button>
          </View>
        </View>
    )
}
