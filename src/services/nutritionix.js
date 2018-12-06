import axios from 'axios'
const headers = {
  'x-app-id': '9fb0db2d',
  'x-app-key': '24530e93239d010b769be62e9a2f46b3',
  'x-remote-user-id': 0
}
export default {
  getCaloriesByIngredients: (ingredients) => {
    return axios.post(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
      query: ingredients,
      timezone: 'US/Eastern'
    }, { headers })
  }
}
