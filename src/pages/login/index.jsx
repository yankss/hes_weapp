import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtIcon } from 'taro-ui'

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
  ]);
  const [registerUserObject, setRegisterUserObject] = useState({});
  const [loginUserObject, setLoginUserObject] = useState({});


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
    setFormType(1)
    setLoginCardTransform('rotateY(0deg)')
    setRegisterCardTransform('rotateY(-180deg)')
  }

  const registerBtnHandle = () => {
    setFormType(2)
    setLoginCardTransform('rotateY(180deg)')
    setRegisterCardTransform('rotateY(0deg)')
  }

  const loginSumbitHandle = () => {

  }

  const resetHandle = () => {
    if(formType === 1) {
      setLoginUserObject({});
    }else {
      setRegisterUserObject({});
    }
  }


    return (
        <View className={styles.mainBody}>
          <View className={styles.appName}>房无忧</View>
          <View style={{transform: loginCardTransform}} className={styles.loginCard}>
            <AtForm
              className={styles.loginForm}
            >
              <View className={styles.flexBox}>
                <View className={styles.cardTitle}>登录</View>
                <View className={styles.inputBar}>
                  <AtInput 
                    name='account' 
                    title='账号' 
                    type='text' 
                    placeholder='单行文本' 
                    value={loginUserObject.account} 
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
                  <AtButton onClick={loginSumbitHandle} className={styles.loginSumbit} >提交</AtButton>
                  <AtButton onClick={resetHandle} className={styles.loginReset} >重置</AtButton>
                  <AtButton onClick={registerBtnHandle} className={styles.registerBtn} >注册</AtButton>
                </View>
              </View>
            </AtForm>
          </View>
          <View style={{transform: registerCardTransform}} className={styles.registerCard}>
            <AtForm
              className={styles.registerForm}
            >
              <View className={styles.flexBox}>
                <View className={styles.cardTitle}>注册</View>
                <View className={styles.inputBar}>
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
                <View className={styles.actionBar}>
                  <AtButton onClick={registerSumbit} className={styles.registerSumbit} >提交</AtButton>
                  <AtButton onClick={resetHandle} className={styles.registerReset} >重置</AtButton>
                </View>
              </View>
            </AtForm>
          </View>
        </View>
    )
}
