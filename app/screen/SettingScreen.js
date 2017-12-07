/*
 * 设置界面
 */

import React, {Component} from 'react'
import {Text, View, StyleSheet, StatusBar, ScrollView, Switch, TouchableNativeFeedback} from 'react-native'

import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Divider from '../component/divider'

export class SettingScreen extends Component{
    static navigationOptions = {
        title: '设置',
        headerStyle: {
            backgroundColor: 'black',
            marginTop: 20
        },
        headerTintColor: 'white'
    };

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="black"
                    barStyle="light-content"
                />
                <ScrollView>
                    <View style={{flex: 1,backgroundColor:'rgb(239,238,244)'}}>
                        <View style={[styles.itemContainer,{marginTop:20}]}>
                            <Text style={styles.text}>自动定位</Text>
                            <Switch style={styles.itemRight}/>
                        </View>
                        <Divider dividerHeight={1}/>
                        <View style={styles.itemContainer}>
                            <Text style={styles.text}>自动语音播报</Text>
                            <Switch style={styles.itemRight} />
                        </View>
                        <Divider dividerHeight={1}/>
                        <TouchableNativeFeedback >
                            <View style={styles.itemContainer}>
                                <Text style={styles.text}>清除缓存</Text>
                                <Icon name='arrow-right' color={'rgb(54,57,66)'} size={15}
    style={{backgroundColor: 'transparent', marginRight: 20}}/>
                            </View>
                        </TouchableNativeFeedback>

                        <Divider dividerHeight={1}/>
                        <TouchableNativeFeedback >
                            <View style={[styles.itemContainer,{marginTop:40}]}>
                                <Text style={styles.text}>开源协议</Text>
                                <Icon name='arrow-right' color={'rgb(54,57,66)'} size={15}
        style={{backgroundColor: 'transparent', marginRight: 20}}/>
                            </View>
                        </TouchableNativeFeedback>
                        <Divider dividerHeight={1}/>
                        <TouchableNativeFeedback >
                            <View style={styles.itemContainer}>
                                <Text style={styles.text}>当前版本</Text>
                                <Text style={[styles.text,{marginRight:20}]}>V1.0.0</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <Divider dividerHeight={1} backgroundColorValue={'rgba(237,241,242,0.3)'}/>
                    </View>

                </ScrollView>
            </View>
        )
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
