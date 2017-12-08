/**
 * 侧边栏内容组件
 */


import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, StatusBar, ScrollView, TouchableNativeFeedback, FlatList,ImageBackground,ListView} from 'react-native';
import {observer} from 'mobx-react/native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'

import AppStyle from '../styles/index'
import Swipeout from 'react-native-swipeout'
import Divider from '../component/divider'
import Picker from 'react-native-picker';
import CITY from '../util/cityData'
import stateStore from '../storage/state_store'
import weatherStore from "../storage/weather_store";


@observer
export default class Menu extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    //flatList的每一项的渲染
    _renderCityItem = (item) =>{

        console.log("当前城市的数据（侧边栏）" + JSON.stringify(item));
        // Buttons
        var swipeOutBtn = [
            {
                text: '删除',
                onPress: () => {
                    stateStore.removeCityByName(item.cityName);
                    alert("删除成功");
                }
            }
        ];
        let callback = this.props.callback;
        let iconUrl = item.iconUrl;

        return(
            <Swipeout left={swipeOutBtn}
                      backgroundColor={'#ffffff'}
                      autoClose={true}
            >
                <TouchableNativeFeedback
                onPress={()=>{
                    weatherStore.changeCurrentCityName(item.cityName);
                    callback();
                }}>
                    <View style={styles.cityItem}>
                        <View style={styles.cityItemName}>
                            <Icon name={'location-pin'} size={0}/>
                            <Text>{item.cityName}</Text>
                        </View>
                        <View style={styles.cityItemTemp}>
                            <Text>{item.tmp}</Text>
                            <Image style={{tintColor:'#F8E6B5',width: 25,height: 25,marginLeft:5,alignItems:'center',marginBottom:3}} source={{uri: iconUrl}}/>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </Swipeout>
        )
    };


    render(){
        /*console.log("本地的城市列表数组大小" + stateStore.cityList.length );
        for(let i =0; i< stateStore.cityList.length;i++){
            console.log(JSON.stringify(stateStore.cityList[i]));
        }*/
        return this._renderCityList(stateStore.cityList);
    }

    _renderMenuTop = () => {

    };

    _renderCityList = (dataSource) => {
        let navigation = this.props.navigation;
        console.log("本地的城市列表数组大小" + dataSource.length );
        return (
            <View style={styles.drawerContainer}>
                <Image
                    style={styles.menuImage}
                    source={require('../assets/menu_bg.jpg')}
                />
                <Divider backgroundColorValue={'rgba(237,241,242,0.3)'}/>
                <TouchableNativeFeedback
                    onPress={this._onPressAddCity}
                    background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={styles.addCityView}>
                        <Text style={styles.addCityText}>添加城市</Text>
                        <Icon2 name={'ios-add-outline'} size={20} color={'#f6e4ab'}/>
                    </View>
                </TouchableNativeFeedback>
                <Divider backgroundColorValue={'rgba(237,241,242,0.6)'}/>

                <ListView
                    dataSource={stateStore.cityDataSource}
                    renderRow={this._renderCityItem}>
                </ListView>
                <Divider backgroundColorValue={'rgba(237,241,242,0.3)'}/>
                <ImageBackground style={styles.menuButton}>

                    <TouchableNativeFeedback onPress={()=>navigation.navigate('SettingScreen')}>
                        <View style={styles.menuBottomItem}>
                            <Icon2 name={'ios-settings-outline'}  size={22} color={'#999999'}/>
                            <Text style={styles.menuBottomItemText}>设置</Text>
                        </View>
                    </TouchableNativeFeedback>


                    <View style={{width:1,height:50,backgroundColor:'rgba(237,241,242,0.5)'}}/>

                    <TouchableNativeFeedback onPress={()=>navigation.navigate('AboutScreen')}>
                        <View style={styles.menuBottomItem}>
                            <Icon2 name={'ios-heart'}  size={22} color={'#999999'}/>
                            <Text style={styles.menuBottomItemText}>关于</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={{width:1,height:50,backgroundColor:'rgba(237,241,242,0.5)'}}/>

                    <TouchableNativeFeedback>
                        <View style={styles.menuBottomItem}>
                            <Icon2 name={'ios-exit-outline'}  size={22} color={'#999999'}/>
                            <Text style={styles.menuBottomItemText}>退出</Text>
                        </View>
                    </TouchableNativeFeedback>

                </ImageBackground>


            </View>
        )
    };

    _renderMenuBottom = () => {

    }

    _onPressAddCity = () =>{


        Picker.init({
            pickerTitleText: '选择城市',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText: '确定',
            pickerData: CITY,
            selectedValue: ['北京市','北京市',1],
            onPickerConfirm: (selectedValue) => {
                //去掉最后一个字，比如县，比如区，以便能够查询天气
                let cityName = selectedValue[2].substring(0,selectedValue[2].length - 1);
                weatherStore.requestWeatherByName(cityName);
                console.log(cityName);
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }
        });
        Picker.show();
    }

}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },

    menuImage:{
        width:330,
        height:220
    },
    addCityView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    addCityText:{
        fontSize: 16
    },
    imageDivider:{
        height:3,
    },
    cityItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cityItemName:{
        flexDirection: 'row',
        padding: 15,
        alignItems:'center'
    },
    cityItemTemp:{
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'flex-end',
        alignItems:'center'
    },
    normalText: {
        fontSize: 15,
        color: 'white'
    },
    menuButton:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height:70,
        backgroundColor: '#ffffff'

    },
    menuBottomItem:{
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        width:110,
        height:70
    },
    menuBottomItemText:{
        fontSize: 8,
        marginTop: 5,
        color:'#999999'
    }
});