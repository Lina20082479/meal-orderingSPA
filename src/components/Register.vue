<template>
<div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card card-signin flex-row my-5">
          <div class="card-img-left d-none d-md-flex">
          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Register</h5>
            <div class="form-signin">
              <div class="form-label-group">
                <input type="email" id="inputEmail" class="form-control" v-model="email" placeholder="Email address" required>
                <label for="inputEmail">Email address</label>
              </div>
              <hr>
              <div class="form-label-group">
                <input type="password" id="inputPassword" class="form-control" v-model="password" placeholder="Password" required>
                <label for="inputPassword">Password</label>
              </div>

              <div class="form-label-group">
                <input type="password" id="inputConfirmPassword" class="form-control" v-model="passwordConfirm" placeholder="Password" required>
                <label for="inputConfirmPassword">Confirm password</label>
              </div>

              <button class="btn btn-lg btn-primary btn-block text-uppercase" v-on:click="register()">Register</button>
              <router-link :to="{ name: 'Login'}"><a class="d-block text-center mt-2 small">Login</a></router-link>
              <hr class="my-4">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from '@/services/firebase'
import auth from '@/services/auth'
export default {
  data() {
    return {
      email: null,
      password: null,
      passwordConfirm: null,
    }
  },
  created(){
    if (localStorage.getItem('userId')) {
      this.$router.push({name: 'Home'})
    }
  },
  methods: {
    async register() {
      if (this.password === this.passwordConfirm) {
        const user = await firebase.register(this.email, this.password);
        const resp = await auth.createUser(this.email);
        localStorage.setItem('userId', resp.data._id)
        this.$router.push({name: 'Home'})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 darkslategray;
  overflow: hidden;
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
}

.card-signin .card-img-left {
  width: 45%;
  background: scroll center url('../assets/meal-bg.jpg');
  background-size: cover;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
  font-size: 80%;

  letter-spacing: .1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  padding: var(--input-padding-y) var(--input-padding-x);
}


.form-label-group>label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown)~label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

</style>

