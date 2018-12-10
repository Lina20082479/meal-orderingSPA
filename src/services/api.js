import axios from 'axios'

const baseURL = 'https://meal-ordering-wit.herokuapp.com'

export default axios.create({baseURL})
