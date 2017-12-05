/**
 *  显示当天24小时天气的自定义组件
 */

import React,{Component} from 'react'
import {StyleSheet, View, Text, Image,FlatList} from 'react-native';
import Divider from '../component/divider'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AppStyle from '../styles/index';

export default class WeatherCurrent extends Component{

    render () {
        return(
            <View >
                <Text style={AppStyle.smallNumber}>10分钟前更新</Text>
                <Divider/>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={[{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'},{key: 'a'}, {key: 'b'}]}
                    renderItem={this._renderItem}
                    horizontal = {true}
                    style={styles.currentWeatherFlatList}
                />
            </View>
        )
    }
    _renderItem = () =>{
        return (
            <View style={styles.futureItem}>
                <View style={styles.textContainer}>
                    <Text style={styles.date}>今天</Text>
                </View>
                <View style={styles.textContainer}>
                    <Icon name='wb-sunny' color={'#ffe603'} size={35}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.temperature}>2°</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({


    futureItem: {
        flex: 1,
        marginRight: 30

    },
    currentWeatherFlatList:{
        padding: 10
    },
    textContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    date:{
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 10
    },
    temperature:{
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        marginTop: 10,
        justifyContent: 'center'
    }
});

