<template>
  <div>
    <!-- 二级路由出口：二级组件展示的位置 -->
    <router-view></router-view>
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="wap-home-o">Home</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">Category</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">Cart</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">User</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>
