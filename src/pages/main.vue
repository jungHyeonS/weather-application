<template>
    <div class="inc" v-if="inc.isLoading">
        <loading></loading>
    </div>
    <div class="main" v-if="!inc.isLoading">
        <div class="topInfo">
            <!--  -->
            <p class="time">{{getTime(weather.weatherData.current.dt)}}</p>
            <h1 class="area">광진구 능동</h1>
            <img src="@/assets/img/icons/w1.png"/>
            <h1 class="temperature">{{pad(weather.weatherData.current.temp)}}도</h1>
            <p class="otherTemperature">어제보다 1도 낮아요</p>
        </div>
        <div class="otherInfo">
            <div class="fl">
                <div>
                    <span class="title">체감온도</span>
                    <span>{{pad(weather.weatherData.current.feels_like)}}도</span>
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
                <timeInfo v-if="inc.isActive == 1"></timeInfo>
                <weekInfo v-if="inc.isActive == 2"></weekInfo>
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
        pad(){
            return (temp) => {
                return Number(temp).toFixed(0)
            }
        },
        getTime(){
            return (ms) => {
                let seconds = Math.floor(ms / 1000);
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);

                seconds = seconds % 60;
                minutes = seconds >= 30 ? minutes + 1 : minutes;

                minutes = minutes % 60;
                hours = hours % 24;
                return `${hours}:${minutes}`;
            }
        }
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
            }
        })


        const weather = reactive({
            weatherData :{
                current : null
            },
            getWeather : (lat,long) =>{
                axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}&lang=kr&units=metric`).then((res)=>{
                    weather.weatherData.current = res.data.current
                    store.commit("covertUVI",weather.weatherData.current.uvi)
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
