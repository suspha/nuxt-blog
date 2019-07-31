export const state = () => ({
  comments: []
})

export const mutations = {
  setComment(state, comments) {
    state.comments = comments
  },
  insertComment(state, comment) {
    state.comments.unshift(comment)
  }
}

export const actions = {
  async loadComments ({ commit }, article) {
    const comments = await this.$db('comments/find')({ article_id: article._id }, {sort: {_id: -1 }})
    commit('setComment', comments)
  },
  async insertComment({ state, commit }, comment) {
    const result = await this.$db('comments/insert')(comment)
    comment._id = result._id
    commit('insertComment', comment)
  }
}