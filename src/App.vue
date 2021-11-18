<template>
<div class="h-screen">
  <Header/>
  <div class="h-5/6 w-full bg-base-300">
    <MainTable
    />
    <!-- <Modal/> -->
    <!-- <DeleteModal/> -->
  </div>
  <Footer/>
  </div>
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import MainTable from './components/MainTable.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
// import Modal from './components/Modal.vue'
// import DeleteModal from './components/DeleteModal.vue'

</script>

<style>

</style>
