<template>
  <div class="login">
    <h1>Ny bruker</h1>
      <div class="field-wrap">
      <label>
        Fornavn<span class="req">*</span>
      </label>
       <input v-model="surname" type="text"/>
       <div class="error-msg" v-if="errors.surname">
         {{ errors.surname.join(', ') }}
       </div>
       <br><br>
      <label>
        Etternavn<span class="req">*</span>
      </label>
      <input v-model="lastname" type="text"/>
      <div class="error-msg" v-if="errors.lastname">
        {{ errors.lastname.join(', ') }}
      </div>
       <br><br>
      <label>
        Epost<span class="req">*</span>
      </label>
      <input v-model="email" type="email"/>
      <div class="error-msg" v-if="errors.email">
        {{ errors.email.join(', ') }}
      </div>
      <br><br>
    </div>
    <div class="field-wrap">
      <label>
        Passord<span class="req">*</span>
      </label>
      <input v-model="pwd" type="password"/>
      <div class="error-msg" v-if="errors.pwd">
        {{ errors.pwd.join(', ') }}
      </div>
      <br><br>
      <label>
        Gjenta passord<span class="req">*</span>
      </label>
      <input v-model="confirm" type="password"/>
      <div class="error-msg" v-if="errors.confirm">
        {{ errors.confirm.join(', ') }}
      </div>
      <br><br>
    </div>
    <button class="submit__new-user" @click="submitNewUser">Opprett</button><br>
    <nuxt-link to="/">Tilbake</nuxt-link>

  </div>
</template>

<script>
import Validator from '~/lib/validator'
import { mapState } from 'vuex'

const validator = new Validator( {
  surname: {
    required: true
  },
  lastname: {
    required: true,
    minlength: 3
  },
  email: {
    required: true,
    is: '$email'
  },
  pwd: {
    required: true,
    minlength: 5
  },
  confirm: {
    match: 'pwd'
  },
})

export default {
  name: 'Signup',
  data() {
    return {
      surname: '',
      lastname: '',
      email: '',
      pwd: '',
      confirm: '',
      errors: {}
    }
  },
  computed: {
    ...mapState('user', { user: state => state.user })
  },
  methods: {
    async submitNewUser() {
      if (validator.isValid(this)) {
        await this.$store.dispatch('user/insertUser', this)
        this.$router.push('/admin') //redirect to admin
        alert('Velkommen, du er nå logget inn!')
      } else {
        this.errors = validator.errors
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