<template>
  <div class="login">
    <h1>Logg inn</h1>
      <div class="field-wrap">
      <label>
        Epost<span class="req">*</span>
      </label>
      <input v-model="email" type="email"/>

    </div>
    <div class="field-wrap">
      <label>
        Passord<span class="req">*</span>
      </label>
     <input v-model="pwd" type="password"/>

    </div>
    <div class="forgot-psw"><a href="#">Glemt passord?</a></div>
    <button @click="login" class="login-btn">Logg inn</button><br>
    <nuxt-link class="signup" to="/signup">Ny bruker?</nuxt-link>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      pwd: ''
    }
  },
  methods: {
    async login() {
      const user = await this.$store.dispatch('user/login', this)
      if(user) {
        this.$router.push('/admin') //redirect to admin
        this.$store.dispatch('layout/notify', 'Du er logget inn')
      } else {
        this.$store.dispatch('layout/notify', 'Epost eller passord er feil')
        window.scroll(0, 0)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  display: inline-block;
}
label {
  .req {
  	margin:2px;
  	color: grey;
  }
}

input, textarea {
  font-size:16px;
  width:60%;
  height:100%;
  padding:10px 20px;
  background:none;
  border:1px solid #ddd;
  color:black;
  border-radius:0;
  transition:border-color .25s ease, box-shadow .25s ease;
  &:focus {
		outline:0;
		border-color:#ddd;
  }
}

textarea {
  border:2px solid #ddd;
  resize: vertical;
}

.field-wrap {
  margin: 1rem 0;
}

.forgot {
  margin-top:-20px;
  text-align:right;
}

.forgot-psw {
  margin-bottom: 1rem;
}
</style>