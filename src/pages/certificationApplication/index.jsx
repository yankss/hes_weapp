import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtImagePicker , AtInput, AtModal, AtProgress, AtModalContent, AtModalAction } from 'taro-ui'
import OrtherHeaderBar from '../../components/OrtherHeaderBar';
import styles from './index.module.scss';
import * as userApi from '../../api/userApi'
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
        disabled: true
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
        disabled: false
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
        label: '真实姓名',
        key: 'name',
        type: 'input',
        disabled: false
      },
      {
        label: '身份证号码',
        key: 'idCard',
        type: 'input',
        disabled: false
      },
      {
        label: '学校',
        key: 'school',
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
  const [certificationStatus, setCertificationStatus] = useState(0)

  useEffect(() => {
    userApi.findByUid(parseInt(wx.getStorageSync('uid'))).then(res => {
      console.log(res);
      res.data.gender === 1 ? res.data.gender = '男' : res.data.gender = '女'
      setUserObject(res.data)
      setCertificationStatus(res.data.certificationStatus);
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
          {
            certificationStatus === 3 ? 
            <View className={styles.successContainer}>
              <image style={{height: '800rpx', width: '100vw'}} src={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E8%AE%A4%E8%AF%81%E6%88%90%E5%8A%9F.png'}></image>
              <View className={styles.successText} ><image style={{height: '60rpx', width: '60rpx', marginRight: '10rpx'}} src={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E7%AC%91%E8%84%B8%E8%A1%A8%E6%83%85.png'}></image>您已经完成学生认证啦 ~ ~ ~</View>
            </View>
            :
            <View>
              {
                certificationStatus === 1 ? 
                <AtModal closeOnClickOverlay={false} isOpened={true}>
                  <AtModalContent className={styles.modalContent}>
                    学生认证正在审核中，请耐心等待 ~ 
                    <AtProgress style={{height: '100rpx'}} color='#003399' status='progress' percent={99} isHidePercent={true}/>
                  </AtModalContent>
                  <AtModalAction><button onClick={cancleHandle} style={{fontSize: '30rpx'}}>确定</button></AtModalAction>
                </AtModal>
                : null
              }
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
          }
        </View>
    )
}
