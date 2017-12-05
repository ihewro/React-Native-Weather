/**
 * 生活质量建议的每一项的item
 */

import React,{Component} from 'react'
import {StyleSheet, View, Text, Image, StatusBar, ScrollView, RefreshControl, DrawerLayoutAndroid,ImageBackground} from 'react-native';
import Divider from "./divider";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class SuggestionItem extends Component{

    //构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon name={'pill'} size={40} color={'#ffffff'} />
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>感冒指数:易发</Text>
                    <Text style={[styles.text, styles.textBottom]}>感冒容易发生，少去人群密集的场所有利于降低感冒的几率。</Text>
                </View>
                <Divider marginLeftValue={20} marginRightValue={20} marginTopValue={5}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginTop:25
    },
    contentContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',

    },
    text: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        color:'white',
        fontSize:15
    },
    textBottom:{
        color:'rgb(230,230,230)',
        fontSize:13
    },
});

