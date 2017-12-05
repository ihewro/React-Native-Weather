/**
 * 天气界面的底部
 */


import React,{Component} from 'react'
import {StyleSheet, View, Text, Image, StatusBar, ScrollView, RefreshControl, DrawerLayoutAndroid,ImageBackground} from 'react-native';
import Divider from  '../component/divider'

export default class WeatherFooter extends Component{
    //构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return(
            <View style={styles.weatherFooter}>
                <Divider/>
                <View style={styles.weatherFooterTextView}>
                    <Text style={styles.weatherFooterText}>数据来源和风天气</Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    weatherFooter:{
        marginTop:20,
    },
    weatherFooterTextView:{
        flex:1,
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom:10
    },
    weatherFooterText:{
        color: '#rgba(255,255,255,0.5)',
        fontSize: 12,
        right: 0

    }
})
