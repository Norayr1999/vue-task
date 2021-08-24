import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken:'',
    errorMsg:'',
    Posts:[],
  },
  getters:{
    getErrorMsg: (state) => {
      return state.errorMsg
    },
    getAccessToken: (state) => {
      return state.accessToken
    },
    getPosts: (state) => {
      return state.Posts
    }
  },
  mutations: {
    SetErrorMsg(state,val){
      state.errorMsg = val
    },
    SetTokken(state,val){
      state.accessToken = val
    },
    SET_POSTS_VALS(state,val){
      state.Posts = val
    },
  },
  actions: {
    getPosts({ commit }) {
      return new Promise((resolve, reject) => {
        let url = `https://test-api.updivision.work/api/products`;
        let headers = {
          headers: {
            Authorization: `Bearer ${ JSON.parse(localStorage.getItem('token'))}`,
            "Content-Type": "application/json",
          },
        };
        axios
            .get(url,headers)
            .then((res) => {

              console.log(res.data);
              commit("SET_POSTS_VALS", JSON.parse(JSON.stringify(res.data)));
              // resolve("success");
            })
            .catch((error) => {
              reject(error);
            });
      });
    },

  },
})
