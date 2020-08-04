// import { getToken, setToken, removeToken } from '@/utils/auth'
import { getToken } from '@/utils/auth'
// import { login, getUserInfo } from '@/api/user'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // 登录
    // login ({ commit }, userInfo) {
    //     return new Promise((resolve, reject) => {
    //         login(userInfo).then((res) => {
    //             if (res.code === 200) {
    //                 setToken(res.data)
    //                 commit('SET_TOKEN', res.data)
    //             }

    //             resolve()
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })
    // },
    // 获取用户信息
    // getUserInfo ({ commit, state }) {
    //     return new Promise((resolve, reject) => {
    //         getUserInfo().then((res) => {
    //             if (res.code === 200) {
    //                 commit('SET_NAME', res.data.name)
    //                 commit('SET_AVATAR', res.data.avatar)
    //                 commit('SET_ROLES', res.data.role)
    //             }

    //             resolve(res)
    //         }).catch((err) => {
    //             reject(err)
    //         })
    //     })
    // },
    // 前端 登出
    // logout ({ commit }) {
    //     return new Promise((resolve) => {
    //         commit('SET_TOKEN', '')
    //         removeToken()
    //         resolve()
    //     })
    // }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
