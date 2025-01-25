import { getInfo, setInfo } from '@/utils/storage'
export default {
  // 命名空间能让这个模块的命名跟其他模块独立
  namespaced: true,
  // 提供数据
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  // 提供修改数据的方法
  mutations: {
    // 所有mutations的第一个参数都是state
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  // 提供异步操作
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      // 提交全局模块中的 cart/setCartList mutation
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  // 提供基于state 派生出的类似于computed属性的
  getters: {}
}
