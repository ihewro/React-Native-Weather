/*
 * 项目中的状态{state}控制
 *
 * */

import {observable, computed} from 'mobx';


class state_store{

    /**
     * 被观察者：当被观察者的状态改变，观察者的状态也会随之改变。
     * @type {boolean}
     */
    @observable currentCityEngName = '';//当前城市的名称
    @observable cityList = [];//城市列表



}