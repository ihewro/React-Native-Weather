/*
* 天气的信息获取与存储
* */

import { observable, computed, asMap, autorun} from 'mobx';
import { ListView} from 'react-native';
import WeatherModel from '../model/weather_info'
import stateStore from '../storage/state_store'
import SuggestionInfo from '../model/suggestion_info'
import AqiItem from "../model/aqi_item_info";


class WeatherStore{

    @observable weatherMap = observable.map();//observable提供了数据结构，存储天气名称——天气数据的集合。

    @observable currentCityName = '北京';//当前的天气名称
    @observable aqiList = [];//空气指数/质量
    @observable lifeList = [];//生活指数/建议
    @observable loading = false;//指示数据是否正在加载

    //???
    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

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
    requestWeatherByName = (name) =>{
        this.loading = true;

        return fetch("https://free-api.heweather.com/v5/weather?key=19713447578c4afe8c12a351d46ea922&city=" + name)
            .then((response) => {//数据解析方式
                if (response.ok){
                    return response.json();
                }
            })
            .then((jsonData) => {//对获取到的数据进行处理
                this.saveWeatherData(jsonData);
            })
            .catch((error) => {//错误信息处理
            })
            .done();
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
        this.lifeList.push(new SuggestionInfo('舒适指数', suggestion.comf.brf, suggestion.comf.txt));
        this.lifeList.push(new SuggestionInfo('洗车指数', suggestion.cw.brf, suggestion.cw.txt));
        this.lifeList.push(new SuggestionInfo('穿衣指数', suggestion.drsg.brf, suggestion.drsg.txt));
        this.lifeList.push(new SuggestionInfo('感冒指数', suggestion.flu.brf, suggestion.flu.txt));
        this.lifeList.push(new SuggestionInfo('运动指数', suggestion.sport.brf, suggestion.sport.txt));
        this.lifeList.push(new SuggestionInfo('旅游指数', suggestion.trav.brf, suggestion.trav.txt));
        this.lifeList.push(new SuggestionInfo('紫外线指数', suggestion.uv.brf, suggestion.uv.txt));
    };

    /**
     * 存储天气数据
     * @param weatherData
     */
    saveCityItem(weatherData) {
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
        } else {
            stateStore.cityList.push(weatherItem);
        }
        stateStore.saveLocalCityData();
    }

    /**
     * 获取当前城市天气数据
     * @returns {null}
     */
    getCurrentCityWeather() {
        let weatherData = this.getWeatherDataByName(this.currentCityName);
        return weatherData;
    }

    /**
     * 通过名字获取天气预报信息
     * @param name
     * @returns {null}
     */
    getWeatherDataByName(name) {
        if (!this.weatherMap.has(name)) {
            return null;
        } else {
            return this.weatherMap.get(name);
        }
    }

    /**
     * 返回每日天气预报ds
     * @returns {ListViewDataSource}
     */
    @computed get dailyDataSource() {
        let data = this.getCurrentCityWeather();
        if (data !== null) {
            return this.ds.cloneWithRows(data.daily.slice());
        } else {
            return this.ds.cloneWithRows([]);
        }
    }

    /**
     * 返回一天内的天气信息ds
     * @returns {ListViewDataSource}
     */
    @computed get hourlyDataSource() {
        let data = this.getCurrentCityWeather();
        if (data !== null) {
            let hourlyData = data.hourly;
            return this.ds.cloneWithRows(hourlyData.slice());
        } else {
            return this.ds.cloneWithRows([]);
        }
    }


}

const weatherStore = new WeatherStore();
export default weatherStore;
//导出常量：weatherStore,方便其他地方存储、获取数据