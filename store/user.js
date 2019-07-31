export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user) {
    console.log('MUTATE:', user)
    if (user) {
      this.$cookies.set('user', user)
    } else {
      this.$cookies.remove('user')
    }
    state.user = user
  }
}

export const actions = {
  logout({ commit }) {
    commit('setUser', null)
  },

  async login({ commit }, { email, pwd }) {
    const user = await this.$db('users/get')({ email, pwd })
    if(user) {
      commit('setUser', user)
    }
    return user
  },

  async insertUser({ commit }, { surname, lastname, email, pwd }) {
    const user = { surname, lastname, email, pwd }
    const result = await this.$db('users/insert')(user)
    user._id = result._id
    commit('setUser', user)
  }
}
