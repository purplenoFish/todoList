// 该文件用于创建vuex中的store

// 引入vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 使用Vuex插件
Vue.use(Vuex)
// 准备数据
const state = {}

// 用于响应组件中的动作
const actions = {}

// 用于操作数据
const mutations = {}

// 创建并暴露store
export default new Vuex.Store({
    state,
    actions,
    mutations
})