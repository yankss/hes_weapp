import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import styles from './index.module.scss';
import HomePage from '../home';
import FavoritesPage from '../favorites';
import MessagePage from '../message';
import PersonalPage from '../personal';
import IndexHeaderBar from '../../components/IndexHeaderBar/index';
import OrtherHeaderBar from '../../components/OrtherHeaderBar/index';
import * as userApi from '../../api/userApi';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      isDelete: false,
    }
  }

  componentDidMount() {
    // userApi.getListData().then(res => {
    //   console.log(res);
    // }).then(err => {
    //   console.log(err);
    // })
  }


  handleClick (value) {
    console.log(value);
    if(value === 2) {
      this.setState({ isDelete: true });
    }
    this.setState({
      current: value,
    })
  }

  render () {
    const { current, isDelete } = this.state;

    return (
      <View className={styles.mainPage}>
        
        <View className={styles.headerBar}>
          {
            current === 0 ? <IndexHeaderBar /> 
            : current === 1 ? <OrtherHeaderBar title={'消息'}/>
            : current === 2 ? <OrtherHeaderBar title={'我的收藏夹'}/>
            : current === 3 ? <OrtherHeaderBar title={'我的'}/>
            : null
          }
        </View>
        <View className={styles.mainContainer}>
          {
            current === 0 ? <HomePage/>
            : current === 1 ? <MessagePage/>
            : current === 2 ? <FavoritesPage isDelete={isDelete}/>
            : current === 3 ? <PersonalPage/>
            : null
          }
        </View>
        <AtTabBar
            tabList={[
              { title: '首页', iconType: 'home' },
              { title: '消息', iconType: 'mail', text: '100', max: 99 },
              { title: '收藏', iconType: 'heart'},
              { title: '我的', iconType: 'user' }
            ]}
            onClick={this.handleClick.bind(this)}
            current={this.state.current} 
            className={styles.mainActionBar}
          />
      </View>
    )
  }
}
