/*
 * 对本地的存储的数据进行控制与存储
 *
 */
import {observable, computed} from 'mobx';
import {StyleSheet, ListView} from 'react-native';
import storage from '../config/storage_config'

class StateStore {

    /**
     * 被观察者：当被观察者的状态改变，观察者的状态也会随之改变。
     * @type {boolean}
     */
    @observable cityList = [];//本地已经添加的城市列表

    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    constructor() {

    }


    /**
     * 移除本地已经添加的某个城市
     * @param name
     */
    removeCityByName = (name) => {
        let index = -1;
        for (let i = 0; i < this.cityList.length; i++) {
            if (this.cityList[i].cityName === name) {
                index = i;
                break;
            }
        }
        if (index != -1) {//如果本地找到该城市，就将该城市删除，并保存到本地数据中
            this.cityList.splice(index, 1);
            stateStore.saveLocalCityData();
        }
    };

    /**
     * 保存到本地的天气列表
     *
     * [{"cityName":"北京","tmp":"-5~6°C","iconUrl":"https://cdn.heweather.com/cond_icon/101.png"}]
     */
    saveLocalCityData() {
        //console.log("本地的CityList" + this.cityList.length);
        //console.log("开始存储本地数据……");
        storage.save({
            key: 'cities',
            data: JSON.stringify(this.cityList)
        });
        //console.log("结束存储本地数据……");
    };

    /**
     * 加载本地添加的天气列表数据
     */
    loadLocalCityData() {
        //console.log("开启加载本地存储的数据…………………………");
        storage.load({
            key: 'cities',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: false,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法
            //console.log("本地存储的数据：" + ret);
            let array = JSON.parse(ret);
            for (let i = 0; i < array.length; i++) {
                let flag = true;//是否可以添加到城市列表中
                for (let j =0;j<this.cityList.length;j++){
                    if (array[i].cityName === this.cityList[j].cityName){
                        flag = false;
                        break;
                    }
                }
                if (flag){
                    this.cityList.push(array[i]);
                }
            }
            //this.cityList = this.removeDuplicatedItem(this.cityList);
            //console.log("城市列表" + this.cityList);
        }).catch(err => {
            //console.log("如果没有找到数据且没有sync方法");
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    //alert('本地无缓存数据');
                    // TODO;
                    break;
                case 'ExpiredError':
                    //alert('本地缓存数据已过期，重新为您加载');
                    // TODO
                    break;
            }
        });
        //console.log("本地存储的天气信息加载完成…………………………");
    }

    /**
     * ?
     * @param ar
     * @returns {Array}

    removeDuplicatedItem(ar) {
        var ret = [];

        ar.forEach(function (e, i, ar) {
            if (ar.indexOf(e) === i) {
                ret.push(e);
            }
        });

        return ret;
    }
     */

    /**
     * 返回本地的cityList
     */
    @computed get cityDataSource() {
        return this.ds.cloneWithRows(this.cityList.slice());
    }


}

const stateStore = new StateStore();
export default stateStore;