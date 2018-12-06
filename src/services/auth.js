import Api from '@/services/api'

export default {
  createUser (email) {
    const user = {
      email
    }
    return Api.post('/users', user)
  },
  getUserByEmail (email) {
    return Api.get(`/user-search/${email}`)
  }
}
