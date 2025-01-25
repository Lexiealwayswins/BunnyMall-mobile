<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar title="Smart Mall" fixed />
    <!-- 搜索框 -->
    <van-search
      shape="round"
      placeholder="Please input keywords here"
      @click="$router.push('/search')"
    />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
        <img :src="item.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>

    <!-- 导航 -->
    <van-grid :column-num="5">
      <van-grid-item
        v-for="item in navList"
        :key="item.imgUrl"
        :icon="item.imgUrl"
        :text="item.text"
        @click="$router.push('/category')"
      />
    </van-grid>

    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>

      <div class="goods-list">
        <GoodsItem v-for="item in proList" :item="item" :key="item.goods_id"></GoodsItem>
      </div>
    </div>

  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'HomePage',
  components: {
    GoodsItem
  },
  data () {
    return {
      bannerList: [],
      navList: [],
      proList: []
    }
  },
  async created () {
    const { data: { pageData } } = await getHomeData()
    // console.log(pageData)
    this.bannerList = pageData.items[1].data
    this.navList = pageData.items[3].data
    this.proList = pageData.items[6].data
  }
}
</script>

<style lang="less" scoped>
  // 主题 padding，为了让轮播图显示完全，但因为van-nav-bar自带fixed属性，以及van-search加上了fixed属性，所以不受home padding的影响
  .home {
    padding-top: 100px;
    padding-bottom: 50px;
  }
  // 导航条样式
  .van-nav-bar {
    z-index: 999;
    background-color: #c21401;
    // 用::v-deep是为了突破vant封装的scoped的范围
    ::v-deep .van-nav-bar__title {
      color: #fff;
    }
  }
  // 搜索框样式
  .van-search {
    position: fixed;
    width: 100%;
    top: 46px;
    z-index: 999;
    background-color: #f1f1f2;
  }
  // 轮播图样式
  .my-swipe .van-swipe-item {
    height: 185px;
    color: #fff;
    font-size: 20px;
    text-align: center;
    background-color: #39a9ed;
  }
  .my-swipe .van-swipe-item img {
    width: 100%;
    height: 185px;
  }
  .van-grid .van-grid-item {
    ::v-deep .van-grid-item__text {
      font-size: 8px;
    }
  }

  // 主会场
  .main img {
    display: block;
    width: 100%;
  }

  // 猜你喜欢
  .guess .guess-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  // 商品样式
  .goods-list {
    background-color: #f6f6f6;
  }

</style>
