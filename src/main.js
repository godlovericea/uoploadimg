import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/icons'
import * as filters from './filters' // global filters
// import vant from 'vant'
import '@/styles/reset.less'
import Clipboard from 'clipboard'
import { Button, Field, Cell, CellGroup, Uploader, Toast, Lazyload, Image as VanImage } from 'vant'
import 'vant/lib/index.css'
// import { Image as VanImage } from 'vant'
Vue.use(Button)
Vue.use(Field)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(Toast)
Vue.use(VanImage)
Vue.use(Lazyload)

Vue.use(ElementUI)

Vue.prototype.Clipboard = Clipboard

// Vue.use(vant)

Vue.config.productionTip = false

Vue.directive('throttle', {
    inserted (el, binding) {
        el.addEventListener('click', () => {
            el.style.pointerEvents = 'none'
            if (!el.disabled) {
                setTimeout(() => {
                    el.style.pointerEvents = 'auto'
                }, binding.value || 3000)
            }
        })
    }
})

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key])
})

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app')
