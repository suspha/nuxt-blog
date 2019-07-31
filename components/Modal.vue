<template>
  <portal to="modal">
    <div class="modal">
      <a href="javascript:void(0)" @click="$emit('close')">X</a>
      <slot></slot>
    </div>
  </portal>
</template>

<script>

export default {
  name: 'Modal',
  mounted() {
    console.log('MOUNTED')
    document.body.classList.add('modal-open')
  },
  beforeDestroy() {
    console.log('DESTROYED')
    document.body.classList.remove('modal-open')
  }
}
</script>


<style scoped lang="scss">
body.modal-open {
  overflow: hidden;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
}
.modal a {
  color: white;
  text-decoration: none;
  float: right;
  margin-right: 1rem;
  margin-top: 1rem;
  font-size: 20px;
  font-weight: bold
}

h3 {
  margin-bottom: 1rem;
}
</style>
