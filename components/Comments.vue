<template>
<div class="comment-section">
  <div class="commentForm">
    Navn: <input v-model="name" placeholder="Brukernavn" type="text"><br>
    <div class="error-msg" v-if="errors.name">
      {{ errors.name.join(', ') }}
    </div><br>
    Epost: <input v-model="email" placeholder="Din epost" type="text">
    <div class="error-msg" v-if="errors.email">
      {{ errors.email.join(', ') }}
    </div>
  </div><br>
  Kommentar:
  <textarea v-model="text" class="comment-field" placeholder="Din kommentar..."></textarea>
  <div class="error-msg" v-if="errors.text">
    {{ errors.text.join(', ') }}
  </div><br><br>
  <button @click="createComment">Send</button>
  <div class="list-comment" v-for="comment in comments" :key="comment._id">
    <span>{{comment.name}}, dato: {{currentDate}}</span><br>
    {{comment.text}}
  </div>
</div>

</template>


<script>
import { mapState } from 'vuex'
import Validator from '~/lib/validator'

const validator = new Validator( {
  name: {
    required: true,
    minlength: 3
  },
  email: {
    required: true,
    is: '$email'
  },
  text: {
    required: true,
    maxlength: 120
  }
})


export default {
  name: 'Comments',
  props: ['article'],

  async created() {
    const _id = this.$route.params.id
    await this.$store.dispatch('comment/loadComments', this.article)
  },
  data() {
    return {
      name: '',
      email: '',
      text: '',
      currentDate : new Date().toLocaleDateString().slice(0,10),
      errors: {}
    }
  },
  computed: {
    ...mapState('comment', { comments: state => state.comments })
  },
  methods: {
    async createComment() {
      if (validator.isValid(this)) {
        const { name, email, text} = this
        const comment = {name, email, text, article_id: this.article._id}
        await this.$store.dispatch('comments/insertComment')(comment)
      } else {
        this.errors = validator.errors
      }
    }
  }
}

</script>

<style scoped lang="scss">
.comment-section {
  margin-top: 2rem;
  position: relative;
}

.list-comment{
  margin: 1rem 0;
}

span {
  color: #666;
  font-size: 12px;
  margin: 1rem 0;
}

input[type=text] {
  width: 40%;
  padding: 8px 15px;
  margin: 8px 0;
  box-sizing: border-box;
}

textarea {
  height: 120px;
  padding: 10px 15px;
  width: 40%;
  box-sizing: border-box;
}

</style>
