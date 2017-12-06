/**
 * 侧边栏内容组件
 */


import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, StatusBar, ScrollView, TouchableNativeFeedback, ListView} from 'react-native';
import {observer} from 'mobx-react/native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import AppStyle from '../styles/index'
import Swipeout from 'react-native-swipeout'
import Divider from '../component/divider'

export default class Menu extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    //flatList的每一项的渲染
    _renderCityItem = (item) =>{

    };

    render(){
        return(
            <View style={styles.drawerContainer}>
                <Image
                    style={styles.menuImage}
                    source={require('../assets/menu_bg.jpg')}
                />
                <Image source={require('../assets/divider.jpg')} style={styles.imageDivider}/>
                <TouchableNativeFeedback
                    onPress={this._onPressAddCity}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.addCityView}>
                        <Text style={styles.addCityText}>添加城市</Text>
                    </View>
                </TouchableNativeFeedback>
                <Image source={require('../assets/divider.jpg')} style={styles.imageDivider}/>

                <Divider/>

            </View>
        )
    }

    _onPressAddCity = () =>{

    }

}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },

    menuImage:{
        width:320,
        height:220
    },
    addCityView:{
        padding: 15
    },
    addCityText:{
        fontSize: 16
    },
    imageDivider:{
        height:3,
    }
});