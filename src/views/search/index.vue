<template>
  <div class="search">
    <!-- 导航条 -->
    <van-nav-bar
      title="Search Products"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 搜索框 -->
    <van-search
      v-model="search"
      show-action
      placeholder="Please input keywords here"
      clearable
    >
      <template #action>
        <div @click="goSearch(search)">Search</div>
      </template>
    </van-search>
    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>Latest Search</span>
        <van-icon @click="clear" name="delete-o" size="16"/>
      </div>
      <div class="list">
        <div v-for="item in history"
          @click="goSearch(item)"
         :key="item"
         class="list-item"
         >
         {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchHistory, setSearchHistory } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      search: '',
      history: getSearchHistory()
    }
  },
  methods: {
    goSearch (key) {
      const index = this.history.indexOf(key)
      if (index !== -1) {
        // 先删除原有的相同的关键词
        this.history.splice(index, 1)
      }
      // 再把这个关键词加到history的最前面
      this.history.unshift(key)
      setSearchHistory(this.history)
      this.$router.push(`/searchlist?search=${key}`)
    },
    clear () {
      this.history = []
      setSearchHistory(this.history)
      this.$toast.success('Sucessfully clear history')
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    align-items: center;
    font-size: 14px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    padding: 7px;
    margin-bottom: 10px;
    line-height: 15px;
    background-color: #fff;
    border-radius: 50px;
    border: solid 1px #efefef;
    text-align: center;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
