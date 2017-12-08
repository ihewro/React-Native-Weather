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
        let backgroundColorValue = this.props.backgroundColorValue;
        let marginLeftValue = this.props.marginLeftValue;
        let marginRightValue = this.props.marginRightValuel;
        let marginTopValue = this.props.marginTopValue;

        if (dividerHeight == null){
            dividerHeight = 1;
        }
        if (backgroundColorValue == null){
            backgroundColorValue = 'rgba(255,255,255,0.2)';
        }
        if (marginLeftValue == null){
            marginLeftValue = 0;
        }
        if (marginRightValue == null){
            marginRightValue = 0;
        }
        if (marginTopValue == null){
            marginTopValue = 0;
        }
        return (
            <View style={{height:dividerHeight,backgroundColor: backgroundColorValue,marginLeft: marginLeftValue,marginRight: marginRightValue, marginTop: marginTopValue}}>
            </View>
        )
    }
}
