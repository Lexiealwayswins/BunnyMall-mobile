<template>
  <div class="cart">
    <!-- 导航条 -->
    <van-nav-bar
      title="Cart"
      fixed
    />
    <!-- 购物车非空的情况 -->
    <div class="cart-box" v-if="isLogin && cartList.length > 0">
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span><i>{{ cartTotal || 0 }}</i> items in total</span>
        <span class="edit" @click="isEdit = !isEdit">
          <van-icon name="edit"/>
          Edit
        </span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <van-checkbox icon-size="18" :value="item.isChecked" @click="toggleCheck(item.goods_id)"></van-checkbox>
          <div class="show" @click="$router.push(`/prodetail/${item.goods_id}`)">
            <img :src="item.goods.goods_image" alt="">
          </div>
          <div class="info">
            <div class="top">{{ item.goods.goods_name }}</div>
            <div class="bottom">
              <div class="price">$ <span>{{ item.goods.goods_price_min }}</span></div>
              <CountBox
                :value="item.goods_num"
                @input="(value) => changeCount(value, item.goods_id, item.goods_sku_id)"
                ></CountBox>
            </div>
          </div>
        </div>
      </div>
      <!-- 结算栏 -->
      <div class="footer-fixed">
        <div class="all-check" @click="toggleAllCheck()">
          <van-checkbox
          :value="isAllChecked"
          icon-size="18"
          ></van-checkbox>
          Select All
        </div>
        <div class="all-total">
          <div class="price">
            <span>In total: </span>
            <span>$ <i class="totalPrice">{{ selPrice }}</i></span>
          </div>
          <div v-if="!isEdit" :class="{ disabled: selCount === 0 }" @click="goPay" class="gopay">Confirm ({{ selCount }})</div>
          <div v-else :class="{ disabled: selCount === 0 }" @click="handleDel" class="delete">Delete ({{ selCount }})</div>
        </div>
      </div>
    </div>

    <!-- 购物车是空的情况 -->
    <div class="empty-cart" v-else>
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        Your cart is empty, let's go shopping!
      </div>
      <div class="btn" @click="$router.push('/')">Go Shopping</div>
    </div>

  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      isEdit: false
    }
  },
  name: 'CartPage',
  components: { CountBox },
  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'selCartList', 'selCount', 'selPrice', 'isAllChecked']),
    isLogin () {
      return this.$store.getters.token
    }
  },
  created () {
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
  methods: {
    toggleCheck (goodsId) {
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    toggleAllCheck () {
      this.$store.commit('cart/toggleAllCheck', !this.isAllChecked)
    },
    changeCount (value, goodsId, skuId) {
      this.$store.dispatch('cart/changeCountAction', {
        goodsNum: value,
        goodsId,
        skuId
      })
    },
    async handleDel () {
      if (this.selCount === 0) return
      await this.$store.dispatch('cart/delSelect')
      this.isEdit = false
    },
    goPay () {
      if (this.selCount > 0) {
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            cartIds: this.selCartList.map(item => item.id).join(',')
          }
        })
      }
    }
  },
  watch: {
    isEdit (value) {
      if (value) {
        this.$store.commit('cart/toggleAllCheck', false)
      } else {
        this.$store.commit('cart/toggleAllCheck', true)
      }
    }
  }

}
</script>

<style lang="less" scoped>
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;

  .van-nav-bar {
    background-color: #fff;
  }

  .cart-box {
    .cart-title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 16px;
      padding: 0 10px;
      font-size: 14px;
      .all {
        i {
          font-style: normal;
          margin: 0 2px;
          color: #fa2209;
          font-size: 16px;
        }
      }
      .edit {
        .van-icon {
          font-size: 18px;
        }
      }
    }

    .cart-list {
      .cart-item {
        margin: 0 10px 10px 10px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        background-color: #ffffff;
        border-radius: 5px;
        .show img {
          width: 100px;
          height: 100px;
        }
        .info {
          width: 210px;
          padding: 10px 5px;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .bottom {
            display: flex;
            justify-content: space-between;
            .price {
              display: flex;
              align-items: flex-end;
              color: #fa2209;
              font-size: 12px;
              span {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    .footer-fixed {
      display: flex;
      justify-content: space-between;
      position: fixed;
      left: 0;
      bottom: 50px;
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      background-color: #fff;
      align-items: center;
      padding: 0 10px;
      .all-check {
        display: flex;
        align-items: center;
        .van-checkbox {
          margin-right: 5px;
        }
      }

      .all-total {
        display: flex;
        line-height: 36px;
        .price {
          font-size: 14px;
          margin-right: 10px;
          .totalPrice {
            color: #fa2209;
            font-size: 18px;
            font-style: normal;
          }
        }
        .gopay, .delete {
          min-width: 100px;
          height: 36px;
          line-height: 36px;
          text-align: center;
          background-color: #fa2f21;
          color: #fff;
          border-radius: 18px;
          &.disabled {
            background-color: #ff9779;
          }
        }
      }
    }
  }

  .empty-cart {
    padding: 80px 30px;
    img {
      width: 140px;
      height: 92px;
      display: block;
      margin: 0 auto;
    }
    .tips {
      text-align: center;
      color: #666;
      margin: 30px;
    }
    .btn {
      width: 110px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background-color: #fa2c20;
      border-radius: 16px;
      color: #fff;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>
