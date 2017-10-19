import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'


Vue.use(Vuex);

//初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
    token: window.localStorage.getItem('token'),
    admin: window.localStorage.getItem('admin'),
    id: window.localStorage.getItem('id'),
    user: window.localStorage.getItem('user'),
    company: window.localStorage.getItem('company'),
    username: ''
};

export default new Vuex.Store({
    state,
    mutations,
    actions
});