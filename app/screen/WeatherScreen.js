/**
 * @name Simple Weather
 * @description
 * @author 何炜 陈弘扬
 */

import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,ImageBackground,StatusBar,ScrollView,RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Divider from '../component/divider'

import WeatherHeader from '../component/weather_header'
import WeatherCurrent from '../component/weather_current'

import WeatherFuture from '../component/weather_future'


export class WeatherScreen extends Component {

    static navigationOptions = {
        title: '北京',
        headerStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            height: 50,
            top: 20,
            left: 0,
            right: 0,
        },
        headerTintColor: '#fff',
        headerMode: 'none',
        headerRight: ( <Icon name='more-vert' color={'#ffffff'} size={24} style={{marginRight:10,marginBottom: 5}}></Icon> ),
        headerTitleStyle: {fontWeight: 'normal'}
    };

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
            selectedItem: 'About',
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onMenuItemSelected = item =>
        this.setState({
            isOpen: false,
            selectedItem: item,
        });
    _refreshWeatherData = () => {
        //weatherStore.requestWeatherByName(weatherStore.currentCityName);
    };
    render() {
        //const {navigate} = this.props.navigation;
        return (
            <View style={styles.transparentBackground}>
                <Image style={styles.bgImage} source={require('../assets/bg.png')}/>
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>

                    <ScrollView
                        style={styles.scrollViewContainer}
                        scrollEventThrottle={200}
                        showsVerticalScrollIndicator={false}
                    >
                        <WeatherHeader/>
                        <WeatherCurrent/>
                        <WeatherFuture/>
                    </ScrollView>
                </View>

            </View>
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
    }
});
