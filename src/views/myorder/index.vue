<template>
  <div class="order">
    <!-- 导航条 -->
    <van-nav-bar
      title="My Order"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    />
    <!-- 顶部菜单 -->
    <van-tabs v-model="active" sticky>
      <van-tab name="all" title="All"></van-tab>
      <van-tab name="payment" title="To be paid"></van-tab>
      <van-tab name="delivery" title="To be delivered"></van-tab>
      <van-tab name="received" title="To be received"></van-tab>
      <van-tab name="comment" title="To be commented"></van-tab>
    </van-tabs>
    <OrderListItem v-for="item in list" :key="item.order_id" :item="item"></OrderListItem>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getMyOrderList } from '@/api/order'
export default {
  name: 'orderPage',
  components: {
    OrderListItem
  },
  data () {
    return {
      active: this.$route.query.dataType || 'all',
      page: 1,
      list: []
    }
  },
  methods: {
    async getOrderList () {
      const { data: { list } } = await getMyOrderList(this.active, this.page)
      list.data.forEach(item => {
        item.total_num = 0
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
        })
      })
      this.list = list.data
    }
  },
  watch: {
    active: {
      // 在侦听器初始化时，立即调用一次 handler 方法
      immediate: true,
      handler () {
        this.getOrderList()
      }
    }
  }
}
</script>

<style>

</style>
