<template>
    <div class="inc" v-if="inc.isLoading">
        <loading></loading>
    </div>
    <div class="main" v-if="!inc.isLoading">
        <div class="topInfo">
            <!--  -->
            <p class="time">{{weather.weatherData.current.dt}}</p>
            <h1 class="area">광진구 능동</h1>
            <img :src="'http://openweathermap.org/img/wn/'+weather.weatherData.current.weather[0].icon+'@4x.png'"/>
            <h1 class="temperature">{{weather.weatherData.current.temp}}도</h1>
            <p class="otherTemperature">어제보다 1도 낮아요</p>
        </div>
        <div class="otherInfo">
            <div class="fl">
                <div>
                    <span class="title">체감온도</span>
                    <span>{{weather.weatherData.current.feels_like}}도</span>
                </div>
                <div>
                    <span class="title">자외선 지수</span>
                    <span>{{store.state.uvi}}</span>
                </div>
            </div>
            <div class="fl">
                <div>
                    <span class="title">습도</span>
                    <span>{{weather.weatherData.current.humidity}}%</span>
                </div>
                <div>
                    <span class="title">풍속</span>
                    <span>{{weather.weatherData.current.wind_speed}}m/s</span>
                </div>
            </div>
        </div>
        <div class="bottomInfo">
            <div class="bottomNav">
                <ul>
                    <li :class="{'active' : inc.isActive == 1}" @click="inc.changeNav(1)">시간대별</li>
                    <li :class="{'active' : inc.isActive == 2}"  @click="inc.changeNav(2)">주간예보</li>
                    <li :class="{'active' : inc.isActive == 3}"  @click="inc.changeNav(3)">전국날씨</li>
                </ul>
            </div>
            <div class="bottom">
                <timeInfo v-if="inc.isActive == 1" :hourly="weather.weatherData.hourly"></timeInfo>
                <weekInfo v-if="inc.isActive == 2" :daily="weather.weatherData.daily"></weekInfo>
                <mapInfo v-if="inc.isActive == 3"></mapInfo>
            </div>
        </div>
    </div>
</template>
<script>
import timeInfo from "@/components/timeInfo.vue"
import weekInfo from "@/components/weekInfo.vue"
import mapInfo from "@/components/mapInfo.vue";
import loading from "@/components/incLoading.vue"

import { useStore } from "vuex";

import {onMounted,inject, reactive} from "vue";

export default {
    name : "mainPage",
    components:{
        timeInfo,
        weekInfo,
        mapInfo,
        loading
    },
    computed:{
    },
    setup(){
        const store = useStore();
        const axios = inject('axios');
        const key = "1523955ec9313db7ddcf2463f1dcf67c"
     
        const inc = reactive({
            isActive : 1,
            isLoading : true,
            changeNav : (tab)=>{
                inc.isActive = tab
            },
        })


        const weather = reactive({
            weatherData :{
                current : null,
                hourly:[],
                daily:[]
            },

            getWeather : (lat,long) =>{
                axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}&lang=kr&units=metric`).then((res)=>{
                    
                    //현재 날씨 데이터 변환
                    weather.weatherData.current = res.data.current
                    store.commit("covertUVI",weather.weatherData.current.uvi)
                    store.commit("covertUnixTime",weather.weatherData.current.dt)
                    store.commit("covertTemp",weather.weatherData.current.temp)

                    weather.weatherData.current.dt = store.state.time.text;
                    weather.weatherData.current.temp = store.state.padTemp;
                    
                    store.commit("covertTemp",weather.weatherData.current.feels_like)
                    weather.weatherData.current.feels_like = store.state.padTemp;


                    // 시간대별 날씨
                    weather.weatherData.hourly = res.data.hourly;

                    //주간예보
                    weather.weatherData.daily = res.data.daily;
                    console.log("hourly",weather.weatherData.hourly);
                    inc.isLoading = false
                }).catch((err)=>{
                    console.log(err);
                });
            },
            getGeoLocation : () =>{
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition((pos)=>{
                        weather.getWeather(pos.coords.latitude,pos.coords.longitude)
                    },(err)=>{
                        console.log(err);
                    })
                }else{
                    alert("GPS를 지원하지 않습니다.")
                }
            }
        })

        onMounted(() => {
            console.log(Math.floor(260 / 100))

            weather.getGeoLocation()
        })
        return {
            inc,
            weather,
            store
        }
    }
}
</script>
