<template>
  <div class="articles">
    <div class="article" v-for="article in articles" :key="article.id">
      <h1 class="title">
        {{article.title}}
      </h1>
      <h2 class="subtitle">
        {{article.subtitle}}
      </h2>
      <div class="sidebar-box">
        <p >{{article.ingress}}</p>
      </div>
      <nuxt-link class="read-more" :to="`/article/${article._id}`">
        Les mer
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapState('article', { articles: state => state.articles })
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

.article {
  padding: 4rem 0;
  border-bottom: 1px solid #ddd;
}

.article:last-child {
  border-bottom: none;
}

.sidebar-box {
  position: relative;
  max-height: 80px;
  overflow: hidden;
  padding: 0 15px;
  color: #333;
  background: #fff;
}
.sidebar-box:after {
    content:"";
    position:absolute;
    top:0;
    left:0;
    height:80px;
    width:100%;
    background-image: linear-gradient(to bottom, transparent, #fff);
}

a.read-more {
  color: #0045b8;
  font-size: 15px;
}

</style>
