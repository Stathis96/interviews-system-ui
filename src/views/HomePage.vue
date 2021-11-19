<template>
<div class="h-screen">
  <Header/>
  <div class="h-5/6 w-full bg-base-300">
    <MainTable
    />
  </div>
  <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/runtime-core'
import { authService } from '../boot/auth'
import MainTable from '../components/MainTable.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'

export default defineComponent({
  components: {
    MainTable, Footer, Header
  },
  setup () {
    onMounted(() => {
      // console.log('did i log?')
      authService.getProfile()
        .then((res) => {
          // console.log('res from app vue is', res)
          if (res == null) {
            authService.login()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }
})
</script>

<style lang="scss" scoped>

</style>
