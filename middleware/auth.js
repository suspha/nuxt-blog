export default function({ store, app }) {
  const user = app.$cookies.get('user') || null
  store.commit('user/setUser', user)
}
