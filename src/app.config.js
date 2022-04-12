export default {
  pages: [
    'pages/index/index',
    'pages/personalSetting/index',
    'pages/houseDetail/index',
    'pages/landlordDetailInfo/index',
    'pages/noHouse/index',
    'pages/noContract/index',
    'pages/noReceipt/index',
    'pages/myHouse/index',
    'pages/login/index',
    'pages/topicPage/index',
    'pages/topicDetail/index',
    'pages/newTopicPage/index',
    'pages/certificationApplication/index',
    'pages/mySubscribe/index',
    'pages/VRHouse/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  "permission":{
    "scope.userLocation":{
      "desc": "获取地理位置信息的用途描述"
    }
  }
}
