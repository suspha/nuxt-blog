<template>
  <div>
    <Nav />
    <div class="notification" v-if="message">
      {{ message }}
    </div>
    <div class="content">
      <nuxt />
    </div>
    <portal-target name="modal" />
    <Footer />
  </div>

</template>


<script>
import Modal from '~/components/Modal.vue'
import Nav from '~/components/Nav.vue'
import Footer from '~/components/Footer.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Modal,
    Nav,
    Footer
  },
  computed: {
    ...mapState('layout', { message: state => state.message }),
  }
}
</script>
<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  text-align: center;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.content {
  margin: 0 auto;
  text-align: center;
  max-width: 800px;
  background-color: white;
}

label {
  font-size: 14px;
  color: #333;
}

img {
  max-width: 100%;
}

input[type=text] {
  width: 90%;
  padding: 10px 15px;
  margin: 8px 0;
  box-sizing: border-box;
}

textarea {
  height: 180px;
  padding: 10px 15px;
  width: 90%;
  box-sizing: border-box;
}

button {
  margin-bottom: 1rem;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
}

.error-msg{
  color: white;
  font-size: 12px;
  background-color: red;
  padding: 10px;
}
</style>
