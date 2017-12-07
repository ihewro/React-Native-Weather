/**
 * 生活质量建议
 */

import React,{Component} from 'react'
import {StyleSheet, View, Text, Image, StatusBar, ScrollView, RefreshControl, DrawerLayoutAndroid,ImageBackground} from 'react-native';
import AppStyle from '../styles/index';
import SuggestionItem from '../component/suggestion_item'
import Divider from "./divider";

import {observer} from 'mobx-react/native'

@observer
export default class LifeSuggestion extends Component{

    //构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={AppStyle.smallNumber}>气象指数</Text>
                <Divider/>
                <SuggestionItem index={0}/>
                <SuggestionItem index={1}/>
                <SuggestionItem index={2}/>
                <SuggestionItem index={3}/>
                <SuggestionItem index={4}/>
                <SuggestionItem index={5}/>
                <SuggestionItem index={6}/>
            </View>
        )
    }
}
const styles = {
    container: {
        flex: 1,
        backgroundColor:'transparent',
        marginTop:20
    },
    text: {
        fontSize: 15,
        color: 'white',
        flex: 1,
        backgroundColor: 'transparent'
    },

}