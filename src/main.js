// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MaterialIcons from 'material-design-icons'
Vue.use(MaterialIcons)
//引用vue-material
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
Vue.use(VueMaterial)

// theme
// Vue.material.registerTheme('default',{
//   primary: 'blue',
//   accent: 'blue',
//   background: 'white',
// })

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

//引入store
import store from './store'


import api from './axios.js'
Vue.prototype.api = api

//在应用启动时，可以通过设置 Vue.config.productionTip = false 来关闭生产模式下给出的提示
Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

