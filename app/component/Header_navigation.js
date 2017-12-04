/*
 * 顶部toolbar
 */

import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, StatusBar, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import {observer} from 'mobx-react/native';
import {StackNavigator,} from 'react-navigation';

@observer
export default class NavigationHeader extends Component {

    render(){
        return(

            <View>
                <StatusBar translucent={true} barStyle={'light-content'}></StatusBar>

            </View>
        );
    }
}