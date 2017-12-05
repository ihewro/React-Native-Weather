import React, { Component } from 'react';
import { View, StyleSheet, NativeModules, findNodeHandle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UIManager = NativeModules.UIManager;

export default class ToolbarDropdown extends Component {
    onMenuPressed = (labels) => {
        const { onPress } = this.props;

        UIManager.showPopupMenu(
            findNodeHandle(this.menu),
            labels,
            () => {},
            (result, index) => {
                if (onPress) {
                    onPress({ action: 'menu', result, index });
                }
            },
        );
    };

    render() {
        const { labels } = this.props;

        return (
            <View style={{flexDirection: 'row'}}>
                <View>
                    <View
                        ref={c => this.menu = c}
                        style={{
                            backgroundColor: 'transparent',
                            width: 1,
                            height: StyleSheet.hairlineWidth,
                        }}
                    />
                    <MaterialIcons
                        name="more-vert"
                        onPress={() => this.onMenuPressed(labels)}
                        style={{ marginRight: 10, color: 'white' }}
                        size={30}
                    />
                </View>
            </View>
        )
    }
}