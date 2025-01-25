import request from '@/utils/request'

// 订单结算
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 0,
      couponId: 0,
      isUsePoints: 0,
      // shopId,
      // cartIds
      ...obj
    }
  })
}

export const submitOrder = (mode, params) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 10 delivery, 20 pick up
    couponId: 0,
    isUsePoints: 0,
    payType: 10, // balance pay
    ...params
  })
}

export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
