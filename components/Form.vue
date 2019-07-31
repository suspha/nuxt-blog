<template>
  <div class="form-content">
    <h3 v-if="article._id">Endre artikkel</h3>
    <h3 v-else>Ny artikkel</h3>
    <label for="title">Legg til tittel:</label>
    <input v-model="article.title" type="text" name="title">
    <div class="error-msg" v-if="errors.title">
      {{ errors.title.join(', ') }}
    </div>
    <br><br>
    <label for="ingress">Legg til ingress:</label>
    <input v-model="article.ingress" type="text" name="ingress">
    <div class="error-msg" v-if="errors.ingress">
      {{ errors.ingress.join(', ') }}
    </div>
    <br><br>
    <label for="subtitle">Legg til undertittel:</label>
    <input v-model="article.subtitle" type="text" name="subtitle">
    <div class="error-msg" v-if="errors.subtitle">
      {{ errors.subtitle.join(', ') }}
    </div>
    <br><br>
    <label for="image">Legg til bilde:</label>
    <input type="file" name="pic" accept="image/*">
    <br><br>
    <label for="text">Legg til tekst:</label>
    <textarea v-model="article.text" class="form-field" name="message" id="message"></textarea>
    <div class="error-msg" v-if="errors.text">
      {{ errors.text.join(', ') }}
    </div>
    <br><br>
    <button v-if="!article._id" class="add-article" @click="save">Lagre</button>
    <button v-else @click="$emit('update', article)">Lagre</button>
  </div>
</template>

<script>

import Validator from '~/lib/validator'

const validator = new Validator( {
  title: {
    required: true
  },
  ingress: {
    required: true,
  },
  subtitle: {
    required: true
  },
  text: {
    required: true
  }
})

export default {
  name: 'Form',
  props: ['currentArticle'],
  created() {
    if(this.currentArticle) {
      this.article = this.currentArticle
    }
  },
  data() {
    return {
      article: {},
      errors: {}
    }
  },
  methods: {
    save() {
      if(validator.isValid(this)) {
        this.$emit('save', this.article)
      } else {
        this.errors = validator.errors
      }
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  color: black;
  margin-bottom: 1rem;
}
</style>