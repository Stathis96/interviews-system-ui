<template>
  <div>
    <!-- <button class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
      Open delete modal
    </button> -->
    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">

            <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <div class="text-center p-5 flex-auto justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                        <p class="text-xl font-bold py-4 ">Are you sure?</p>
                        <p class="text-sm text-gray-500 px-8">Do you really want to delete this {{$props.sendingFile === undefined ? 'Interview' : 'Pdf File'}} ? This process cannot be undone</p>
             </div>

        <!--footer-->
        <div class="p-3  mt-2 text-center space-x-4 md:block">
            <button class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" v-on:click="toggleModal()">
                Cancel
            </button>
            <button class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600" @click="submitDelete">Delete</button>
        </div>

            </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/runtime-core'
import { useDeleteMutations, useInterviewDeleteMutations } from '../hooks/useInterviewsMutations'
import PdfFile from '../interfaces/PdfFile'

export default defineComponent({
  name: 'delete-modal',
  props: {
    rowId: {
      type: String,
      required: false
    },
    sendingFile: {
      type: Object as PropType<PdfFile>,
      required: false
    }
  },
  setup (props, { emit }) {
    const showModal = ref(true)

    const toggleModal = () => {
      showModal.value = !showModal.value
      emit('changevalue')
    }
    const { deleteInterview } = useInterviewDeleteMutations()
    const { deleteFile } = useDeleteMutations()

    const submitDelete = () => {
      if (props.sendingFile === undefined) {
        deleteInterview(props.rowId as string).then((res) => {
          toggleModal()
          console.log('deleted', res)
          emit('refetchinterviews')
        }).catch((err) => {
          alert(err)
        })
      } else {
        deleteFile(props.sendingFile).then((res) => {
          toggleModal()
          console.log('deleted', res)
          emit('refetchfordelete')
        }).catch((err) => {
          alert(err)
        })
      }
    }
    return {
      showModal,
      toggleModal,
      deleteInterview,
      submitDelete
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
