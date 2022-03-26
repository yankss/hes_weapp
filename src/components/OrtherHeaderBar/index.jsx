import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import styles from './index.module.scss';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.goBack = this.goBack.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  goBack() {
    wx.navigateBack({
      delta: 1
    })
  }
  goHome() {
    // 不可返回跳转
    wx.redirectTo({
      url: '/pages/index/index',
    });
  }

  render () {
    const { title } = this.props;
    return (
      <View>
        <View className={styles.headerBar}>
            <View className={styles.mainContainer}>
              <View className={styles.iconView}>
                {
                  title === '消息' || title === '我的收藏夹' || title === '我的' 
                  ? 
                  <View onClick={() => this.goHome()} style={{fontSize: '36rpx', padding: '10rpx'}} className='at-icon at-icon-home'></View>
                  : 
                  <View onClick={() => this.goBack()} style={{fontSize: '36rpx', padding: '10rpx', marginRight: '5rpx', marginTop: '5rpx'}} className='at-icon at-icon-chevron-left'>
                  </View>
                }
              </View>
              <View className={styles.titleStyles}>{title}</View>
            </View>
        </View>
      </View>
    )
  }
}
