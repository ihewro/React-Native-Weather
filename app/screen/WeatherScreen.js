/**
 * @name Simple Weather
 * @description
 * @author 何炜 陈弘扬
 */

import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,ImageBackground,StatusBar,ScrollView,RefreshControl,NativeModules} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Divider from '../component/divider'

import DrawerLayout from 'react-native-drawer-layout';


import NavigationHeader from '../component/header_navigation'
import Menu from '../component/drawer_content'
import WeatherHeader from '../component/weather_header'
import WeatherCurrent from '../component/weather_current'
import WeatherFuture from '../component/weather_future'
import AirCondition from '../component/air_condition'
import LifeSuggestion from '../component/life_suggestion'
import WeatherFooter from '../component/weather_footer'

export class WeatherScreen extends Component {



    static navigationOptions = {
        title: '北京',
        headerStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            height: 50,
            top: 20,
            left: 20,
            right: 0,
        },
        headerTintColor: '#fff',
        headerMode: 'none',
        headerTitleStyle: {fontWeight: 'normal'},
        header: null
    };



    constructor(props) {
        super(props);


        this.state = {
            isOpen: false,
            selectedItem: 'About',
        };
    }


    //关闭侧边栏
    _closeControlPanel = () => {
        this.refs.drawer.closeDrawer();
    };
    //开启侧边栏
    _openControlPanel = () => {
        this.refs.drawer.openDrawer();
    }
    _closeDrawer = () => {
        alert('hello')
    }

    _refreshWeatherData = () => {
        //weatherStore.requestWeatherByName(weatherStore.currentCityName);
    };


    render() {
        var navigation = this.props.navigation;

        return (
            <DrawerLayout
                drawerWidth={320}
                ref="drawer"
                drawerPosition={DrawerLayout.positions.Left}
                renderNavigationView={()=><Menu callback={this._closeDrawer} navigation={navigation} />}>
                <View style={styles.transparentBackground}>
                    <Image style={styles.bgImage} source={require('../assets/bg.png')}/>
                    <View style={styles.headerTop}>
                        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
                        <View style={styles.contentContainer}>
                            <TouchableOpacity onPress={this._openControlPanel}>
                                <Icon name='menu' color={'white'} size={20} style={{backgroundColor:'transparent'}}></Icon>
                            </TouchableOpacity>
                            <View style={styles.cityContainer}>
                                <Text style={styles.title}>北京</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <ScrollView
                            style={styles.scrollViewContainer}
                            scrollEventThrottle={200}
                            showsVerticalScrollIndicator={false}
                        >
                            <WeatherHeader/>
                            <WeatherCurrent/>
                            <WeatherFuture/>
                            <AirCondition/>
                            <LifeSuggestion/>
                            <WeatherFooter/>
                        </ScrollView>
                    </View>
                </View>
            </DrawerLayout>
        );
    }
}


const styles = StyleSheet.create({
    bgImage: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:null,
        width:null,
        //不加这句，就是按照屏幕高度自适应
        //加上这几，就是按照屏幕自适应
        //resizeMode:Image.resizeMode.contain,
        //祛除内部元素的白色背景
    },
    transparentBackground:{
        flex:1,
        backgroundColor: 'transparent'
    },
    scrollViewContainer:{
        paddingLeft:10,
        paddingRight:10
    },
    container: {
        position: 'absolute',//相对父元素进行绝对定位
        top: 200,
        bottom:0
    },
    contentContainer:{
        flex: 1,
        flexDirection: 'row',
    },
    headerTop: {
        position: 'absolute',//相对父元素进行绝对定位
        top: 40,
        left:20,
        bottom:0,
        height:50
    },

    title: {
        fontSize: 18,
        color: 'white',
        backgroundColor: 'transparent'
    },

    cityContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginLeft:20,
        marginTop: -2
    }
});

