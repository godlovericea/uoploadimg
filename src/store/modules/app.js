// import Cookies from 'js-cookie'

const state = {
    // size: Cookies.get('size') || 'medium',
    requestLoading: 0
}

const mutations = {
    SET_LOADING: (state, status) => {
        // error 的时候直接重置
        // console.log(status + ' app')
        if (!status || status < 0) {
            state.requestLoading = 0
            return
        }

        state.requestLoading = status ? ++state.requestLoading : --state.requestLoading
    },
    SET_SIZE: (state, size) => {
        state.size = size
        // Cookies.set('size', size)
    }
}

const actions = {
    // 设置全局Loading
    setLoading ({ commit }, status) {
        commit('SET_LOADING', status)
    },
    setSize ({ commit }, size) {
        commit('SET_SIZE', size)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
