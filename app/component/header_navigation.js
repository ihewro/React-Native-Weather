/*
 * 顶部toolbar
 */

import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {observer} from 'mobx-react/native';
import {StackNavigator,} from 'react-navigation';

@observer
export default class NavigationHeader extends Component {

    render(){
        return(

            <View style={styles.headerTop}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={()=>this.props.onPress()}>
                        <Icon name='md-menu' color={'white'} size={20} style={{backgroundColor:'transparent'}}></Icon>
                    </TouchableOpacity>
                    <View style={styles.cityContainer}>
                        <Text style={styles.title}>北京</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
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
}