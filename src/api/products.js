import request from '@/utils/request'

export const getProList = (paramObj) => {
  const { categoryId, goodsName, page } = paramObj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}

export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

export const getGoodService = (goodsId) => {
  return request.get('/goods.service/list', {
    params: {
      goodsId
    }
  })
}

export const getComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
