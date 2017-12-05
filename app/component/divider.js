/**
 * 绘制分割线的自定义组件
 */
import React, {Component} from 'react'
import {observer} from 'mobx-react/native'
import {StyleSheet, View, Text, Image} from 'react-native';


export default class Divider extends Component{

    // 构造函数
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

    }

    render() {
        let dividerHeight = this.props.dividerHeight;
        let backgroundColorValue = this.props.backgroundColor;

        if (dividerHeight == null){
            dividerHeight = 1;
        }
        if (backgroundColorValue == null){
            backgroundColorValue = 'rgba(255,255,255,0.2)';
        }
        return (
            <View style={{height:dividerHeight,backgroundColor: backgroundColorValue}}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:1,
        backgroundColor: 'rgba(255,255,255,0.2)'
    }
});