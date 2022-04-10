import React, { useState, useEffect } from 'react';
import { View, WebView  } from '@tarojs/components'
import styles from './index.module.scss';
export default function TopicPage() {
    


  

    return (
        <View>
            <WebView style={{height: '100vh', width: '100vw'}} src="http://localhost:3000/#/vr-house?id=1"></WebView>
        </View>
    )
}
