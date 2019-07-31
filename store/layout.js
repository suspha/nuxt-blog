export const state = () => ({
  message: ''
})

export const mutations = {
  setMessage(state, message) {
    state.message = message
  }
}

let timeout
export const actions = {
  notify(store, message) {
    if(timeout){
      timeout = clearTimeout(timeout)
    }
    store.commit('setMessage', message)
    timeout = setTimeout(function() {
      store.commit('setMessage', '')
    }, 3000)
  }
}