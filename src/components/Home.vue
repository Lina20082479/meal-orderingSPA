<template>
<b-container fluid>
  <b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand><router-link :to="{ name: 'Home'}">Meal Ordering</router-link></b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav>
      <b-nav-item><router-link :to="{ name: 'MyOrders'}">My Orders</router-link></b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
        <b-button size="sm" class="my-2 my-sm-0" v-on:click="logout()">Logout</b-button>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>
<b-row class="justify-content-md-center">

        <b-col cols="12" md="auto">
        <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd">

      <b-carousel-slide>
      <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
             src="../assets/pizza.jpg" alt="image slot">
      </b-carousel-slide>

      <b-carousel-slide>
      <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
              src="../assets/steak.jpg" alt="image slot">
      </b-carousel-slide>

      <b-carousel-slide>
            <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
              src="../assets/sushi.jpg" alt="image slot">
      </b-carousel-slide>
    </b-carousel>
    </b-col>

    </b-row>
<b-row class="justify-content-md-center">
        <b-form-group horizontal label="Search" class="mb-2">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
</b-row>
  <b-row class="justify-content-md-center">
    <b-col cols="9">
     <b-table :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :items="items"
             :filter="filter"
             :bordered="true"
             :fields="fields">
      <template slot="action" slot-scope="data">
        <img src="../assets/information.png" width="28px;" v-on:click="viewDish(data)"/><img src="../assets/add.png" width="28px;" v-on:click="addDish(data)"/><img width="30px;" v-on:click="removeDish(data)" src="../assets/remove.png"/>
      </template>
    </b-table>
    <div class="total-price">Total: {{total}}</div>
    <b-button variant="success" v-on:click="submitOrder()">Submit Order</b-button>
    </b-col>
  </b-row>
  <h2>Find Us Here</h2>
  <b-row class="justify-content-md-center">
    <b-col cols="9" style="
    height: 300px;
    margin-bottom: 20px;
">
        <l-map :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker"></l-marker>
    </l-map>
    </b-col>
</b-row>
</b-container>
</template>

<script>
import dishApi from '../services/dish'
import orderApi from '../services/order'
import nutritionix from '../services/nutritionix'
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  components: {
      LMap,
      LTileLayer,
      LMarker,
  },
  data () {
    return {
      zoom:13,
      center: L.latLng(52.262471, -7.113776),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(52.262471, -7.113776),
      slide: 0,
      sliding: null,
      sortBy: 'Dish Name',
      sortDesc: false,
      fields: [
        { key: "name",label: 'Dish Name', sortable: true },
        { key: 'ingredient'},
        { key: 'price', sortable: true },
        "action",
        { key: "quantity"}
      ],
      items: [],
      order: [],
      modalShow: false,
      calories: "",
      filter: null,
    }
  },
  created() {
    this.getAllDishes()
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    async getAllDishes() {
      const { data: dishes} = await dishApi.fetchDishes()
      this.items = dishes.map(dish => {
        dish.quantity = 0;
        dish.ingredient = dish.ingredients.join(', ');
        return dish;
      })
    },
   async viewDish(data){
      const result = await nutritionix.getCaloriesByIngredients(data.item.ingredients[0]);
      let calories = `${result.data.foods[0].nf_calories} Calories`;
      this.$swal({
        title: 'Neurition Facts',
        text: `Based on nutritionix.com API this Dish contains ${calories}`,
        type: 'info',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });

    },
    addDish(data) {
      ++data.item.quantity
      const existDish = this.order.find(dish => dish._id === data.item._id)
      if (!existDish) {
        this.order.push(data.item);
      }
    },
    removeDish(data){
      if (data.item.quantity !== 0) {
        --data.item.quantity
      }
    },
    async submitOrder(){
      const submitedOrder = this.order.filter(item => item.quantity !== 0);
      const dishes = submitedOrder.map(item => {
        return {
            dish: item._id,
            quantity: item.quantity
          }
      });
      const order = {
        customer: localStorage.getItem('userId'),
        dishes
      }
      const result = await orderApi.postOrder(order);
      this.$swal({
        title: 'Order Recieved',
        text: 'Your order has been recieved',
        type: 'success',
        confirmButtonText: 'Cool'
      })
      this.order.forEach(element => element.quantity = 0);
    },
    logout() {
      localStorage.clear();
      this.$router.push({name: 'Login'})
    }
  },
  computed: {
    total() {
      if (this.order.length === 0) return 0;
      let total = 0;
       this.order.forEach(item => {
         total += item.price*item.quantity;
       })
       return `€ ${total}`;
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  .navbar-brand{
    a{
      &:hover {
        text-decoration: none;
      }
    }
  }

  .nav-link{
    a{
      &:hover {
        text-decoration: none;
      }
    }
  }

  padding: 0;
  table {
    margin-top: 10px;
  }
  .bg-info {
    background-color: #563d7c !important;
  }
  .b-table {
    img {
      margin-right: 3px;
      cursor: pointer;
    }
  }
  .btn-success{
    float: right;
  }
  .total-price{
    font-weight: bold;
  }
  .b-form-group{
    margin-top: 20px;
  }
}
</style>

