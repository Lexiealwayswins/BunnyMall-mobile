<template>
  <div class="pay">
    <!-- 导航条 -->
    <van-nav-bar
      title="Confirm Order"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    />
    <!-- 地址信息 -->
    <div class="address">
      <div class="left-icon">
        <van-icon name="logistics" />
      </div>
      <div class="info" v-if="selectAddress?.address_id">
        <div class="info-content">
          <span class="name">{{ selectAddress.name}}</span>
          <span class="mobile">{{ selectAddress.phone }}</span>
        </div>
        <div class="info-address">
          {{ longAddress }}
        </div>
      </div>
      <div class="info" v-else>
        Please choose your deliver address
      </div>
      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>

    <div class="pay-list">

      <div class="list">
        <div class="goods-item" v-for="item in order.goodsList" :key="item.goods_id">
          <div class="left">
            <img :src="item.goods_image" alt="">
          </div>
          <div class="right">
            <div class="title">{{ item.goods_name }}</div>
            <div class="detail">
              <span class="count">x {{ item.total_num }}</span>
              <span class="price">$ {{ item.goods_price_min }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flow-num-box">
        <span> {{ order.orderTotalNum }} products in total </span>
        <span class="money">  $ {{ order.orderTotalPrice }} </span>
      </div>

      <div class="pay-detail">
        <div class="pay-cell">
          <span>Order Total Amount: </span>
          <span class="red">$ {{ order.orderTotalPrice }}</span>
        </div>
        <div class="pay-cell">
          <span>Coupon: </span>
          <span> No Coupon </span>
        </div>
        <div class="pay-cell">
          <span>Deliver fee: </span>
          <span v-if="!selectAddress"> Please choose deliver address  </span>
          <span v-else> + $0.00 </span>
        </div>
      </div>

      <div class="pay-way">
        <div class="tit">支付方式</div>
        <div class="pay-cell">
          <span><van-icon name="balance-o"/>Balance Payment ($ {{ personal.balance }} available )</span>
          <span class="red"><van-icon color="#fa2209" name="passed"/></span>
        </div>
      </div>

      <div class="buytips">
        <textarea v-model="remark" placeholder="Optional: buyer's notes(Maxinum 50 words)" name="" id="" cols="30" rows="10"></textarea>
      </div>
    </div>

    <div class="footer-fixed">
      <div class="left">Actual Payment: <span>$ {{ order.orderPayPrice }}</span></div>
      <div @click="submitOrder" class="tipsbtn">Submit Order</div>
    </div>
  </div>
</template>

<script>
import { getAddressList } from '@/api/address'
import { checkOrder, submitOrder } from '@/api/order'
export default {
  name: 'MyOrderIndex',
  data () {
    return {
      addressList: [],
      order: {},
      personal: {},
      remark: ''
    }
  },
  computed: {
    mode () {
      return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    },
    goodsId () {
      return this.$route.query.goodsId
    },
    goodsNum () {
      return this.$route.query.goodsNum
    },
    selectAddress () {
      return this.addressList[0]
    },
    longAddress () {
      const region = this.selectAddress.region
      return region.province + region.city + region.region
    }

  },
  created () {
    this.getAddressList()
    this.getOrderList()
  },
  methods: {
    async getAddressList () {
      const { data: { list } } = await getAddressList()
      this.addressList = list
    },
    async getOrderList () {
      if (this.mode === 'cart') {
        const { data: { order, personal } } = await checkOrder(this.mode, { cartIds: this.cartIds })
        this.order = order
        this.personal = personal
      }
      if (this.mode === 'buyNow') {
        const { data: { order, personal } } = await checkOrder(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum
        })
        this.order = order
        this.personal = personal
      }
    },
    async submitOrder () {
      if (this.mode === 'cart') {
        await submitOrder(this.mode, {
          remark: this.remark,
          cartIds: this.cartIds
        })
      }
      if (this.mode === 'buyNow') {
        await submitOrder(this.mode, {
          remark: this.remark,
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum
        })
      }
      this.$toast.success('Successfully paid')
      this.$router.replace('/myorder')
    }
  }
}
</script>

<style lang="less" scoped>
  .pay {
    padding-top: 46px;
    padding-bottom: 46px;

    van-nav-bar {
      ::v-deep .van-nav-bar__arrow {
        color: #333;
      }
    }

    .address {
      position: relative;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 20px;
      background: url(@/assets/border-line.png) bottom repeat-x;
      background-size: 60px auto;
      font-size: 14px;
      color: #666;
      .left-icon {
        margin-right: 20px;
      }
      .right-icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-7px);
      }
    }

    .pay-list {
      .list {
        .goods-item {
          display: flex;
          margin-bottom: 6px;
          padding: 10px;
          height: 100px;
          background-color: #fff;
          .left {
            width: 100px;
            img {
              display: block;
              margin: 10px auto;
              width: 80px;
            }
          }
          .right {
            display: flex;
            flex: 1;
            justify-content: space-evenly;
            flex-direction: column;
            padding: 10px;
            padding-right: 0px;
            line-height: 1.3;
            color: #333;
            .detail {
              display: flex;
              justify-content: space-between;
              margin-top: 5px;
              .price {
                color: #fa2209;
              }
            }
          }
        }
      }

      .flow-num-box {
        display: flex;
        justify-content: flex-end;
        padding: 10px 10px;
        border-bottom: 1px solid #efefef;
        .money {
          margin-left: 5px;
          color: #fa2209;
        }
      }

      .pay-detail {
        border-bottom: 1px solid #efefef;
        .pay-cell {
          display: flex;
          justify-content: space-between;
          padding: 10px 12px;
          color: #333;
          .red {
            color: #fa2209;
          }
        }
      }

      .pay-way {
        padding: 10px 12px;
        border-bottom: 1px solid #efefef;
        font-size: 14px;
        color: #333;
        .tit {
          line-height: 30px;
        }
        .pay-cell {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          span {
            .van-icon {
            margin-right: 5px;
            font-size: 20px;
            }
            .red {
              color: #fa2209;
            }
          }
        }
      }

      .buytips {
        padding: 15px 12px;
        display: block;
        textarea {
          width: 100%;
          height: 100px;
          border: none;
          font-size: 14px;
          color: gray;
        }
      }
    }

    .footer-fixed {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      height: 46px;
      line-height: 46px;
      width: 100%;
      border-top: 1px solid #efefef;
      background-color: #fff;
      .left {
        // flex: 1;
        padding-left: 12px;
        span {
          color: #fa2209;
        }
      }
      .tipsbtn {
        padding: 0 20px;
        text-align: center;
        background: linear-gradient(90deg, #f9211c, #ff6335);
        font-size: 14px;
        color: #fff;
      }
    }
  }
</style>
