<template>
  <div class="user">
    <div class="head-page" v-if="isLogin">
      <div class="head-imag">
        <img src="@/assets/default-avatar.png" alt="">
      </div>
      <div class="info">
        <div class="mobile">{{ detail.mobile }}</div>
        <div class="vip">
          <van-icon name="diamond-o"/>
          Standard Membership
        </div>
      </div>
    </div>

    <div v-else class="head-page" @click="$router.push('/login')">
      <div class="head-img">
        <img src="@/assets/default-avatar.png" alt="" />
      </div>
      <div class="info">
        <div class="mobile">Please login</div>
        <div class="words">Click login account</div>
      </div>
    </div>

    <div class="my-asset">
      <div class="asset-left">
        <div class="asset-left-item">
          <span v-if="isLogin">{{ detail.pay_money || 0}}</span>
          <span v-else>0</span>
          <span>Account Balance</span>
        </div>
        <div class="asset-left-item">
          <span>0</span>
          <span>Points</span>
        </div>
        <div class="asset-left-item">
          <span>0</span>
          <span>Coupon</span>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-right-item">
          <van-icon name="balance-pay" />
          <span>My wallet</span>
        </div>
      </div>
    </div>

    <div class="order-navbar">
      <div class="order-navbar-item" @click="$router.push('/myorder?dataType=all')">
        <van-icon name="balance-list-o" />
        <span>All</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/myorder?dataType=payment')">
        <van-icon name="clock-o" />
        <span>To be paid</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/myorder?dataType=delivery')">
        <van-icon name="logistics" />
        <span>To be delivered</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/myorder?dataType=received')">
        <van-icon name="send-gift-o" />
        <span>To be received</span>
      </div>
    </div>
    <div class="service">
      <div class="title">My service</div>
      <div class="content">
        <div class="content-item">
          <van-icon name="records" />
          <span>Delivery Address</span>
        </div>
        <div class="content-item">
          <van-icon name="gift-o" />
          <span>Coupon Center</span>
        </div>
        <div class="content-item">
          <van-icon name="gift-card-o" />
          <span>Coupon</span>
        </div>
        <div class="content-item">
          <van-icon name="question-o" />
          <span>Help</span>
        </div>
        <div class="content-item">
          <van-icon name="balance-o" />
          <span>My Points</span>
        </div>
        <div class="content-item">
          <van-icon name="refund-o" />
          <span>Service Center</span>
        </div>
      </div>
    </div>
    <div v-if="isLogin" class="logout-btn">
     <button @click="logout">Log Out</button>
    </div>
  </div>
</template>

<script>
import { getUserInfoDetail } from '@/api/user'
export default {
  name: 'UserPage',
  data () {
    return {
      detail: {}
    }
  },
  created () {
    if (this.isLogin) {
      this.getUserInfoDetail()
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  },
  methods: {
    async getUserInfoDetail () {
      const { data: { userInfo } } = await getUserInfoDetail()
      this.detail = userInfo
    },
    logout () {
      this.$dialog.confirm({
        title: 'Warm Tips',
        message: 'Are you sure to log out?'
      })
        .then(() => {
          this.$store.dispatch('user/logout')
        })
        .catch(() => {

        })
    }
  }
}
</script>

<style lang="less" scoped >
.user {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-bottom: 50px;
}

.head-page {
  margin-left: 20px;
  height: 130px;
  background: url("http://cba.itlike.com/public/mweb/static/background/user-header2.png");
  background-size: cover;
  display: flex;
  align-items: center;
  .head-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.info {
  margin-left: 10px;
  .mobile {
    margin-bottom: 5px;
    color: #c59a46;
    font-size: 18px;
    font-weight: bold;
  }
  .vip {
    display: inline-block;
    background-color: #3c3c3c;
    padding: 3px 5px;
    border-radius: 5px;
    color: #e0d3b6;
    font-size: 14px;
    .van-icon {
      font-weight: bold;
      color: #ffb632;
    }
  }
}
.my-asset {
  display: flex;
  padding: 20px 0;
  font-size: 14px;
  background-color: #fff;
  .asset-left {
    display: flex;
    justify-content: space-evenly;
    flex: 3;
    .asset-left-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child {
        margin-bottom: 5px;
        color: #ff0000;
        font-size: 16px;
      }
    }
  }
  .asset-right {
    flex: 1;
    .asset-right-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
      }
    }
  }
}
.order-navbar {
  display: flex;
  padding: 15px 0;
  margin: 10px;
  font-size: 11px;
  background-color: #fff;
  border-radius: 5px;
  .order-navbar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    .van-icon {
      font-size: 24px;
      margin-bottom: 5px;
    }
  }
}

.service {
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  margin: 10px;
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    font-size: 16px;
  }
  .content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 11px;
    background-color: #fff;
    border-radius: 5px;
    .content-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      margin-bottom: 20px;

      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
        color: #ff3800;
      }
    }
  }
}
.logout-btn {
  button {
    width: 60%;
    margin: 50px auto;
    display: block;
    font-size: 13px;
    color: #616161;
    border-radius: 9px;
    border: 1px solid #dcdcdc;
    padding: 7px 0;
    text-align: center;
    background-color: #fafafa;
  }
}
</style>
