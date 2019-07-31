<template>
    <div class="article">
      <h1 class="title">
        {{article.title}}
      </h1>
      <h2 class="subtitle">
        {{article.subtitle}}
      </h2>
      <div class="sidebar-box" v-html="article.text" />
      <Comments :article="article"></Comments>
    </div>
</template>

<script>

import Comments from '~/components/Comments.vue'

export default {
  name: 'Article',

  components: {
    Comments
  },
  async created() {
    const _id = this.$route.params.id
    this.article = await this.$db('articles/get')({ _id })
  },
  data() {
    return {
      article: {}
    }
  }
}

</script>

<style scoped lang="scss">

h1 {
  font-weight: 200;
  font-size: 42px;
  margin-bottom: 5px;
}

h2 {
  font-weight: 200;
  font-size: 22px;
  margin-bottom: 15px;
  color: #333;
}

p {
  font-size: 15px;
  color: #333;
}

.articles {
  text-align: center;
  width: 800px;
  margin: 0 auto;
}
form, .comment-field {
  width: 80%;
}

</style>
