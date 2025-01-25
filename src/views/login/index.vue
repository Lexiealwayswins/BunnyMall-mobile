<template>
  <div class="login">
    <!-- 头部navbar -->
    <van-nav-bar
      title="Login"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="container">
      <div class="title">
        <h3>Mobile Number Login</h3>
        <p>Unregistered numbers will be automatically registered</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="Mobile Number" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="Graphic Captcha" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" placeholder="SMS Captcha" type="text">
          <button @click="getCode">{{ second === totalSecond ? "Get SMS" : `Resend after ` + second + ` seconds` }}</button>
        </div>
      </div>

      <div @click="login" class="login-btn">Login</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getCode, codeLogin } from '@/api/login'
// import { Toast } from 'vant'

export default {
  name: 'LoginPage',
  data () {
    return {
      mobile: '', // 用户输入的手机号
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 将来请求传递的图形验证码唯一标识
      picUrl: '', // 存储请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 倒计时的秒数
      timer: null, // 定时器id
      smsCode: ''
    }
  },
  created () {
    this.getPicCode()
  },
  methods: {
    ValidFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('Please input the correct mobile number')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('Please input the correct graphic captcha')
        return false
      }
      return true
    },
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode() // 这里的getPicCode是封装的api请求模块
      this.picUrl = base64
      this.picKey = key

      // Toast('Successfully getting the graphic captcha')
      this.$toast('Successfully getting the graphic captcha')
    },
    async getCode () {
      if (!this.ValidFn) return
      if (!this.timer && this.totalSecond === this.second) {
        await getCode(this.picCode, this.picKey, this.mobile)
        this.$toast('Successfully request a SMS captcha, please check your mobile')

        this.timer = setInterval(() => {
          this.second--

          if (this.second < 1) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
      if (this.second < this.totalSecond) {
        this.$toast(`Please retry after ${this.second} seconds`)
      }
    },
    async login () {
      if (!this.ValidFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('Please input the correct SMS captcha')
        return
      }
      const res = await codeLogin(this.mobile, this.smsCode)

      this.$store.commit('user/setUserInfo', res.data)
      // 进行判断，看看地址栏有无回跳地址
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
      this.$toast('Successfully login')
    },
    destroyed () {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;
  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 10px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: solid 1px #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 10px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
}
</style>
