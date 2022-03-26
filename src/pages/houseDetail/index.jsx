import React, { useState, useEffect } from 'react';
import { View, ScrollView, Swiper, SwiperItem, CoverView, Map } from '@tarojs/components'
import { AtIcon, AtTag, AtAvatar, button, AtToast, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtCalendar } from 'taro-ui'
import OrtherHeaderBar from '../../components/OrtherHeaderBar/index';
import HouseList from '../../components/HouseList/index';
import styles from './index.module.scss';
export default function HouseDetailPage(props) {

    const [normalCallout, setNormalCallout] = useState({
        id: 1,
        latitude: 23.098994,
        longitude: 113.32252,
        callout: {
            content: '文本内容',
            color: '#ff0000',
            fontSize: 14,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#000000',
            bgColor: '#fff',
            padding: 5,
            display: 'ALWAYS',
            textAlign: 'center',
        }
    })
    const [customMarkers, setCustomMarkers ] = useState([])
    const [userComment, setuserComment ] = useState([
        {
            userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            username: '点点',
            commentContext: '楼盘位置好，龙湖品质豪宅，户型很满意，是我扛过最满意的户型了。',
        },
        {
            userImg: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            username: '点点',
            commentContext: '楼盘位置好，龙湖品质豪宅，户型很满意，是我扛过最满意的户型了。',
        }
    ])
    const [isFavorites, setIsFavorites  ] = useState(false)
    const [mapMarkers, setMapMarkers  ] = useState([])
    const [houseInfo, setHouseInfo] = useState([
        {
            value: '3室2厅1卫',
            key: 'houseType',
            label: '房型'
        },
        {
            value: '100',
            key: 'area',
            label: '面积'
        },
        {
            value: '低/4层',
            key: 'floor',
            label: '楼层'
        },
        {
            value: '南',
            key: 'orientation',
            label: '朝向'
        }
    ])
    const [equipmentList, setEquipmentList] = useState([
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
        {
            label: '冰箱',
            key: true,
        },
    ]);
    const [scrollHeight, setScrollHeight] = useState(0);
    const [openToast, setOpenToast] = useState(false);
    const [toastText, setToastText] = useState('收藏成功');
    const [toastIconType, setToastIconType] = useState('check');
    const [dateModalOpened, setDateModalOpened] = useState(false);
    const [ houseListData, setHouseListData] = useState([]);

    useEffect(() => {
        setMapMarkers([normalCallout, ...customMarkers]);
        // console.log(document);
        setHouseListData([
            1,2,3,4,5,
          ])
    }, [])
    
    const onScrollToUpper = (e) => {
    }

    const handleSwiperClick = (e) => {
        console.log(e);
    }
    
    const scrollTop = 0
    const Threshold = 20

    
    const onScroll = (e) => {
        // console.log(e.detail.scrollTop)
        const EscrollTop = e.detail.scrollTop;
        setScrollHeight(EscrollTop);
    }

    const getMoreLandlordInfo = () => {
        wx.navigateTo({
            url: '/pages/landlordDetailInfo/index',
        });
    }

    const getFavorites = () => {
        if(isFavorites === false) {
            setToastText('收藏成功');
            setToastIconType('check')
            setIsFavorites(true)
        } else if(isFavorites === true) {
            setToastText('取消收藏');
            setToastIconType('blocked')
            setIsFavorites(false)
        }
        setOpenToast(true)
        setTimeout(() => {
            setOpenToast(false)
        }, 3000);
    }

    const subscribeHandle = () => {
        console.log(1111111111111);
        setDateModalOpened(true)
    }

    const closeModal = () => {
        setDateModalOpened(false);
    }
    
    return (
        <View className={styles.mainContainer}>
            <AtModal isOpened={dateModalOpened}>
                <AtModalHeader>选择预约看房日期</AtModalHeader>
                <AtModalContent>
                    <AtCalendar />
                </AtModalContent>
                <AtModalAction>
                    <button onClick={closeModal}>取消</button>
                    <button>确定</button> 
                </AtModalAction>
            </AtModal>

            <AtToast isOpened={openToast} text={toastText} icon={toastIconType}></AtToast>
            <OrtherHeaderBar className={styles.aaaaa} title={'房屋详情'}/>
            <View className={styles.scrollView}>
                {/* <ScrollView
                    className={styles.scrollStyle}
                    scrollY={true}
                    scrollWithAnimation={true}
                    scrollTop={scrollTop}
                    lowerThreshold={Threshold}
                    upperThreshold={Threshold}
                    onScrollToUpper={onScrollToUpper}
                    onScroll={onScroll}
                > */}
                    <View>
                        <View className={styles.houseImg}>
                            <Swiper
                                className={styles.swiper}
                                vertical={false}
                                circular={true}
                                indicatorDots
                                interval={3000}
                                autoplay={true}
                                onClick={handleSwiperClick}
                            >
                                <SwiperItem>
                                    <View className={styles.swiperImg1}></View>
                                </SwiperItem>
                                <SwiperItem>
                                    <View className={styles.swiperImg2}></View>
                                </SwiperItem>
                                <SwiperItem>
                                    <View className={styles.swiperImg3}></View>
                                </SwiperItem>
                            </Swiper>
                        </View>
                        
                        <View className={styles.houseTopic}>整租 | 南山风井花园 近学校 拎包入住 免停车费 免物业费 生活便利</View>
                        <View className={styles.feeInfo}>
                            <View className={styles.monthlRent}>2000/月</View>
                            <View className={styles.payType}>押二付一 明细</View>
                        </View>
                        <View className={styles.houseInfo}>
                            {
                                houseInfo.map((item, index) => {
                                    return (
                                        item.key === 'area' ? (
                                            <View key={item.key} className={styles.infoItem}>
                                                <View>{item.value}m²</View>
                                                <View className={styles.itemLabel}>{item.label}</View>
                                            </View>
                                        )
                                        : (
                                            <View key={item.key} className={styles.infoItem}>
                                                <View>{item.value}</View>
                                                <View className={styles.itemLabel}>{item.label}</View>
                                            </View>
                                        )
                                        
                                    )
                                })
                            }
                        </View>
                        <View className={styles.houseTag}>
                            <AtTag className={styles.tagStyle} circle={false} size="normal" active={true} type="primary">近地铁</AtTag>
                            <AtTag className={styles.tagStyle} circle={false} size="normal" active={true} type="primary">附近商圈</AtTag>
                            <AtTag className={styles.tagStyle} circle={false} size="normal" active={true} type="primary">光线明亮</AtTag>
                        </View>
                        <Map
                            setting={{}}
                            markers={mapMarkers}
                            latitude={23.096994}
                            longitude={113.324520}
                            style={{ height: '15vh', width: '100vw' }}
                            >
                            <CoverView slot='callout'>
                                {
                                    customMarkers.map(item => (
                                        /** 自定义样式的 callout */
                                        <CoverView marker-id={item.id} key={item.id} >
                                        <View>导航{item.id}</View>
                                        </CoverView>
                                    ))
                                }
                            </CoverView>
                        </Map>
                        <View className={styles.houseIntroduce}>
                            <View className={styles.houseIntroduceTitle}>房屋介绍</View>
                            <View className={styles.houseIntroduceContext}>
                                {
                                    `1. 小区内部配套有：金明酒店、会展中心和即将完工的悠方大型购物中心、风情商业街以及各大小型的生活超市、科研及总部办公大楼、万博实验学校、商业金融服务中心、大型会所。
                                    2. 小区内部配套有：金明酒店、会展中心和即将完工的悠方大型购物中心、风情商业街以及各大小型的生活超市、科研及总部办公大楼、万博实验学校、商业金融服务中心、大型会所。`
                                }
                            </View>
                            <View className={styles.equipmentList}>
                                {
                                    equipmentList.map((item, index) => {
                                        return (
                                            <View className={styles.equipmentListItem} key={item.index}>
                                                {
                                                    item.key === true ? <AtIcon value='check' size='10' color='#000'></AtIcon>
                                                    : <AtIcon value='close' size='10' color='#000'></AtIcon>
                                                }
                                                <View style={{fontSize: '24rpx', marginLeft: '-40rpx'}}>{item.label}</View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View className={styles.landlordInfo}>
                            <View className={styles.landlordText}>
                                <AtAvatar circle image='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'>
                                </AtAvatar>
                                <View className={styles.landlordMainText}>
                                    <View className={styles.landlordName}>余梓源</View>
                                    <View className={styles.landlordTag}>
                                </View>
                                    <AtTag className={styles.landlordTagStyle} circle={false} size="small" active={true} type="primary">标签</AtTag>
                                </View>
                            </View>
                            <button onClick={getMoreLandlordInfo}  className={styles.mroelandlordInfoButton}>
                                查看更多<AtIcon value='chevron-right' size='11' ></AtIcon>
                            </button>
                        </View>
                        <View className={styles.commentContainer}>
                            <View className={styles.titleBar}>
                                <View>用户点评 (1070)</View>
                                <View className={styles.checkMore}>查看更多<AtIcon  value='chevron-right' size='12' color='#686869'></AtIcon></View>
                            </View>
                            {
                                userComment.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <View className={styles.commenterInfo}>
                                                <AtAvatar circle image={item.userImg}>
                                                </AtAvatar>
                                                <View style={{marginLeft: '20rpx'}}>{item.username}</View>
                                            </View>
                                            <View className={styles.commentContext}>{item.commentContext}</View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <View className={styles.guessYouLikeContainer}>
                            <View className={styles.guessYouLikeTitle}>猜你喜欢</View>
                            <HouseList houseListData={houseListData}/>
                        </View>
                    </View>
                {/* </ScrollView> */}
            </View>
            <View className={styles.bottomBar}>
                {
                    isFavorites === true ? (
                    <button 
                        onClick={getFavorites} 
                        type={'secondary'} 
                        size='small' 
                        className= {styles.actionBtn}
                    >
                        <AtIcon className={styles.bottomBarTag} value='star-2' size='15' ></AtIcon>收藏
                    </button>)
                    : (
                        <button 
                            onClick={getFavorites} 
                            type={'secondary'} 
                            size='small' 
                            className= {styles.actionBtn}
                        >
                            <AtIcon className={styles.bottomBarTag} value='star' size='15' ></AtIcon>收藏
                        </button>
                    )
                }
                <button  className={styles.actionBtn}>
                    <AtIcon className={styles.bottomBarTag} value='message' size='15' ></AtIcon>评论
                </button>
                <button onClick={subscribeHandle} className={styles.actionBtn}>
                    <AtIcon className={styles.bottomBarTag} value='calendar' size='15' ></AtIcon>预约看房
                </button>
            </View>
        </View>
    )
}