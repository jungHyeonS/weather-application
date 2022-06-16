import { createStore } from 'vuex'

export default createStore({
  state: {
    uvi:"",
    padTemp:0,
    time:{},
  },
  getters: {
    getPad(state){
      return state.pad
    },
  },
  mutations: {
    covertUVI(state,value){
      let result = ""
      if(value >= 9.0){
        result = "매우 높음"
      }else if(value >= 7.0){
          result = "높음"
      }else if(value >= 5.0){
          result = "보통"
      }else if(value >= 3.0){
          result = "낮음"
      }else{
          result = "매우 낮음"
      }
      state.uvi = result;
    },
    covertUnixTime(state,value){

      const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
      let date = new Date(value * 1000)
      let month = "0" + (date.getMonth()+1);
      let day = "0" + date.getDate();
      let hour = "0" + date.getHours();
      let minute = "0" + date.getMinutes();
      let dotw = WEEKDAY[date.getDay()]
      state.time = {
        month : month.substr(-2),
        day : day.substr(-2),
        hour : hour.substr(-2),
        min : minute.substr(-2),
        text : hour.substr(-2) + ":" + minute.substr(-2),
        dotw : dotw
      }

    },
    covertTemp(state,vale){
      state.padTemp =  Number(vale).toFixed(0)

    }
  },
  actions: {
  },
  modules: {
  }
})
