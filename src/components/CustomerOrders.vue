<template>
  <b-container fluid>
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
             :items="order"
             :bordered="true"
             :fields="fields">
       <template slot="index" slot-scope="data">
          {{data.index + 1}}
      </template>
      <template slot="customer_email" slot-scope="data">
        {{data.item.dishDetails.customer.email}}
      </template>
      <template slot="order_details" slot-scope="data">
        <b-list-group>
          <b-list-group-item v-for="item in data.item.dishDetails.dishes" variant="success">
            {{item.dish.name}}
            <b-badge variant="primary" pill>{{item.quantity}}</b-badge>
          </b-list-group-item>
        </b-list-group>
      </template>
    </b-table>
    </b-col>
  </b-row>
  </b-container>
</template>

<script>
import orderApi from '@/services/order';
export default {
  name: 'CustomerOrders',
  data () {
    return {
      sortBy: 'Customer Email',
      sortDesc: false,
      fields: [
        'index',
        { key: "customer_email",label: 'Customer Email', sortable: true },
        { key: "order_details",label: 'Dishes Ordered' },
      ],
      order: []
    }
  },
  async created() {
    const userId = localStorage.getItem('userId');
    const {data:orders} = await orderApi.getAllOrders();
    this.order = orders;
  },
  methods: {
    logout(){
      localStorage.clear()
      this.$router.push({name: 'Login'})
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
  .bg-info {
    background-color:#24292e !important;
  }


}

</style>

