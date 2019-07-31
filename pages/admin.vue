<template>
  <div class="form">
    <Modal v-if="showModal" @close="showModal = false">
      <Form @save="saveArticle" @update="updateArticle" :current-article="currentArticle"></Form>
    </Modal>
     <button @click="showModal = true" class="add-article">Ny artikkel</button>
    <!-- <button class="preview">Preview</button> -->
    <h2 v-if="articles.length > 0" >Liste over artikler ({{ articles.length }})</h2>
    <h2 v-else>Det er ingen artikler</h2>
    <ul>
      <li v-for="item in articles" :key="item._id">
        <h4>{{item.title}}</h4>
        <p> Opprettet: {{currentDate}}</p>
        <!-- <p>{{item.subtitle}}</p>
        <p>{{item.text }}</p> -->
        <button @click="currentArticle = item; showModal = true" class="edit-article">Endre</button>
        <button @click="deleteArticle(item._id)" class="delete-article">Slette</button>
      </li>
    </ul>
  </div>
</template>

<script>
import Modal from '~/components/Modal.vue'
import Form from '~/components/Form.vue'
import { mapState } from 'vuex'

export default {
  name: 'Admin',
  components: {
    Modal,
    Form
  },
  middleware: ['admin'],
  async created() {
    await this.$store.dispatch('article/loadArticles')
  },
  data() {
    return {
      currentArticle: null,
      showModal: false,
      currentDate : new Date().toLocaleDateString().slice(0,10)
    }
  },
  computed: {
    ...mapState('article', { articles: state => state.articles })
  },
  methods: {
    async saveArticle(article) {
      const result = await this.$store.dispatch('article/saveArticle')(article)
      this.showModal = false
      this.$store.dispatch('layout/notify', 'Created new article')
    },

    async updateArticle({_id, title, subtitle, text, ingress, image}) {
      this.currentArticle = null
      const result = await this.$store.dispatch('article/updateArticle')({_id}, {title, subtitle, text, ingress, image})
      this.showModal = false
      this.$store.dispatch('layout/notify', 'Updated article')
    },

    async deleteArticle(_id) {
      if(confirm('Er du sikker?')) {
        await this.$store.dispatch('article/removeArticle')({ _id })
        this.$store.dispatch('layout/notify', 'Article deleted')
      }
    }
  }
}

</script>

<style scoped lang="scss">

.form {
  margin-top: 3rem;
}

.form-content {
  background-color: white;
  width: 600px;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 5px;
  position: relative;
  top: 1rem;
}

li {
  list-style: none;
  margin: 1rem 0
}

h2 {
  padding: 1.5rem 0;
  font-weight: 200;
  font-size: 32px
}

h4 {
  font-weight: 200;
  font-size: 22px
}

p {
  color: #666;
  padding: 10px 0;
  font-size: 12px;
}

.add-article{
  background-color: black;
  color: white;
  font-weight: bold;
  letter-spacing: .15px;
  text-transform: uppercase;
}
</style>
