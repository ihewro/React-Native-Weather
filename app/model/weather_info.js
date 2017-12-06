/**
 * 天气信息的模型类
 */

import {observable, computed} from 'mobx';

export default class WeatherModel{
    /**
     * 空气质量
     * "aqi": {
        "city": {
          "aqi": "30",
          "co": "0",
          "no2": "14",
          "o3": "65",
          "pm10": "30",
          "pm25": "11",
          "qlty": "优",
          "so2": "6"
        }
     */
    @observable aqi;
    /**
     * 基础信息
     * "basic": {
        "city": "北京",
        "cnty": "中国",
        "id": "CN101010100",
        "lat": "39.90498734",
        "lon": "116.4052887",
        "update": {
          "loc": "2017-12-06 14:50",
          "utc": "2017-12-06 06:50"
        }
     */
    @observable basic;
    /**
     * 未来7天天气
     * "daily_forecast": [
     {
       "astro": {
         "mr": "19:50",
         "ms": "09:42",
         "sr": "07:20",
         "ss": "16:51"
       },
       "cond": {
         "code_d": "100",
         "code_n": "101",
         "txt_d": "晴",
         "txt_n": "多云"
       },
       "date": "2017-12-06",
       "hum": "23",
       "pcpn": "0.0",
       "pop": "0",
       "pres": "1023",
       "tmp": {
         "max": "8",
         "min": "-4"
       },
       "uv": "1",
       "vis": "20",
       "wind": {
         "deg": "3",
         "dir": "北风",
         "sc": "微风",
         "spd": "6"
       }
     },
     ...更多未来天气
     ]
     */
    @observable daily;

    /**
     * 24小时天气
     * "hourly_forecast": [
     {
       "cond": {
         "code": "103",
         "txt": "晴间多云"
       },
       "date": "2017-12-06 16:00",
       "hum": "17",
       "pop": "0",
       "pres": "1022",
       "tmp": "5",
       "wind": {
         "deg": "238",
         "dir": "西南风",
         "sc": "微风",
         "spd": "5"
       }
     },
     ...//更多时间节点的天气
     ]
     */
    @observable hourly;
    /**
     * 当前时刻的天气
     * "now": {
        "cond": {
          "code": "100",
          "txt": "晴"
        },
        "fl": "1",
        "hum": "16",
        "pcpn": "0",
        "pres": "1019",
        "tmp": "9",
        "vis": "8",
        "wind": {
          "deg": "3",
          "dir": "北风",
          "sc": "微风",
          "spd": "10"
        }
      },
     */
    @observable now;
    /**
     * 生活指数：一些建议
     * "suggestion": {
        "air": {
          "brf": "中",
          "txt": "气象条件对空气污染物稀释、扩散和清除无明显影响，易感人群应适当减少室外活动时间。"
        },
        "comf": {
          "brf": "较舒适",
          "txt": "白天虽然天气晴好，但早晚会感觉偏凉，午后舒适、宜人。"
        },
        "cw": {
          "brf": "较适宜",
          "txt": "较适宜洗车，未来一天无雨，风力较小，擦洗一新的汽车至少能保持一天。"
        },
        "drsg": {
          "brf": "较冷",
          "txt": "建议着厚外套加毛衣等服装。年老体弱者宜着大衣、呢外套加羊毛衫。"
        },
        "flu": {
          "brf": "较易发",
          "txt": "昼夜温差较大，较易发生感冒，请适当增减衣服。体质较弱的朋友请注意防护。"
        },
        "sport": {
          "brf": "较适宜",
          "txt": "天气较好，无雨水困扰，较适宜进行各种运动，但因气温较低，在户外运动请注意增减衣物。"
        },
        "trav": {
          "brf": "适宜",
          "txt": "天气较好，气温稍低，会感觉稍微有点凉，不过也是个好天气哦。适宜旅游，可不要错过机会呦！"
        },
        "uv": {
          "brf": "弱",
          "txt": "紫外线强度较弱，建议出门前涂擦SPF在12-15之间、PA+的防晒护肤品。"
        }
      }
     */
    @observable suggestion;

    constructor(jsonData) {
        this.aqi = jsonData.aqi;
        this.basic = jsonData.basic;
        this.daily = jsonData.daily_forecast;
        this.hourly = jsonData.hourly_forecast;
        this.now = jsonData.now;
        this.suggestion = jsonData.suggestion;
    }
}