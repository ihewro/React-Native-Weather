/**
 * 本地存储的天气列表每项的数据结构
 */

import {observable, computed} from 'mobx';

export default class CityItem {

    //城市名称
    @observable cityName;
    //温度
    @observable tmp;
    //天气的图标
    @observable iconUrl;

    constructor(cityName, tmp, iconUrl) {
        this.cityName = cityName;
        this.tmp = tmp;
        this.iconUrl = iconUrl;
    }
}