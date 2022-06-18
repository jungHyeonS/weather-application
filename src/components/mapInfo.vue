<template>
    <div>
        <div v-if="isLoading" class="mapLoading">
            <loading></loading>
        </div>
        <div class="mapInfo" v-else>
            <div class="mapInfoWrap">
                <img src="@/assets/img/map.png" class="map"/>
                <div class="mapItem" v-for="(item,index) in coordinate" :key="index" :class="`city${(index+1)}`">
                    <p>{{item.city}}</p>
                    <img :src="'http://openweathermap.org/img/wn/'+item.weaher.weather[0].icon+'@2x.png'"/>
                    <p>{{item.weaher.temp}}도</p>
                </div>
                <!-- <div class="mapItem city2">
                    <p>인천</p>
                    <img src="@/assets/img/icons/w2.png"/>
                    <p>26도</p>
                </div>
                 <div class="mapItem city3">
                    <p>파주</p>
                    <img src="@/assets/img/icons/w2.png"/>
                    <p>26도</p>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import { useStore } from "vuex";
import loading from "@/components/incLoading.vue"
import {onMounted,ref,inject,reactive} from "vue"
export default {
    name : "mainInfoCom",
    components:{
        loading
    },
    setup(){
        const store = useStore();
        const isLoading = ref(true)
        const axios = inject('axios');
        const key = "1523955ec9313db7ddcf2463f1dcf67c"
        const coordinate = ref(
            [
                {lat : 37.560961, lon : 126.975148, city:"서울"}, //서울
                {lat : 37.450001, lon : 126.416107,city:"인천"},// 인천
                {lat : 37.759866, lon : 126.777678,city:"파주"}, //파주
                {lat : 37.8813153 , lon : 127.7299707,city:"춘천"},//춘천
                {lat : 37.755562 , lon : 128.896103,city:"강릉"}, // 강릉
                {lat : 37.271395 , lon : 127.013835,city:"수원"}, // 수원
                {lat : 36.637218 , lon : 127.489723,city:"청주"}, //청주
                {lat : 36.333328 , lon : 127.416672,city:"대전"}, //대전
                {lat : 35.799999, lon : 128.550003,city:"대구"}, //대구
                {lat : 37.506399, lon : 130.839601,city:"울릉도"}, // 울릉도
                {lat : 35.821941, lon : 127.148888,city:"전주"}, //전주
                {lat : 35.166672, lon : 126.916672,city:"광주"}, //광주
                {lat : 35.133331, lon :129.050003,city:"부산"}, //부산
                {lat : 33.509720, lon :126.521942,city:"제주"}, //제주
            ]
        )
        const nationwideWather = reactive({
            sequnceNation : async ()=>{
                for(let conItem of coordinate.value){
                    try{
                        conItem.weaher = await nationwideWather.getNationWide(conItem.lat,conItem.lon)
                        store.commit("covertTemp",conItem.weaher.temp)
                        conItem.weaher.temp = store.state.padTemp;
                    }catch(err){
                        console.log(err)
                    }
                } 
                isLoading.value = false

            },
            getNationWide : (lat,lon) =>{
                return new Promise((resolve,reject)=>{
                    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&lang=kr&units=metric`).then((res)=>{
                        resolve(res.data.current)
                    }).catch((err)=>{
                        console.log(err);
                        reject(100)
                    })
                })
            }
           
        })

        onMounted(()=>{
            nationwideWather.sequnceNation()
        })
        return {coordinate,nationwideWather,isLoading}
    }
}
</script>