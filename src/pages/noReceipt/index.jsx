import React from 'react';
import { View } from '@tarojs/components'
import NoDataPage from '../../components/noDataPage'
export default function NoReceipt(props) {


    return (
        <View style={{position: 'relative'}}>
            <NoDataPage
                title={'我的收据'}
                showImage={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%9A%82%E6%97%A0%E6%94%B6%E6%8D%AE'}
                tip={'暂无收据信息 ~ '}
            />
        </View>
    )
}
