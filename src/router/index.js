import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'

const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')
const ProDetail = () => import('@/views/prodetail')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带 id
    { path: '/prodetail/:id', component: ProDetail }
  ]
})

// 定义一个数组，专门用于存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  // 1. to   往哪里去， 到哪去的路由信息对象
  // 2. from 从哪里来， 从哪来的路由信息对象
  // 3. next() 是否放行
  //    如果next()调用，就是放行
  //    next(路径) 拦截到某个路径页面
  // 看to.path是否在 authUrls中出现过
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }

  // 是权限页面，需要判断token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
