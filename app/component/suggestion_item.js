/**
 * 生活质量建议的每一项的item
 */

import React,{Component} from 'react'
import {StyleSheet, View, Text, Image, StatusBar, ScrollView, RefreshControl, DrawerLayoutAndroid,ImageBackground} from 'react-native';
import Divider from "./divider";
import Icon from 'react-native-vector-icons/Ionicons'
import {observer} from 'mobx-react/native'
import weatherStore from "../storage/weather_store";

@observer
export default class SuggestionItem extends Component{

    //构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render(){
        let lifeList = weatherStore.lifeList;
        if (lifeList.length !== 7){
            return this._renderLoadingView()
        }else{
            return this._renderContent();
        }
    }


    _renderContent = () => {
        let lifeList = weatherStore.lifeList;
        //console.log("生活指数" + JSON.stringify(lifeList));
        let index = this.props.index;
        let marginLeftValue = 0;
        if (index === 4 ){
            marginLeftValue = 10;
        }
        return (
            <View style={[styles.container]}>
                <View style={styles.itemIcon}>
                    <Icon name={suggestionItemIcon[index]} size={40} color={'#ffffff'} />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.text}>{lifeList[index].type}:{lifeList[index].brf}</Text>
                    <Text style={[styles.text, styles.textBottom]}>{lifeList[index].txt}</Text>
                </View>
                <Divider marginLeftValue={20} marginRightValue={20} marginTopValue={5}/>
            </View>
        )
    };

    _renderLoadingView =() => {

        return (
            <View style={styles.container}>
                <View style={styles.itemIcon}>
                    <Icon name={'ios-ionitron-outline'} size={40} color={'#ffffff'} />
                </View>
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
        marginTop:25,
        marginLeft: 15
    },
    contentContainer:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',

    },
    text: {
        flex: 1,
        marginLeft: 20,
        marginTop: 5,
        color:'white',
        fontSize:15
    },
    textBottom:{
        color:'rgba(255,255,255,0.8)',
        fontSize:13
    },
    itemIcon:{
        height: 45,
        width: 45,
        justifyContent:'flex-start'
    }
});

const suggestionItemIcon = ['ios-ionitron-outline','ios-car-outline','ios-body-outline','ios-thermometer-outline','ios-bicycle-outline','ios-boat-outline','ios-partly-sunny-outline'];


