export const state = () => ({
  articles: []
})

export const mutations = {
  setArticles(state, articles) {
    state.articles = articles
  },
  saveArticle(state, article) {
    state.articles.unshift(article)
  },
  updateArticle(state, article) {
    state.articles = state.articles.map(x => x._id === article._id ? article: x)
  },
  removeArticle(state, _id) {
    state.articles = state.articles.filter(x => x._id !== _id)
  }
}

export const actions = {
  async loadArticles({ commit }) {
    const articles = await this.$db('articles/find')({}, { sort: { _id: -1 }})
    commit('setArticles', articles )
  },
  async saveArticle({ state, commit}, article){
    const result = await this.$db('articles/save')(article)
    article._id = result._id
    commit('saveArticle', article)
  },
  async updateArticle({ state, commit}, article) {
    const {_id, ...value } = article
    await this.$db('article/update')({_id}, values)
    commit('updateArticle', article)
  },
  async removeArticle({ state, commit}, _id) {
    await this.$db('article/remove')({ _id })
    commit('removeArticle', _id)
  }
}