import Api from '@/services/api'

export default {
  getOrderByUserId (userId) {
    return Api.get(`/orders-search/${userId}`)
  },
  getAllOrders () {
    return Api.get('/orders')
  },
  postOrder (order) {
    return Api.post('/orders', order)
  }
}
