import React from 'react';
import { View } from '@tarojs/components'
import NoDataPage from '../../components/noDataPage'
export default function NoContract(props) {
    


    return (
        <View style={{position: 'relative'}}>
            <NoDataPage
                title={'我的合约'}
                showImage={'https://easyhouse-bucket.oss-cn-guangzhou.aliyuncs.com/%E6%9A%82%E6%97%A0%E5%90%88%E7%BA%A6'}
                tip={'暂无合约内容，快跟房东签下心仪的房子吧 ~ '}
            />

        </View>
    )
}
