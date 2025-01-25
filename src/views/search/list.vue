<template>
  <div class="search">
    <!-- 导航条 -->
    <van-nav-bar
      title="Products Lists"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    />
    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#ffffff"
      show-action
      :value="querySearch || 'Search Products'"
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon name="apps-o" class="tool"/>
      </template>
    </van-search>
    <!-- 排序选项按钮 -->
    <div class="sort-btns">
        <div class="sort-item">综合</div>
        <div class="sort-item">销量</div>
        <div class="sort-item">价格</div>
    </div>
    <div class="goods-list">
        <GoodsItem v-for="item in proList" :item="item" :key="item.goods_id"></GoodsItem>
    </div>
  </div>
</template>

<script>
import { getProList } from '@/api/products'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'SearchIndex',
  data () {
    return {
      page: 1,
      proList: []
    }
  },
  components: {
    GoodsItem
  },
  computed: {
    // 获取地址栏的搜索关键字
    querySearch () {
      return this.$route.query.search
    }
  },
  async created () {
    const { data: { list } } = await getProList({
      categoryId: this.$route.query.categoryId,
      goodsName: this.querySearch,
      page: this.page
    })
    this.proList = list.data
  }
}
</script>

<style lang="less" scoped>
  .search {
    padding-top: 46px;
    ::v-deep .van-icon-arrow-left {
        color: #333;
    }
    .tool {
      height: 40px;
      line-height: 40px;
    }
    .sort-btns {
      display: flex;
      justify-content: space-evenly;
      height: 36px;
      line-height: 36px;
      .sort-item {
        flex: 1;
        text-align: center;
        font-size: 16px;
      }
    }
    .goods-list {
      background-color: #f6f6f6;
    }
  }
</style>
