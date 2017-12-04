/**
 * @name Simple Weather
 * @description
 * @author 何炜 陈弘扬
 */

import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:null,
        width:null,
        //不加这句，就是按照屏幕高度自适应
        //加上这几，就是按照屏幕自适应
        //resizeMode:Image.resizeMode.contain,
        //祛除内部元素的白色背景
        backgroundColor:'rgba(0,0,0,0)',
    },
    transparentBackgroud:{
        flex:1,
        backgroundColor: 'transparent'
    }
});


export class WeatherScreen extends Component {

    static navigationOptions = {
        title: '简天气',
        headerStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            height: 50,
            top: 0,
            left: 0,
            right: 0,
        },
        headerTintColor: '#fff',
        headerMode: 'none',
        headerRight: ( <Icon name='more-vert' color={'white'} size={24} style={{backgroundColor:'transparent',marginRight:10,marginBottom: 5}}></Icon> )
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

    render() {
        //const {navigate} = this.props.navigation;
        return (
            <View style={styles.transparentBackgroud}>
                <Image style={styles.container} source={require('../assets/bg.png')}/>
            </View>
        );
    }
}