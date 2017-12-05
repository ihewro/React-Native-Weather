/**
 * 天气界面的头部
 */

import React, {Component} from 'react'

import {StyleSheet, View, Text, Image, StatusBar} from 'react-native';


export default class WeatherHeader extends Component{

    //构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render(){
        return this._renderWeatherHeader();
    }

    _renderWeatherHeader = () =>{
        return(
            <View style={styles.contentContainer}>
                <Text style={styles.number}>-23° </Text>
                <View style={styles.details}>
                    <Text style={styles.smallNumber}>多云</Text>
                    <Text style={styles.smallNumber}>体感温度 -30°</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({


    number: {
        fontSize:60,
        color: '#ffffff'
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    details:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    smallNumber: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12
    },
});
