<template>
  <div class="category">
    <!-- 导航条 -->
    <van-nav-bar
      title="All Categories"
      fixed
    />
    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="Please input search keywords"
      @click="$router.push('/search')"
    />
    <!-- 分类列表 -->
    <div class="list-box">
      <div class="left">
        <ul>
          <li v-for="(item, index) in list" :key="item.category_id">
            <a
            :class="{ active: index === activeIndex }"
            @click="activeIndex = index"
            >{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="right">
        <div
        v-for="item in list[activeIndex]?.children"
        :key="item.category_id"
        @click="$router.push(`./searchlist?categoryId=${item.category_id}`)"
        class="cate-good"
        >
            <img :src="item.image?.external_url" alt="">
            <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryData } from '@/api/category'

export default {
  name: 'CategoryPage',
  data () {
    return {
      list: [],
      activeIndex: 0
    }
  },
  created () {
    this.getCategoryList()
  },
  methods: {
    async getCategoryList () {
      const { data: { list } } = await getCategoryData()
      this.list = list
    }
  }
}
</script>

<style lang="less" scoped>
  .category {
    padding-top: 46px;
    padding-bottom: 50px;
    height: 100vh;
    .list-box {
      height: 100%;
      display: flex;
      .left {
        width: 85px;
        height: 100%;
        background-color: #f3f3f3;
        overflow: auto;
        a {
          display: block;
          height: 45px;
          line-height: 45px;
          text-align: center;
          color: #444444;
          font-size: 12px;
          &.active {
            background-color: #fff;
            color: #fb442f;
          }
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: flex-start;
        padding: 10px 0;
        overflow: auto;
        background-color: #fff;
        .cate-good {
          width: 33.3%;
          margin-bottom: 10px;
          img {
            display: block;
            margin: 5px auto;
            width: 70px;
            height: 70px;
          }
          p {
            text-align: center;
            font-size: 12px;
          }
        }
      }
    }

  }
</style>
