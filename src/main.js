import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2'
import RichTextEditor from 'rich-text-editor-vuetify'
import VueEditor from 'vue2-editor'
// import VJsoneditor from 'v-jsoneditor'
import 'sweetalert2/dist/sweetalert2.min.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)
Vue.use(VueAxios, axios)
Vue.use(VueEditor)
Vue.use(RichTextEditor)
Vue.config.productionTip = false
// Vue.use(VJsoneditor)
Vue.use(VueSweetalert2)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
