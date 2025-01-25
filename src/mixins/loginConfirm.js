export default {
  methods: {
    // 是否需要弹登录确认框
    // (1) 需要，返回 true，并直接弹出登录确认框
    // (2) 不需要，返回 false
    loginConfirm () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: 'Warm Tips',
          message: 'Please login first',
          confirmButtonText: 'Go login',
          cancelButtonText: 'Browse around'
        })
          .then(() => {
            this.$router.replace({
              path: '/login',
              query: {
                // 带参数要用fullPath，从login跳回原页面会用到这个地址参数
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return true
      }
      return false
    }
  }
}
