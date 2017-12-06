import {observable, computed} from 'mobx';

export default class CityItem {
    @observable cityName;
    @observable tmp;
    @observable iconUrl;

    constructor(cityName, tmp, iconUrl) {
        this.cityName = cityName;
        this.tmp = tmp;
        this.iconUrl = iconUrl;
    }
}