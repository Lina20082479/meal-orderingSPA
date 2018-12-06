import Api from '@/services/api'

export default {
  fetchDishes () {
    return Api.get('/dishes')
  },
  postDish (dish) {
    return Api.post('/dishes', dish)
  },
  updateDish (dish) {
    return Api.put(`/dishes/${dish._id}`, dish)
  }
}
