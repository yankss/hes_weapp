import React from 'react';
import { View } from '@tarojs/components'
import NoDataPage from '../../components/noDataPage'
export default function NoHouse(props) {
    






    return (
        <View style={{position: 'relative'}}>

            <NoDataPage
                title={'我的房子'}
                showImage={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%9A%82%E6%97%A0%E5%9B%BE%E7%89%87.png'}
                tip={'暂无您的房屋信息，快去租用您的梦中情房吧 ~ '}
            />

        </View>
    )
}
