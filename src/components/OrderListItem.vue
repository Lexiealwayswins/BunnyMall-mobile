<template>
  <div class="order-list-item" v-if="item.order_id">
    <!-- 时间和状态栏 -->
    <div class="tit">
      <div class="time">{{ item.create_time }}</div>
      <div class="status">
        <span>{{ item.state_text }}</span>
      </div>
    </div>
    <div class="list">
      <div class="list-item" v-for="goods in item" :key="goods.goods_id">
        <div class="goods-img">
            <img :src="goods.goods_image" alt="">
        </div>
        <div class="goods-content">{{ goods.goods_name }}</div>
        <div class="goods-trade">
          <p>$ {{ goods.total_pay_price }}</p>
          <p>x {{ goods.total_num }}</p>
        </div>
      </div>
    </div>
    <div class="total">
        {{ item.total_num }} products, $ {{ item.total_price }} in total
    </div>
    <div class="actions">
      <div v-if="item.order_status === 10">
        <span v-if="item.pay_status === 10">Pay Now</span>
        <span v-else-if="item.deliver_status === 10">Cancel</span>
        <span v-else-if="item.deliver_status === 20 || item.deliver_status === 30">Received</span>
      </div>
      <div v-if="item.order_status === 30">
        <span>Comment</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {

      }
    }
  }
}
</script>

<style lang="less" scoped>
  .order-list-item {
    padding: 46px 15px 15px 15px;
    width: 94%;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0.5px 2px 0 rgba(0,0,0,.05);
    color: #333;
    font-size: 13px;
    .tit {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      height: 24px;
      line-height: 24px;
      .status {
        color: #fa2209;
      }
    }
    .list {
      .list-item {
        display: flex;
        .goods-img {
          margin: 0 10px 10px 0;
          width: 90px;
          height: 90px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .goods-content {
          flex: 2;
          margin-top: 8px;
          max-height: 36px;
          line-height: 18px;
        }
        .goods-trade {
          flex: 1;
          margin-top: 8px;
          line-height: 18px;
          text-align: right;
          color: #b39999;
        }
      }
    }

    .total {
      text-align: right;
    }
    .actions {
      text-align: right;
      span {
        display: inline-block;
        padding: 0 15px;
        margin: 10px 0;
        height: 28px;
        line-height: 28px;
        border: solid 0.5cm #a8a8a8;
        border-radius: 5px;
        font-size: 14px;
      }
    }

  }
</style>
