<template>
<!-- Dark Header component -->
 <!-- Fontswesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css">

    <header class="text-gray-100 bg-neutral body-font shadow w-full">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                <div class="flex flex-col">
                    <p class="font-bold">{{userName}}</p>
                    <p class="font-bold">{{email}}</p>
                </div>
            </nav>
            <a
                class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
                <img src="https://pazly.dev/logo.png" style="height: 40px; margin-top: 10px; margin-bottom: 10px;"
                    alt="logo">
                <span class="ml-3 text-xl">Interviews System</span>
            </a>
            <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            <button class="bg-neutral-focus hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded " @click="logout">Logout
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              </button>
            </div>
        </div>
    </header>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/runtime-core'
import { authService } from '../boot/auth'
export default defineComponent({
  setup () {
    const logout = () => {
      authService.logout()
    }
    const userName = ref('')
    const email = ref('')
    onMounted(() => {
      authService.getProfile()
        .then((res) => {
          console.log('res from app vue is', res)
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          userName.value = res.name
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          email.value = res.email
          if (res == null) {
            authService.login()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    })

    return {
      logout,
      userName,
      email
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
