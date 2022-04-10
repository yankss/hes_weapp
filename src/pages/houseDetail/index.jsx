import React, { useState, useEffect } from 'react';
import { View, Swiper, SwiperItem, CoverView, Map, Picker } from '@tarojs/components'
import Taro, { Current } from '@tarojs/taro'
import { AtIcon, AtTag, AtAvatar, AtToast, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtCalendar, AtList, AtListItem } from 'taro-ui'
import OrtherHeaderBar from '../../components/OrtherHeaderBar/index';
import HouseList from '../../components/HouseList/index';
import * as hosueApi from '../../api/houseApi';
import * as houseFacilityApi from '../../api/hosueFacilityApi';
import * as houseCollectionApi from '../../api/houseCollectionApi';
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
    const [isFavorites, setIsFavorites  ] = useState(false)
    const [mapMarkers, setMapMarkers  ] = useState([])
    const [houseData, setHouseData] = useState({})
    const [houseInfo, setHouseInfo] = useState([
        {
            value: '3室2厅1卫',
            key: 'houseLayout',
            label: '房型'
        },
        {
            value: '100',
            key: 'houseArea',
            label: '面积'
        },
        {
            value: '低/4层',
            key: 'floor',
            label: '楼层'
        },
        {
            value: '南',
            key: 'houseToward',
            label: '朝向'
        }
    ])
    const [equipmentList, setEquipmentList] = useState([
        {
            label: '冰箱',
            value: true,
            key: 'haveRefrigerator'
        },
        {
            label: '洗衣机',
            value: true,
            key: 'haveWashingMachine'
        },
        {
            label: '热水器',
            value: true,
            key: 'haveWaterHeater'
        },
        {
            label: '空调',
            value: true,
            key: 'haveAirConditioner'
        },
        {
            label: '沙发',
            value: true,
            key: 'haveSofa'
        },
        {
            label: '油烟机',
            value: true,
            key: 'haveLampblackMachine'
        },
        {
            label: '燃气灶',
            value: true,
            key: 'haveKitchenBurningGas'
        },
        {
            label: '可做饭',
            value: true,
            key: 'haveCookMeal'
        },
        {
            label: '电视',
            value: true,
            key: 'haveTv'
        },
        {
            label: '宽带',
            value: true,
            key: 'haveNetwork'
        },
        {
            label: '衣柜',
            value: true,
            key: 'haveWardrobe'
        },
        {
            label: '床',
            value: true,
            key: 'haveBed'
        },
        {
            label: '卫生间',
            value: true,
            key: 'haveToilet'
        },
        {
            label: '智能门锁',
            value: true,
            key: 'haveSmartLock'
        },
        {
            label: '阳台',
            value: true,
            key: 'haveBalcony'
        },
    ]);
    const [openToast, setOpenToast] = useState(false);
    const [toastText, setToastText] = useState('收藏成功');
    const [toastIconType, setToastIconType] = useState('check');
    const [dateModalOpened, setDateModalOpened] = useState(false);
    const [ houseListData, setHouseListData] = useState([]);
    const [houseTag, setHouseTag] = useState([]);
    const [timeSel, setTimeSel] = useState('12:01')
    const [tiemSelectOpened, setTimeSelectOpened] = useState(false);

    useEffect(() => {
        let houseCollection = {
            houseId: parseInt(Current.router.params.hid),
            uid: parseInt(wx.getStorageSync('uid'))
        }
        houseCollectionApi.checkIsCollected(houseCollection).then(res => {
            setIsFavorites(Boolean(res.data))
        })
        setMapMarkers([normalCallout, ...customMarkers]);
        setHouseListData([])
        hosueApi.findHouseByid(parseInt(Current.router.params.hid)).then(res => {
            let houseData = {};
            let hi = [];
            houseData = res.data;
            houseData.tag = houseData.tag.split('、');
            hi = houseInfo.map(item => {
                item.value =  houseData[`${item.key}`]
                return item;
            })
            setHouseInfo(hi);
            setHouseData(houseData);
            setHouseTag(houseData.tag)
        }).then(res => {
            houseFacilityApi.findHouseFacilityByid(Current.router.params.hid).then(res1 => {
                let el = []
                el = equipmentList.map(item => {
                    item.value = res1.data[`${item.key}`] === 1 ? true : false;
                    return item;
                })
                setEquipmentList(el)
            })
        })

    }, [])
    

    const handleSwiperClick = (e) => {
        console.log(e);
    }
    
    const getMoreLandlordInfo = () => {
        wx.navigateTo({
            url: '/pages/landlordDetailInfo/index',
        });
    }

    const getFavorites = () => {
        let houseCollection = {
            houseId: parseInt(Current.router.params.hid),
            uid: parseInt(wx.getStorageSync('uid'))
        }
        if(isFavorites === false) {
            houseCollectionApi.houseCollected(houseCollection).then(res => {
                setToastText('收藏成功');
                setToastIconType('check')
                setIsFavorites(true)
            })
        } else if(isFavorites === true) {
            houseCollectionApi.cancleCollected(houseCollection).then(res => {
                setToastText('取消收藏');
                setToastIconType('blocked')
                setIsFavorites(false)
            })
            
        }
        setOpenToast(true)
        setTimeout(() => {
            setOpenToast(false)
        }, 2000);
    }

    const subscribeHandle = () => {
        setDateModalOpened(true)
    }

    const closeModal = () => {
        setDateModalOpened(false);
    }

    const dayClickHandle = (item) => {
        // subscribeDay
        console.log(item.value);
        setTimeSelectOpened(true)
    }

    const onTimeChange = (e) => {
        // subscribeTime
        console.log(e.detail.value);
    }



    
    return (
        <View className={styles.mainContainer}>
            <AtModal isOpened={dateModalOpened}>
                <AtModalHeader>选择预约看房日期</AtModalHeader>
                <AtModalContent>
                    <AtCalendar
                        onDayClick={dayClickHandle}
                    />
                </AtModalContent>
                <AtModalAction>
                    <button onClick={closeModal}>取消</button>
                    <button>确定</button> 
                </AtModalAction>
            </AtModal>

            <AtModal isOpened={tiemSelectOpened}>
                <AtModalHeader>选择具体时间</AtModalHeader>
                <AtModalContent>
                    <View className='page-section'>
                        <View>
                            <Picker mode='time' onChange={onTimeChange}>
                                <AtList>
                                <AtListItem title='请选择时间' extraText={timeSel} />
                                </AtList>
                            </Picker>
                        </View>
                    </View>
                </AtModalContent>
                <AtModalAction>
                    <button onClick={() => setTimeSelectOpened(false)}>取消</button>
                    <button>确定</button>
                </AtModalAction>
            </AtModal>
            

            <AtToast duration={2000} isOpened={openToast} text={toastText} icon={toastIconType}></AtToast>
            <OrtherHeaderBar className={styles.aaaaa} title={'房屋详情'}/>
            <View className={styles.scrollView}>
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
                        
                        <View className={styles.houseTopic}>{`整租 | ${houseData.houseTitle}`}</View>
                        <View className={styles.feeInfo}>
                            <View className={styles.monthlRent}>{`${houseData.monthlyRent}/月`}</View>
                            <View className={styles.payType}>押二付一 明细</View>
                        </View>
                        <View className={styles.houseInfo}>
                            {
                                houseInfo.map((item, index) => {
                                    return (
                                        item.key === 'area' ? (
                                            <View key={item.key} className={styles.infoItem}>
                                                <View>{`${item.value}m²`}</View>
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
                            {
                                houseTag.map(item => {
                                    return (
                                        <AtTag key={item} className={styles.tagStyle} circle={false} size="normal" active={true} type="primary">{item}</AtTag>
                                    )
                                    
                                })
                            }
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
                                { houseData.houseDescription }
                            </View>
                            <View className={styles.equipmentList}>
                                {
                                    equipmentList.map((item, index) => {
                                        return (
                                            <View className={styles.equipmentListItem} key={item.index}>
                                                {
                                                    item.value === true ? <AtIcon className={styles.equipmentIcon} value='check' size='10' color='#000'></AtIcon>
                                                    : <AtIcon className={styles.equipmentIcon} value='close' size='10' color='#000'></AtIcon>
                                                }
                                                <View className={styles.equipmentText} style={{fontSize: '24rpx', marginLeft: '-40rpx'}}>{item.label}</View>
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
                        onClick={() => getFavorites()} 
                        type={'secondary'} 
                        size='small' 
                        className= {styles.actionBtn}
                    >
                        <AtIcon className={styles.bottomBarTag} value='star-2' size='15' ></AtIcon>已收藏
                    </button>)
                    : (
                        <button 
                            onClick={() => getFavorites()} 
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