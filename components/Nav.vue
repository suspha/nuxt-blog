<template>
  <div class="nav">
    <nuxt-link to="/">Home</nuxt-link>
    <nuxt-link class="admin" to="/admin">Admin</nuxt-link>
    <a href="javascript:void(0)" @click.prevent="logout" class="logout" v-if="user">Logout</a>
    <nuxt-link class="login" v-else to="/login">Login</nuxt-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Nav',

  computed: {
    ...mapState('user', { user: state => state.user })
  },

  methods: {
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100px;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
  background-color: #f3f3f3;
  background: linear-gradient(0deg, white, #f3f3f3 80%);
  a {
    padding: 0 25px;
  }
}

</style>
