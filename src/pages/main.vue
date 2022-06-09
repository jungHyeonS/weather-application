<template>
    <div class="main">
        <div class="topInfo">
            <p class="time">13:20</p>
            <h1 class="area">광진구 능동</h1>
            <img src="@/assets/img/icons/w1.png"/>
            <h1 class="temperature">31도</h1>
            <p class="otherTemperature">어제보다 1도 낮아요</p>
        </div>
        <div class="otherInfo">
            <div class="fl">
                <div>
                    <span class="title">미세먼지</span>
                    <span>나쁨</span>
                </div>
                <div>
                    <span class="title">강수확률</span>
                    <span>40%</span>
                </div>
            </div>
            <div class="fl">
                <div>
                    <span class="title">습도</span>
                    <span>나쁨</span>
                </div>
                <div>
                    <span class="title">풍속</span>
                    <span>1.3m/s</span>
                </div>
            </div>
        </div>
        <div class="bottomInfo">
            <div class="bottomNav">
                <ul>
                    <li :class="{'active' : isActive == 1}" @click="changeNav(1)">시간대별</li>
                    <li :class="{'active' : isActive == 2}"  @click="changeNav(2)">주간예보</li>
                    <li :class="{'active' : isActive == 3}"  @click="changeNav(3)">전국날씨</li>
                </ul>
            </div>
            <div class="bottom">
                <timeInfo v-if="isActive == 1"></timeInfo>
                <weekInfo v-if="isActive == 2"></weekInfo>
                <mapInfo v-if="isActive == 3"></mapInfo>
            </div>
        </div>
    </div>
</template>
<script>
import timeInfo from "@/components/timeInfo.vue"
import weekInfo from "@/components/weekInfo.vue"
import mapInfo from "@/components/mapInfo.vue";
import { ref,onMounted,inject, reactive} from "vue";
export default {
    name : "mainPage",
    components:{
        timeInfo,
        weekInfo,
        mapInfo
    },
    setup(){
        const axios = inject('axios');
        const key = "1523955ec9313db7ddcf2463f1dcf67c"
        let isActive = ref(1)
        const changeNav = (tab) => {
            isActive.value = tab;
        }


        const getGeoLocation = () => {
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

        const weather = reactive({
            getWeather : (lat,long) =>{
                axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}&lang=kr`).then((res)=>{
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                });
            }
        })

        onMounted(() => {
            getGeoLocation()
        })
        return {isActive,changeNav,getGeoLocation,weather}
    }
}
</script>
