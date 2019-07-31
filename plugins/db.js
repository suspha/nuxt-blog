import client from 'waveorb-client'
const { http } = client()

export default ({}, inject) => {
  inject('db', http)
}
