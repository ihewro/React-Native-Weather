/*
 * 设置界面
 */

import React, {Component} from 'react'
import {Text, View, StyleSheet, StatusBar, ScrollView, Switch, TouchableNativeFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Divider from '../component/divider'
import storage from '../config/storage_config'
export class SettingScreen extends Component{
    static navigationOptions = {
        title: '设置',
        headerStyle: {
            backgroundColor: '#4db6ac',
            marginTop: 20,
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
        alert("清除成功");
    };


    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="#00897b"
                    barStyle="light-content"
                />
                <ScrollView>
                    <View style={{flex: 1,backgroundColor:'rgb(239,238,244)'}}>
                        <TouchableNativeFeedback onPress={this._cleanStorage}>
                            <View style={[styles.itemContainer,{marginTop:20}]}>
                                <Text style={styles.text}>清除缓存</Text>
                                <Icon name='arrow-right' color={'rgb(54,57,66)'} size={15}
    style={{backgroundColor: 'transparent', marginRight: 20}}/>
                            </View>
                        </TouchableNativeFeedback>
                        <Divider dividerHeight={1}/>
                        <TouchableNativeFeedback >
                            <View style={[styles.itemContainer,{marginTop:20}]}>
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
