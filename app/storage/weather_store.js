/*
* 天气的信息获取与存储
* */

import { observable, computed, asMap, autorun } from 'mobx';


class WeatherStore{

    @observable loading = false;//指示数据是否正在加载
}

const weatherStore = new WeatherStore();
export default weatherStore;