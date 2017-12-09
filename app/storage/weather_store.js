/*
* 天气的信息获取与存储
* */

import { observable, computed, asMap, autorun} from 'mobx';
import { ListView} from 'react-native';
import WeatherModel from '../model/weather_info'
import stateStore from '../storage/state_store'
import SuggestionInfo from '../model/suggestion_info'
import AqiItem from "../model/aqi_item_info";
import CityItemInfo from '../model/city_item'
import ApiConfig from '../config/index_config'
import Snackbar from 'react-native-snackbar';

class WeatherStore{

    @observable weatherMap = observable.map();//observable提供了数据结构，存储天气名称——天气数据的集合。
    @observable currentCityName = '北京';//当前的天气名称
    @observable aqiList = [];//空气指数/质量
    @observable lifeList = [];//生活指数/建议
    @observable loading = true;//指示数据是否正在加载
    @observable refreshTime = '19:00';//刷新时刻的时间
    @observable checkingUpdate = true;


    /**
     * 改变当前城市名，获取城市天气的数据，必须先判断本地是否已经存储了数据。
     * @param name
     */
    changeCurrentCityName(name) {
        this.currentCityName = name;
        if (this.getCurrentCityWeather() !== null) {
            this.convertSuggestionList(this.getCurrentCityWeather());
            this.convertAqiToList(this.getCurrentCityWeather());
        } else {
            this.requestWeatherByName(name);
        }
    }


    /**
     * 根据城市名称获取天气
     * @param name
     */
    requestWeatherByName(name){
        //console.log("开启网络请求天气数据");
        this.loading = true;

        return fetch("https://free-api.heweather.com/v5/weather?key=19713447578c4afe8c12a351d46ea922&city=" + name,{timeout: 3000})
            .then((response) => {//数据解析方式
                if (response.ok){
                    return response.json();
                }
            })
            .then((jsonData) => {//对获取到的数据进行处理
                let weatherData = jsonData.HeWeather5[0];
                //解析天气的信息
                this.changeCurrentCityName(weatherData.basic.city);
                //存储当前城市数据
                this.saveWeatherData(jsonData);
                //加载完成
                this.loading = false;
                //console.log("获取天气成功，结束当前网络请求天气数据");
            })
            .catch((error) => {//错误信息处理
                this.loading = false;
                Snackbar.show({
                    title: '网络请求失败，请稍后再试',
                    duration: Snackbar.LENGTH_SHORT,
                    action: {
                        title: '知道了',
                        color: 'green',
                        onPress: () => { /* Do something. */ },
                    },
                });
                console.log("获取天气数据失败，结束当前网络请求天气数据" + error);
            })
    };

    timeoutPromise(ms, promise) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new Error("promise timeout"))
            }, ms);
            promise.then(
                (res) => {
                    clearTimeout(timeoutId);
                    resolve(res);
                },
                (err) => {
                    clearTimeout(timeoutId);
                    reject(err);
                }
            );
        })
    }

    /**
     * 对获取到的json数据进行处理
     * @param jsonData
     */
    saveWeatherData = (jsonData) => {

        let weatherData = jsonData.HeWeather5[0];

        this.weatherMap.set(weatherData.basic.city, new WeatherModel(weatherData));//键值对：城市——>天气信息

        //获取空气指数信息
        this.convertAqiToList(weatherData);

        //获取生活指数信息
        this.convertSuggestionList(weatherData);

        //存储天气数据
        this.saveCityItem(weatherData);

        //TODO:语音播报
        /*let voiceContent = weatherData.basic.city + '现在' + weatherData.now.cond.txt + ',气温' +
            weatherData.now.tmp + '度';
        this.speakWeather(voiceContent);*/

    };

    /**
     * 从总天气数据中获取空气指数的信息
     * @param weatherData
     */
    convertAqiToList = (weatherData) => {
        this.aqiList = [];
        let aqi = weatherData.aqi.city;
        this.aqiList.push(new AqiItem('CO', aqi.co, '一氧化碳', 'mg/m³'));
        this.aqiList.push(new AqiItem('NO2', aqi.no2, '二氧化氮', 'μg/m³'));
        this.aqiList.push(new AqiItem('O³', aqi.o3, '臭氧', 'μg/m³'));
        this.aqiList.push(new AqiItem('PM10', aqi.pm10, '可吸入颗粒物', 'μg/m²'));
        this.aqiList.push(new AqiItem('PM2.5', aqi.pm25, '可入肺颗粒', 'μg/m³'));
        this.aqiList.push(new AqiItem('PM10', aqi.so2, '二氧化硫', 'μg/m³'));
    };

    /**
     * 从总天气数据中获取空气指数信息
     * @param weatherData
     */
    convertSuggestionList = (weatherData) => {
        this.lifeList = [];
        let suggestion = weatherData.suggestion;
        this.lifeList.push(new SuggestionInfo('舒适指数', Object(suggestion.comf).brf, Object(suggestion.comf).txt));
        this.lifeList.push(new SuggestionInfo('洗车指数', Object(suggestion.cw).brf, Object(suggestion.cw).txt));
        this.lifeList.push(new SuggestionInfo('穿衣指数', Object(suggestion.drsg).brf, Object(suggestion.drsg).txt));
        this.lifeList.push(new SuggestionInfo('感冒指数', Object(suggestion.flu).brf, Object(suggestion.flu).txt));
        this.lifeList.push(new SuggestionInfo('运动指数', Object(suggestion.sport).brf, Object(suggestion.sport).txt));
        this.lifeList.push(new SuggestionInfo('旅游指数', Object(suggestion.trav).brf, Object(suggestion.trav).txt));
        this.lifeList.push(new SuggestionInfo('紫外线指数', Object(suggestion.uv).brf, Object(suggestion.uv).txt));
    };

    /**
     * 存储一个城市的天气数据
     * @param weatherData
     */
    saveCityItem = (weatherData) => {
        let flag = -1;
        for (let i = 0; i < stateStore.cityList.length; i++) {
            if (stateStore.cityList[i].cityName === weatherData.basic.city) {
                flag = i;
                break;
            }
        }
        let weatherItem = new CityItemInfo(weatherData.basic.city,
            weatherData.daily_forecast[0].tmp.min + '~' + weatherData.daily_forecast[0].tmp.max + '°C',
            ApiConfig.iconApi + weatherData.daily_forecast[0].cond.code_d + '.png');

        if (flag !== -1) {
            stateStore.cityList[flag] = weatherItem;
            //console.log("当前天气已经存在天气列表中只需要修改天气数据即可");
        } else {
            stateStore.cityList.push(weatherItem);
            //console.log("当前已经存储的天气列表中没有改天气名称时候才会存储")
        }
        //把当前的cityList 存储到localStorage
        stateStore.saveLocalCityData();
    }

    /**
     * 获取当前城市天气数据
     * @returns {null}
     */
    getCurrentCityWeather() {
        let weatherData = this.getWeatherDataByName(this.currentCityName);
        //console.log("当前的城市名称：" + this.currentCityName);
        return weatherData;
    }

    /**
     * 通过名字获取天气预报信息
     * @param name
     * @returns {null}
     */
    getWeatherDataByName(name) {
        if (!this.weatherMap.has(name)) {
            //console.log("weatherMap中不存在该地区的天气数据表示当前天气的数据并没有加载成功");
            return null;
        } else {
            return this.weatherMap.get(name);
        }
    }

    /**
     * 返回一周的天气预报
     * @returns {ListViewDataSource}
     */
    @computed get dailyDataSource() {
        let data = this.getCurrentCityWeather();
        if (data !== null) {
            return data.daily;
        } else {
            return '[]';
        }
    }

    /**
     * 返回一天内的天气信息ds
     * @returns
     */
    @computed get hourlyDataSource() {
        let data = this.getCurrentCityWeather();
        if (data !== null) {
            let hourlyData = data.hourly;
            //console.log("获取到了当日24小时的天气" +JSON.stringify(hourlyData));
            return hourlyData;
        } else {
            return '';
        }
    }
}

const weatherStore = new WeatherStore();
export default weatherStore;
//导出常量：weatherStore,方便其他地方存储、获取数据