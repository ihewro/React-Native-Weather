/**
 * 天气质量指数每一项的值
 */

import {observable, computed} from 'mobx';

export default class AqiItem {
    //污染物的英文名
    @observable eng_name;
    //污染物的值
    @observable value;
    //污染物的中文名
    @observable chn_name;
    //污染物的单位
    @observable unit;


    constructor(eng_name, value, chn_name, unit) {
        this.eng_name = eng_name;
        this.value = value;
        this.chn_name = chn_name;
        this.unit = unit;
    }
}
