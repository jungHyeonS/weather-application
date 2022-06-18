<template>
    <div>
        <div class="timeInfo">
            <div class="timeInfoWrap">
                <ul :style="{'width': (111 * times.hourlyInfo.length) + 'px' }"> 
                    <li v-for="(item,index) in times.hourlyInfo" :key="index">
                        <p>{{item.days}}</p>
                        <h1>{{item.hours}}</h1>
                        <img  :src="'http://openweathermap.org/img/wn/'+item.weather[0].icon+'@2x.png'"/>
                    </li>
                    <!-- <li>
                        <p>06/02</p>
                        <h1>14시</h1>
                        <img src="@/assets/img/icons/w2.png"/>
                    </li>
                        <li>
                        <p>06/02</p>
                        <h1>14시</h1>
                        <img src="@/assets/img/icons/w2.png"/>
                    </li> -->
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { useStore } from "vuex";
import {onMounted,reactive} from "vue";
export default {
    name : "timeInfoCom",
    props:['hourly'],
    setup(props){
        const store = useStore();
        const times = reactive({
            hourlyInfo : [],
            setHourly:()=>{
                times.hourlyInfo = props.hourly;
                console.log("hourlyinfo",times.hourlyInfo)
                for(let item of times.hourlyInfo){
                    store.commit("covertUnixTime",item.dt);
                    item.days = store.state.time.month + "/" + store.state.time.day
                    item.hours = store.state.time.hour + "시"
                }
            }
        })
        

        onMounted(()=>{
            times.setHourly();
        })
        return { times }
    }
}
</script>