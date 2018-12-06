<template>
  <b-container fluid>
    <b-modal v-model="modalShow" @ok="handleUpdate">
      <b-row class="my-1" >
      <b-col sm="2"><label for="input-default">Dish Name:</label></b-col>
      <b-col sm="10">
        <b-form-input id="input-default" type="text" v-model="editDish.name"  placeholder="Enter dish name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2"><label for="input-default">Dish Price:</label></b-col>
      <b-col sm="10">
        <b-form-input id="input-default" type="text" v-model="editDish.price" placeholder="Enter Dish Price"></b-form-input>
      </b-col>
    </b-row>
    </b-modal>
    <b-modal id="modalPrevent" v-model="addDishModal" @ok="handleOk">
      <b-row class="my-1">
      <b-col sm="2"><label for="input-default">Name:</label></b-col>
      <b-col sm="10">
        <b-form-input id="input-default" type="text" v-model="dishName"  placeholder="Enter dish name"></b-form-input>
      </b-col>
    </b-row>
        <b-row class="my-1">
      <b-col sm="2"><label for="input-default">Ingredients:</label></b-col>
      <b-col sm="10">
        <b-form-input id="input-default" type="text" v-model="dishIngredients"  placeholder="Enter ingredients name"></b-form-input>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="2"><label for="input-default">Price:</label></b-col>
      <b-col sm="10">
        <b-form-input id="input-default" type="text" v-model="dishPrice" placeholder="Enter Dish Price"></b-form-input>
      </b-col>
    </b-row>
    </b-modal>
    <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand><router-link :to="{ name: 'Manage'}">Meal Ordering Manage</router-link></b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item><router-link :to="{ name: 'CustomerOrders'}">Customer Orders</router-link></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
          <b-button size="sm" class="my-2 my-sm-0" v-on:click="logout()">Logout</b-button>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

   <b-row class="justify-content-md-center">
    <b-col cols="9">
     <b-table :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :items="items"
             :bordered="true"
             :fields="fields">
      <template slot="action" slot-scope="data">
        <img src="../assets/edit.png" width="28px;" v-on:click="updateDish(data)"/><img width="30px;" v-on:click="deleteDish(data)" src="../assets/delete.png"/>
      </template>
    </b-table>
    </b-col>
  </b-row>
   <b-button :pressed="true" variant="success" v-on:click="addDishModal=true">Add Dish</b-button>
  </b-container>
</template>

<script>
import dishApi from '../services/dish'
export default {
  name: 'Manage',
  data () {
    return {
      sortBy: 'Dish Name',
      sortDesc: false,
      fields: [
        { key: "name",label: 'Dish Name', sortable: true },
        { key: 'ingredient'},
        { key: 'price', sortable: true },
        "action",
      ],
      items: [],
      modalShow: false,
      editDish: {name: "", price: 0},
      addDishModal: false,
      dishName: "",
      dishIngredients: "",
      dishPrice: 0,
    }
  },
  created(){
    this.getAllDishes()
  },
  methods: {
    async getAllDishes() {
      const { data: dishes} = await dishApi.fetchDishes()
      this.items = dishes.map(dish => {
        dish.quantity = 0;
        dish.ingredient = dish.ingredients.join(', ');
        return dish;
      })
    },
    updateDish(dish) {
      this.modalShow = true
      this.editDish = dish.item
    },
    deleteDish(dish) {
      const index = this.items.indexOf(dish.item);
      this.items.splice(index, 1)
    },
    logout(){
      localStorage.clear()
      this.$router.push({name: 'Login'})
    },
  async handleOk(event) {
    event.preventDefault()
    const newDish = {
      name: this.dishName,
      ingredients: this.dishIngredients.split(','),
      ingredient: this.dishIngredients,
      price: this.dishPrice,
    }
    this.addDishModal=false;
    this.items.push(newDish);
    const result = await dishApi.postDish(newDish)

    this.dishName = "";
    this.dishIngredients="";
    this.dishPrice=0
    },
    async handleUpdate() {
      event.preventDefault()
      const result = await dishApi.updateDish(this.editDish)
      console.log(result)
      this.modalShow = false
    }
  },
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
  .bg-info {
    background-color:#24292e !important;
  }

  table {
    img {
      cursor: pointer;
    }
  }
  .justify-content-md-center{
    margin-top: 30px;
  }

}

</style>

