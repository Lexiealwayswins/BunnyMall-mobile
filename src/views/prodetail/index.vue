<template>
  <div class="prodetail">
    <!-- 导航条 -->
    <van-nav-bar
      title="Product Details"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    />
    <!-- 轮播图 -->
    <van-swipe class="pro-swipe" :autoplay="3000" @change="onChange" indicator-color="white">
      <van-swipe-item v-for="item in images" :key="item.file_id">
        <img :src="item.external_url" alt="">
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>
    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">$ {{ detail.goods_price_min }}</span>
          <span class="old">$ {{ detail.goods_price_max }}</span>
        </div>
        <div class="soldcount">Sold {{ detail.goods_sales }}</div>
      </div>
      <div class="msg">{{ detail.goods_name }}</div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
    <!-- 商品评价 -->
    <div class="comments">
      <div class="comment-title">
        <div class="left">Comments ({{ total }})</div>
        <div class="right">More <van-icon name="arrow" /></div>
      </div>
      <div class="comment-list">
        <div
          v-for="item in commentList"
          :key="item.comment_id"
          class="comment-item">
          <div class="top">
            <!-- <img :src="item.user.avatar_url || defaultImg" alt=""> -->
            <img :src="defaultImg" alt="">
            <!-- <div class="name">{{ item.user.nick_name }}</div> -->
            <van-rate
              :value="item.score / 2"
              :size="16"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>
    <!-- 商品描述 -->
    <div v-for="item in images" :key="item.file_id" class="desc">
      <img :src="item.external_url" alt="">
    </div>
    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home" @click="$router.push('/')">
        <van-icon name="wap-home-o"/>
        <span>Home</span>
      </div>
      <div class="icon-cart" @click="$router.push('/cart')">
        <span v-if="cartTotal > 0" class="num">{{ cartTotal }}</span>
        <van-icon name="shopping-cart-o"/>
        <span>Cart</span>
      </div>
      <div @click="addFn" class="btn-add">Add to Cart</div>
      <div @click="buyNow" class="btn-buy">Go Buy Now</div>
    </div>

    <!-- 购物车弹框 -->
    <van-action-sheet v-model="showPannel" :title="mode">
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="detail.goods_image" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span>$</span>
              <span class="nowprice">{{ detail.goods_price_min}}</span>
            </div>
            <div class="count">
              <span>Stock</span>
              <span> {{ detail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>Count</span>
          <CountBox v-model="addCount"></CountBox>
        </div>
        <div class="showbtn" v-if="detail.stock_total > 0">
          <div class="btn" v-if="mode === 'cart'" @click="addCart">Add to Cart</div>
          <div class="btn now" @click="goBuyNow" v-else>Buy Now</div>
        </div>
        <div class="btn-none" v-else>Out of Stock</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getGoodService, getProDetail } from '@/api/products'
import { addCart } from '@/api/cart'
import defaultImg from '@/assets/default-avatar.png'
import CountBox from '@/components/CountBox.vue'
import loginConfirm from '@/mixins/loginConfirm'

export default {
  name: 'ProDetail',
  components: {
    CountBox
  },
  mixins: [loginConfirm],
  data () {
    return {
      num: '',
      images: [],
      detail: {},
      current: 0,
      commentList: [], // 评价列表
      total: 0, // 评价总数
      defaultImg, // 默认头像
      showPannel: false, // 控制购物车弹窗
      mode: 'cart',
      addCount: 1,
      cartTotal: 0 // 购物车里货物数量
    }
  },
  computed: {
    goodsId () {
      return this.$route.params.id
    }
  },
  created () {
    this.getDetails()
    // this.getService()
    this.getComments()
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    async getDetails () {
      const { data: { detail } } = await getProDetail(this.goodsId)
      this.detail = detail
      this.images = detail.goods_images
    },
    async getComments () {
      const { data: { list, total } } = await getGoodService(this.goodsId, 3)
      this.commentList = list
      this.total = total
    },
    addFn () {
      this.showPannel = true
      this.mode = 'cart'
    },
    buyNow () {
      this.showPannel = true
      this.mode = 'buyNow'
    },
    async addCart () {
      // 判断用户是否登录
      if (this.loginConfirm()) {
        return
      }

      const { data } = await addCart(this.goodsId, this.addCount, this.detail.skuList[0].goods_sku_id)
      this.cartTotal = data.cartTotal
      this.$toast('Successfullly add to carts')
      this.showPannel = false
    },
    goBuyNow () {
      if (this.loginConfirm()) {
        return
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          goodsSkuId: this.detail.skuList[0].goods_sku_id,
          goodsNum: this.addCount
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .van-swipe {
    .van-swipe-item {
      img {
        display: block;
        width: 100%;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 10px;
      bottom: 10px;
      padding: 5px 10px;
      background: rgba(0,0,0,0.1);
      border-radius: 15px;
      font-size: 12px;
    }
  }
  .info {
    padding: 10px;
    .title {
      display: flex;
      justify-content: space-between;
      .now {
        color: #fa2209;
        font-size: 20px;
      }
      .old {
        margin-left: 5px;
        color: #959595;
        font-size: 16px;
        text-decoration: line-through;
      }
      .soldcount {
        position: relative;
        top: 4px;
        color:#959595;
        font-size: 16px;
      }
    }
    .msg {
      margin-top: 5px;
      line-height: 24px;
      font-size: 16px;
    }
  }
  .service {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    line-height: 40px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }
  .comments {
    padding: 10px;
    .comment-title {
      display: flex;
      justify-content: space-between;
      .right {
        color: #959595;
      }
    }
    .comment-list {
      .comment-item {
        line-height: 30px;
        font-size: 16px;
        .top {
          margin-top: 20px;
          display: flex;
          align-items: center;
          height: 30px;
          img {
            width: 20px;
            height: 20px;
          }
          .name {
            margin: 0 20px;
          }
        }
        .time {
          color: #999;
        }
      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 55px;
    border-top: 1px solid #ccc;
    background-color: #fff;
    .icon-home,
    .icon-cart
    {
      display: flex;
      justify-content: center;
      flex-direction: column;
      position: relative;
      padding: 0 6px;
      align-items: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
      .num {
        z-index: 999;
        position: absolute;
        top: -2px;
        right: 0;
        min-width: 16px;
        padding: 0 4px;
        color: #fff;
        text-align: center;
        background-color: #ee0a24;
        border-radius: 50%;
      }
    }
    .btn-add,
    .btn-buy {
      width: 120px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-radius: 50px;
      background-color: #ffa900;
      text-align: center;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
  .product {
    .product-title {
      display: flex;
      .left {
        img {
          width: 90px;
          height: 90px;
        }
        margin: 10px;
      }
      .right {
        flex: 1;
        padding: 10px;
        .price {
          font-size: 14px;
          color: #fe560a;
          .nowprice {
            font-size: 24px;
            margin: 0 5px;
          }
        }
      }
    }

    .num-box {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      align-items: center;
    }

    .btn, .btn-none {
      height: 40px;
      line-height: 40px;
      margin: 20px;
      border-radius: 20px;
      text-align: center;
      color: rgb(255, 255, 255);
      background-color: rgb(255, 148, 2);
    }
    .btn.now {
      background-color: #fe5630;
    }
    .btn-none {
      background-color: #cccccc;
    }
  }
}
</style>
