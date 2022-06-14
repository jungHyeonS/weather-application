import { createStore } from 'vuex'

export default createStore({
  state: {
    uvi:"",
    pad:0,
    time:"",
  },
  getters: {
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
  },
  actions: {
  },
  modules: {
  }
})
