/**
 * 天气界面之未来天气的组件
 */

import React,{Component} from 'react'
import {StyleSheet, View, Text, Image,FlatList} from 'react-native';
import Divider from '../component/divider'
import Icon from 'react-native-vector-icons/MaterialIcons'


export default class WeatherFuture extends Component{

    render () {
        return(
            <View >
                <Divider/>
                <FlatList
                    data={[{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'},{key: 'b'},{key: 'a'}]}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
    _renderItem = () =>{
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={[styles.text,{marginLeft:15}]}>12月5日</Text>
                    <Text style={[styles.text,{marginLeft:5}]}>今天</Text>
                </View>
                <View style={[styles.textContainer,{justifyContent:'center'}]}>
                    <Icon name='wb-sunny' color={'#ffe603'} size={35}/>
                    <Text style={[styles.text,{alignSelf:'center',marginLeft:5}]}>多云</Text>
                </View>
                <View style={[styles.textContainer,{justifyContent:'flex-end'}]}>
                    <Text style={[styles.text,{marginRight:15}]}>-4~7°C</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },


    textContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'row'
    },

    text: {
        fontSize: 15,
        color: 'white',
    }


}