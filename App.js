/**
 * @name Simple Weather
 * @description
 * @author 何炜 陈弘扬
 */

import { StackNavigator } from 'react-navigation';

import {WeatherScreen} from './app/screen/WeatherScreen'

const RootNavigator = StackNavigator({
    WeatherScreen: {
        screen: WeatherScreen,
    },
});

export default RootNavigator;