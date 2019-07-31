export default function({ store, redirect }) {
  const { user } = store.state.user
  if (!user) {
    store.dispatch('layout/notify', 'Du må være logget inn')
    redirect('/login')
  }
}

