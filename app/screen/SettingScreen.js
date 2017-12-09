/*
 * 设置界面
 */

import React, {Component} from 'react'
import {Text, View, StyleSheet, StatusBar, ScrollView, Switch, TouchableNativeFeedback,TouchableHighlight,Platform,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Divider from '../component/divider'
import storage from '../config/storage_config'
import Snackbar from 'react-native-snackbar';
import stateStore from "../storage/state_store";
import weatherStore from "../storage/weather_store";

export class SettingScreen extends Component{
    static navigationOptions = {
        title: '设置',
        headerStyle: {
            backgroundColor: '#4db6ac',
            marginTop: (__ANDORID__) ? 20 : 0,
            elevation: 0
        },
        headerTintColor: 'white'
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    _cleanStorage = () => {
        storage.clearMap();
        stateStore.cityList = [];
        Snackbar.show({
            title: '清除缓存成功',
            duration: Snackbar.LENGTH_SHORT,
            action: {
                title: '知道了',
                color: 'green',
                onPress: () => {
                    //前往github下载最新版本

                },
            },
        });
    };


    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="#00897b"
                    barStyle="light-content"
                />
                <ScrollView>
                    {(__ANDORID__)?this._renderAndroidColumn():this._renderIOSColumn()}

                </ScrollView>
            </View>
        )
    }


    _renderIOSColumn =() => {
        return (
            <View style={{flex: 1,backgroundColor:'rgb(239,238,244)'}}>
                <TouchableHighlight
                    underlayColor={pressButtonColor}
                    onPress={this._cleanStorage}>
                    <View style={[styles.itemContainer,{marginTop:20}]}>
                        <Text style={styles.text}>清除缓存</Text>
                        <Icon name='ios-arrow-forward' color={'rgb(54,57,66)'} size={15}
                              style={{backgroundColor: 'transparent', marginRight: 20}}/>
                    </View>
                </TouchableHighlight>
                <Divider dividerHeight={1}/>
                <TouchableHighlight
                    onPress={this._checkUpdate}
                    underlayColor={pressButtonColor}>
                    <View style={[styles.itemContainer,{marginTop:20}]}>
                        <Text style={styles.text}>当前版本</Text>
                        <Text style={[styles.text,{marginRight:20}]}>V{__CURRENT_VERSION__}</Text>
                    </View>
                </TouchableHighlight>
                <Divider dividerHeight={1} backgroundColorValue={'rgba(237,241,242,0.3)'}/>
            </View>
        );
    };

    _renderAndroidColumn = () => {
        return (
            <View style={{flex: 1,backgroundColor:'rgb(239,238,244)'}}>
                <TouchableNativeFeedback onPress={this._cleanStorage}>
                    <View style={[styles.itemContainer,{marginTop:20}]}>
                        <Text style={styles.text}>清除缓存</Text>
                        <Icon name='ios-arrow-forward' color={'rgb(54,57,66)'} size={15}
                              style={{backgroundColor: 'transparent', marginRight: 20}}/>
                    </View>
                </TouchableNativeFeedback>
                <Divider dividerHeight={1}/>
                <TouchableNativeFeedback onPress={this._checkUpdate}>
                    <View style={[styles.itemContainer,{marginTop:20}]}>
                        <Text style={styles.text}>当前版本</Text>
                        <Text style={[styles.text,{marginRight:20}]}>V{__CURRENT_VERSION__}</Text>
                    </View>
                </TouchableNativeFeedback>
                <Divider dividerHeight={1} backgroundColorValue={'rgba(237,241,242,0.3)'}/>
            </View>
        );
    }

    _checkUpdate = () => {
        if (weatherStore.checkingUpdate){
            Snackbar.show({
                title: '正在检查更新……',
                duration: Snackbar.LENGTH_INDEFINITE,
            });
        }
        fetch('https://api.github.com/repos/ihewro/React-Native-Weather/releases/latest',{timeout:3000})
            .then((response) => {//数据解析方式
                if (response.ok){
                    return response.json();
                }
            })
            .then((responseJson) => {//处理数据
                if (this._versionCompare(__CURRENT_VERSION__,responseJson.tag_name)){
                    weatherStore.checkingUpdate = false;
                    Snackbar.show({
                        title: '最新版本为' + responseJson.tag_name,
                        duration: Snackbar.LENGTH_INDEFINITE,
                        action: {
                            title: '前往更新',
                            color: 'green',
                            onPress: () => {
                                //前往github下载最新版本

                            },
                        },
                    });
                }else {
                    weatherStore.checkingUpdate = false;
                    Snackbar.show({
                        title: '当前是最新版本',
                        duration: Snackbar.LENGTH_INDEFINITE,
                        action: {
                            title: '知道了',
                            color: 'green',
                            onPress: () => {
                                //前往github下载最新版本
                            },
                        },
                    });
                }
                //return responseJson.movies;
            })
            .catch((error) => {
                weatherStore.checkingUpdate = false;
                Snackbar.show({
                    title: '检查更新失败，请稍后再试',
                    duration: Snackbar.LENGTH_INDEFINITE,
                    action: {
                        title: '知道了',
                        color: 'green',
                        onPress: () => { /* Do something. */ },
                    },
                });
                //console.error(error);
            });
    };

    _versionCompare =  (currVer, promoteVer) => {
        currVer = currVer || "0.0.0";
        promoteVer = promoteVer || "0.0.0";
        if (currVer === promoteVer) return false;
        let currVerArr = currVer.split(".");
        let promoteVerArr = promoteVer.split(".");
        let len = Math.max(currVerArr.length, promoteVerArr.length);
        for (let i = 0; i < len; i++) {
            let proVal = ~~promoteVerArr[i],
                curVal = ~~currVerArr[i];
            if (proVal < curVal) {
                return false;
            } else if (proVal > curVal) {
                return true;
            }
        }
        return false;
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        marginLeft: 20,
        fontSize: 15
    },

    itemContainer: {
        flexDirection: 'row',
        height: 53,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    itemRight: {
        marginRight: 20
    }
});
