/**
 * @name Simple Weather
 * @description
 * @author 何炜 陈弘扬
 */

import { StackNavigator } from 'react-navigation';
import {WeatherScreen} from './app/screen/WeatherScreen'
import {SettingScreen} from "./app/screen/SettingScreen";
import {AboutScreen} from "./app/screen/AboutScreen";

const RootNavigator = StackNavigator({
    WeatherScreen: {
        screen: WeatherScreen,
    },
    SettingScreen: {
        screen: SettingScreen
    },
    AboutScreen: {
        screen: AboutScreen
    }
});

export default RootNavigator;