/**
 * 显示天气质量信息的每一个信息的组件
 */


import React,{Component} from 'react'
import {StyleSheet, View, Text, Image, StatusBar, ScrollView, RefreshControl, DrawerLayoutAndroid,ImageBackground} from 'react-native';

import weatherStore from '../storage/weather_store'
import Divider from  '../component/divider'
export default class AirQualityItem extends Component{

    //构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render(){
        if (weatherStore.loading) {
            return this._renderLoading();
        }else {
            return this._renderContent();
        }
    }

    _renderContent = () => {
        return (
            <View style={styles.container}>
                <View style={styles.columnItem}>
                    <Text style={styles.textTop}>CO</Text>
                    <Text style={styles.textTop}>0.6</Text>
                </View>
                <View style={styles.columnItem}>
                    <Text style={styles.textBottom}>一氧化碳</Text>
                    <Text style={styles.textBottom}>mg/m³</Text>
                </View>
                    <Divider marginLeftValue={10} marginRightValue={10} marginTopValue={5} backgroundColorValue={'rgba(255,255,255,0.1)'}/>
            </View>
        )
    }


    //输出正在加载的界面
    _renderLoading= () =>{

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    columnItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
    textTop: {
        fontSize:15,
        color: 'white'
    },
    textBottom:{
        color:'rgba(255,255,255,0.7)',
        fontSize:12
    },
});