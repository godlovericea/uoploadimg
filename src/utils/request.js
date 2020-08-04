import axios from 'axios'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// 创建axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api的base_url
    timeout: process.env.VUE_APP_API_TIMEOUT, // 请求超时时间
    withCredentials: true
})

// request 拦截器
service.interceptors.request.use(
    (config) => {
        // 这里可以自定义一些config 配置

        // if (store.getters.token) {
        //     config.headers.Authorization = 'Bearer ' + getToken()
        // }
        if (window.location.pathname === '/buy/order' || window.location.pathname === '/sell/order') {
            store.dispatch('app/setLoading', 0)
        } else {
            store.dispatch('app/setLoading', true)
        }
        return config
    },
    (error) => {
        //  这里处理一些请求出错的情况
        // loading 清 0
        store.dispatch('app/setLoading', 0)

        return Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data
        // 这里处理一些response 正常放回时的逻辑

        // loading - 1
        store.dispatch('app/setLoading', false)

        return res
    },
    (error) => {
        // 这里处理一些response 出错时的逻辑

        // loading - 1
        store.dispatch('app/setLoading', false)

        return Promise.reject(error)
    }
)

export default service
