<template>
    <div class="container">
      <Home />
    </div>
</template>

<script>
import Home from '~/components/Home.vue'

export default {
  components: {
    Home
  },
  async asyncData({ store, app }) {
    await app.store.dispatch('article/loadArticles')
  }
}
</script>

<style scoped lang="scss">

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 32px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
