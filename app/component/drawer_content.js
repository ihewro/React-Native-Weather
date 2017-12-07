/**
 * 侧边栏内容组件
 */


import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, StatusBar, ScrollView, TouchableNativeFeedback,TouchableOpacity, FlatList,ImageBackground} from 'react-native';
import {observer} from 'mobx-react/native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'

import AppStyle from '../styles/index'
import Swipeout from 'react-native-swipeout'
import Divider from '../component/divider'


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

        return(

            <TouchableNativeFeedback>
                <View style={styles.cityItem}>
                    <View style={styles.cityItemName}>
                        <Icon name={'location-pin'} size={15}/>
                        <Text>昌平</Text>
                    </View>
                    <View style={styles.cityItemTemp}>
                        <Text>6°</Text>
                        <Icon2 name={'ios-sunny'} size={20} color={'#ffda00'}/>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )

    };

    render(){
        return(
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

                <FlatList
                    data={[{key: 'a'}, {key: 'b'}]}
                    renderItem={this._renderCityItem}
                />
                <Divider backgroundColorValue={'rgba(237,241,242,0.3)'}/>
                <ImageBackground style={styles.menuButton}>


                    <TouchableNativeFeedback>
                        <View style={styles.menuBottomItem}>
                            <Icon2 name={'ios-settings-outline'}  size={22} color={'#999999'}/>
                            <Text style={styles.menuBottomItemText}>设置</Text>
                        </View>
                    </TouchableNativeFeedback>


                    <View style={{width:1,height:50,backgroundColor:'rgba(237,241,242,0.5)'}}/>

                    <TouchableNativeFeedback>
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
        justifyContent: 'flex-end'
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