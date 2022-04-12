import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtToast   } from 'taro-ui'
import * as userApi from '../../api/userApi';

import styles from './index.module.scss';
export default function Login() {

  const [loginCardTransform, setLoginCardTransform] = useState('');
  const [registerCardTransform, setRegisterCardTransform] = useState('');
  const [formType, setFormType] = useState(1);
  const [registerFormItem, setRegisterFormItem] = useState([
    {
      label: '账号',
      key: 'account',
      type: 'text',
      disabled: false,
      placeholder: '请输入账号'
    },
    {
      label: '用户名',
      key: 'username',
      type: 'text',
      disabled: false,
      placeholder: '请输入用户名'
    },
    {
      label: '密码',
      key: 'password',
      type: 'password',
      disabled: false,
      placeholder: '请输入密码'
    },
    {
      label: '确认密码',
      key: 'surePassword',
      type: 'password',
      disabled: false,
      placeholder: '请再次输入密码'
    },
    {
      label: '电话',
      key: 'phone',
      type: 'phone',
      disabled: false,
      placeholder: '请输入电话'
    },
    {
      label: '电子邮箱',
      key: 'email',
      type: 'input',
      disabled: false,
      placeholder: '请输入电子邮箱'
    },
    {
      label: '性别',
      key: 'email',
      type: 'input',
      disabled: false,
      placeholder: '请输入性别'
    },
    {
      label: '真实姓名',
      key: 'email',
      type: 'input',
      disabled: false,
      placeholder: '请输入真实姓名'
    },
    {
      label: '身份证号码',
      key: 'email',
      type: 'input',
      disabled: false,
      placeholder: '请输入身份证号码'
    },

  ]);
  const [registerUserObject, setRegisterUserObject] = useState({});
  const [loginUserObject, setLoginUserObject] = useState({});
  const [loginMessageOpend, setLoginMessageOpend] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [inputContainer, setInputContainer] = useState({})
  const [registerFormHeight, setRegisterFormHeight] = useState('90% !important')
  const [flexBoxHeight, setFlexBoxHeight] = useState({})
  const [isExpend, setIsExpend] = useState(false);


  useEffect(() => {
  }, [])


  const handleChange = (value, event) => {
    let { id } = event.mpEvent.currentTarget;
    let userObj = {};
    userObj[`${id}`] = value;
    if(formType === 1) {
      userObj = Object.assign(loginUserObject, userObj);
      setLoginUserObject(userObj);
      console.log(loginUserObject);
    }else {
      userObj = Object.assign(registerUserObject, userObj);
      setRegisterUserObject(userObj);
      console.log(registerUserObject);
    }
  }

  const registerSumbit = () => {
    
    userApi.registered(registerUserObject).then(res => {
      console.log(res);
      setFormType(1)
      setLoginCardTransform('rotateY(0deg)')
      setRegisterCardTransform('rotateY(-180deg)')
    })
  }

  const registerBtnHandle = () => {
    setFormType(2)
    setLoginCardTransform('rotateY(180deg)')
    setRegisterCardTransform('rotateY(0deg)')
  }

  const loginSumbitHandle = () => {
    userApi.login(loginUserObject).then(res => {
      console.log(res);
      
      if(res.state === 200) {
        console.log(res.data.uid);
        console.log(res.data.username);
        let uid = res.data.uid;
        let username = res.data.username
        let avatar = res.data.avatar
        let token = res.data.token
        wx.setStorageSync(
            'uid',
            uid
        )
        wx.setStorageSync(
          'username',
          username)
        wx.setStorageSync(
          'avatar',
          avatar)
        wx.setStorageSync(
          'token',
          token)
        wx.redirectTo({
          url: '/pages/index/index',
        });
      }else {
        setLoginMessageOpend(true);
        setLoginMessage(`${res.message}`);
        setTimeout(() => {
          setLoginMessageOpend(false);
        }, 2000);
      }
      
    }).then(err => {
        if(err !== undefined) {
          console.log(err);
        }
    })
  }

  const resetHandle = () => {
    if(formType === 1) {
      setLoginUserObject({});
    }else {
      setRegisterUserObject({});
    }
  }

  const goLogin = () => {
    setFormType(1)
    setLoginCardTransform('rotateY(0deg)')
    setRegisterCardTransform('rotateY(-180deg)')
  }

  const extendHandle = () => {
    setIsExpend(true)
    setInputContainer({
      height: 'auto',
      overFlow: 'auto !important'
    })

    setRegisterFormHeight('75vh !important')

    setFlexBoxHeight({
      height: '72vh !important'
    })
  }

  const narrowHandle = () => {
    setIsExpend(false)
    setInputContainer({})
    setRegisterFormHeight('')

    setFlexBoxHeight({})
  }



    return (
        <View className={styles.mainBody}>
          <AtToast isOpened={loginMessageOpend} text={loginMessage} icon="close"></AtToast>
          <image src={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/logo.png'} className={styles.appName}></image>
          <View style={{transform: loginCardTransform}} className={styles.loginCard}>
            <AtForm
              className={styles.loginForm}
            >
              <View className={styles.flexBox}>
                <View className={styles.cardTitle}>登录</View>
                <View className={styles.inputBar}>
                  <AtInput 
                    name='username' 
                    title='账号' 
                    type='text' 
                    placeholder='单行文本' 
                    value={loginUserObject.username} 
                    onChange={handleChange} 
                    className={styles.inputBar}
                  />
                  <AtInput 
                    name='password' 
                    title='密码' 
                    type='text' 
                    placeholder='单行文本' 
                    value={loginUserObject.password} 
                    onChange={handleChange} 
                    className={styles.inputBar}
                  />
                </View>
                <View className={styles.actionBar}>
                  <AtButton onClick={loginSumbitHandle} className={styles.loginSumbit} >登录</AtButton>
                  <AtButton onClick={resetHandle} className={styles.loginReset} >重置</AtButton>
                  <AtButton onClick={registerBtnHandle} className={styles.registerBtn} >注册</AtButton>
                </View>
              </View>
            </AtForm>
          </View>
          <View style={{transform: registerCardTransform}} className={styles.registerCard}>
            <AtForm
              className={styles.registerForm}
              style={{height: registerFormHeight}}
            >
              <View style={flexBoxHeight} className={styles.flexBox}>
                <View className={styles.cardTitle}>注册</View>
                <View style={inputContainer} className={styles.inputContainer}>
                  {
                    registerFormItem.map(item => {
                      return (
                        <AtInput 
                          key={item.key}
                          name={item.key}
                          title={item.label} 
                          type={item.type}
                          placeholder={item.placeholder}
                          value={registerUserObject[`${item.key}`]} 
                          onChange={handleChange} 
                          className={styles.inputBar}
                        />
                      )
                    })
                  }
                </View>
                {
                  isExpend === false ? 
                  <image onClick={extendHandle} className={styles.arrowDown} src={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/arrow_down.png'}></image>
                  :
                  <image onClick={narrowHandle} className={styles.arrowDown} src={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/arrow-up.png'}></image>
                }
                <View className={styles.actionBar}>
                  <AtButton onClick={goLogin} className={styles.registerSumbit} >登录</AtButton>
                  <AtButton onClick={registerSumbit} className={styles.registerSumbit} >提交</AtButton>
                  <AtButton onClick={resetHandle} className={styles.registerReset} >重置</AtButton>
                </View>
              </View>
            </AtForm>
          </View>
        </View>
    )
}
