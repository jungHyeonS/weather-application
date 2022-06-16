<template>
    <div>
        <div class="timeInfo weak">
            <div class="timeInfoWrap">
                <ul :style="{'width': (111 * weeks.daily.length) + 'px' }">
                    <li v-for="(item,index) in weeks.daily" :key="index">
                        <p>{{item.days}}</p>
                        <h1>{{item.dotw}}</h1>
                        <img  :src="'http://openweathermap.org/img/wn/'+item.weather[0].icon+'@2x.png'"/>
                        <div class="weakTemperature">
                            <div>
                                <h1>최고</h1>
                            </div>
                            <div>
                                <p>{{item.temp.max}}도</p>
                            </div>
                        </div>
                        <div class="weakTemperature">
                            <div>
                                <h1>최저</h1>
                            </div>
                            <div>
                                <p>{{item.temp.min}}도</p>
                            </div>
                        </div>
                    </li>
                    <!-- <li>
                        <p>06/02</p>
                        <h1>화</h1>
                        <img src="@/assets/img/icons/w2.png"/>
                        <div class="weakTemperature">
                            <div>
                                <h1>최고</h1>
                            </div>
                            <div>
                                <p>24도</p>
                            </div>
                        </div>
                        <div class="weakTemperature">
                            <div>
                                <h1>최저</h1>
                            </div>
                            <div>
                                <p>24도</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <p>06/02</p>
                        <h1>수</h1>
                        <img src="@/assets/img/icons/w2.png"/>
                        <div class="weakTemperature">
                            <div>
                                <h1>최고</h1>
                            </div>
                            <div>
                                <p>24도</p>
                            </div>
                        </div>
                        <div class="weakTemperature">
                            <div>
                                <h1>최저</h1>
                            </div>
                            <div>
                                <p>24도</p>
                            </div>
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { useStore } from "vuex";
import {onMounted,reactive} from "vue"
export default {
    name : "weekInfoCom",
    props:['daily'],
    setup(props){
        const store = useStore();
        const weeks = reactive({
            daily : [],
            setDailys : ()=>{
                weeks.daily = props.daily
                for(let item of weeks.daily){
                    store.commit("covertUnixTime",item.dt)
                    item.dotw = store.state.time.dotw
                    item.days = store.state.time.month + "/" + store.state.time.day


                    store.commit("covertTemp",item.temp.max)
                    item.temp.max = store.state.padTemp

                    store.commit("covertTemp",item.temp.min)
                    item.temp.min = store.state.padTemp
                }
            }
        })

        onMounted(()=>{
            weeks.setDailys()
            console.log(props.daily)
        });
        return { weeks }
    }
}
</script>