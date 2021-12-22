
<template>
  <div>
    <!-- <button class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
      Open regular modal
    </button> -->
    <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              {{$props.editedInterview.interviewId === '' ? 'Create' : 'Edit'}} Interview
            </h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto grid grid-cols-4 gap-4 ">

          <!-- <div class="form-control"> -->
            <div class="form-control">
            <label class="label">
              <span class="label-text">Date</span>
            </label>
            <input type="datetime-local" class="input input-sm input-bordered" v-model="interviewData.date">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">FirstName</span>
            </label>
            <input type="text" class="input input-sm input-bordered" v-model="interviewData.firstName">
            </div>

            <div class="form-control col-start-3 col-end-5">
            <label class="label">
              <span class="label-text">LastName</span>
            </label>
            <input type="text" class="input input-sm input-bordered" v-model="interviewData.lastName">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">City</span>
            </label>
            <input type="text" class="input input-sm input-bordered" v-model="interviewData.city">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">Area</span>
            </label>
            <input type="text" class="input input-sm input-bordered" v-model="interviewData.area">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">Mobile</span>
            </label>
            <input type="text" class="input input-sm input-bordered" v-model="interviewData.mobile">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">Age</span>
            </label>
            <input type="number" class="input input-sm input-bordered" v-model="interviewData.age">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">Shifts</span>
            </label>
            <input type="number" class="input input-sm input-bordered" v-model="interviewData.shifts">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">HealthCertificate</span>
            </label>
            <input type="checkbox" class="checkbox checkbox-md" v-model="interviewData.healthCertificate">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">WorkPermit</span>
            </label>
            <input type="checkbox" class="checkbox checkbox-md" v-model="interviewData.workPermit">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">EfetSeminars</span>
            </label>
            <input type="checkbox" class="checkbox checkbox-md" v-model="interviewData.efetSeminars">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">Vaccinated</span>
            </label>
            <input type="checkbox" class="checkbox checkbox-md" v-model="interviewData.vaccinated">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">Doses</span>
            </label>
            <input type="number" class="input input-sm input-bordered" v-model="interviewData.doses">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">Comments</span>
            </label>
            <textarea class="textarea h-24 textarea-bordered" v-model="interviewData.comments"></textarea>
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">Result</span>
            </label>
            <input type="text" class="input input-sm input-bordered" v-model="interviewData.result">
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">ToStore</span>
              </label>
                <!-- <Multiselect
                  v-model="value"
                  mode="multiple"
                  placeholder="Select your characters"
                  :options="{
                    batman: 'Batman',
                    robin: 'Robin',
                    joker: 'Joker'
                  }"
                >
                  <template v-slot:multiplelabel="{ values }">
                    <div class="multiselect-multiple-label">
                      {{ values.length }} characters selected
                    </div>
                  </template>
                </Multiselect> -->
            <input type="text" class="input input-sm input-bordered" v-model="interviewData.toStore">
            <select name="stores" id="stores" v-model="interviewData.toStore" multiple>
              <option v-for="store in storesOptions" :key="store.id" :value="store">{{store}}</option>
            </select>
          </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">Bio</span>
            </label>
            <input type="file" name="upload" accept="application/pdf" @change='handleEncoding($event)'/>
            <input type="text" class="input input-sm" v-model="interviewData.bio" v-if="interviewData.bio !== '.pdf'"/>
           </div>

          <div class="cursor-pointer" @click="toggleModal(editedInterview.bio)" v-if="interviewData.bio !== '.pdf' ">
           <svg xmlns="http://www.w3.org/2000/svg" class="mt-8 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" v-if="interviewData.bio !== '.pdf' ">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"  />
            </svg>
          </div>

           <div class="p-6 card bordered col-start-3 col-end-4">
            <div class="form-control">
              <label class="cursor-pointer label">
                <span class="label-text">Hired</span>
                <input type="checkbox" class="toggle toggle-primary" v-model="hiredFlag">
              </label>
            </div>
          </div>

          <div class="p-6 card bordered col-start-4 col-end-5">
            <div class="form-control">
              <label class="cursor-pointer label">
                <span class="label-text">Rejected</span>
                <input type="checkbox" class="toggle toggle-primary" v-model="rejectionFlag">
              </label>
            </div>
          </div>

          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="cancelAll">
              Close
            </button>
            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="submitAdd">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
          <div v-if="showDeleteModal">
            <DeleteModal
              @refetchfordelete="deletefile"
              :sendingFile="sendingFile"
            />
        </div>

</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { defineComponent, onMounted, PropType, ref } from '@vue/runtime-core'
import moment from 'moment'

import Interview from '../interfaces/Interview'
import DeleteModal from './DeleteModal.vue'
import PdfFile from '../interfaces/PdfFile'

import InterviewInputData from '../interfaces/classes/InterviewInputData'

import { useInterviewMutations, useInterviewUpdateMutations } from '../hooks/useInterviewsMutations'

// import Multiselect from '@vueform/multiselect'
import { storesOptions } from '../assets/storeOptions'

export default defineComponent({
  name: 'regular-modal',
  emits: ['refetch', 'refetchinterviews', 'changingvalue', 'changingmessage'],
  components: {
    DeleteModal
  },
  props: {
    rowId: {
      type: String,
      required: false
    },
    editedInterview: {
      type: Object as PropType<Interview>,
      required: false
    }
  },
  setup (props, { emit }) {
    const options = ['Laravel', 'Laravel 8', 'Vue JS', 'codeplaners.com']
    const showModal = ref(true)
    const showDeleteModal = ref(false)
    const sendingFile = ref<PdfFile>()
    const rejectionFlag = ref(false)
    const hiredFlag = ref(false)

    const files = ref<any>()
    const tobase64 = ref<string>('')

    const toggleModal = (file: PdfFile) => {
      showDeleteModal.value = !showDeleteModal.value
      console.log('show me the file', file)
      sendingFile.value = file
    }

    const handleEncoding = async (e: Event) => {
      console.log('mpika sto prwto meros', e.target)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e.target === null || (e.target as HTMLInputElement).files === null) return
      files.value = (<HTMLInputElement>e.target).files
      if (files.value) {
        for await (const file of files.value) {
          const data = await encodeToBase64(file as File)
          if (data) {
            tobase64.value = data
          }
        }
      }
    }

    const encodeToBase64 = async (file: File) => {
      const res:string | undefined = await new Promise((resolve: (value: string) => void, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)

        fileReader.onload = () => resolve(fileReader.result ? `${fileReader.result.toString()}` : '')
        fileReader.onerror = reject
      }).then((res: string) => { return res }).catch(() => { return undefined })
      return res
    }

    const interviewData = ref<InterviewInputData>({
      date: '',
      city: '',
      area: '',
      firstName: '',
      lastName: '',
      mobile: '',
      age: 15,
      healthCertificate: false,
      workPermit: false,
      efetSeminars: false,
      vaccinated: false,
      doses: 0,
      shifts: 0,
      comments: [''],
      toStore: [''],
      result: '',
      bio: '.pdf'
    })

    const { createInterview } =
    useInterviewMutations(interviewData.value)

    const { updateInterview } =
    useInterviewUpdateMutations(interviewData.value)

    const submitAdd = () => {
      if (rejectionFlag.value) interviewData.value.result = 'FAILED'
      if (hiredFlag.value) interviewData.value.result = 'HIRED'
      if (interviewData.value.result === '') interviewData.value.result = null
      if (interviewData.value.bio === '.pdf') interviewData.value.bio = ''
      interviewData.value.bio = tobase64.value

      if (props.editedInterview?.interviewId === '') {
        createInterview().then((res) => {
          emit('changingmessage', res)
          // console.log('created', res)
          // console.log('what was sent', interviewData.value)
          // console.log('show from submit', tobase64.value)
          emit('refetchinterviews')
          emit('refetch')
          cancelAll()
        }).catch((err) => {
          alert(err)
        })
      } else {
        if (deleteFlag.value) {
          interviewData.value.bio = 'deleted'
          deleteFlag.value = false
        }
        updateInterview(props.editedInterview?.interviewId as string).then((res) => {
          emit('changingmessage', res)
          // console.log('updated', res)
          // console.log('what was sent', interviewData.value)
          // console.log('show from submit', tobase64.value)
          emit('refetchinterviews')
          emit('refetch')
          cancelAll()
        }).catch((err) => {
          alert(err)
        })
      }
    }

    const deleteFlag = ref(false)
    const deletefile = () => {
      deleteFlag.value = true
    }

    onMounted(() => {
      if (props.editedInterview?.interviewId !== '') {
        filledFields(props.editedInterview as Interview)
      }
    })
    const filledFields = (filledInterview :Interview) => {
      // console.log('what i sent ', filledInterview)
      interviewData.value.date = moment(filledInterview.date.toString()).format('YYYY-MM-DDThh:mm')
      interviewData.value.city = filledInterview.city
      interviewData.value.area = filledInterview.area
      interviewData.value.firstName = filledInterview.firstName
      interviewData.value.lastName = filledInterview.lastName
      interviewData.value.mobile = filledInterview.mobile
      interviewData.value.age = filledInterview.age
      interviewData.value.healthCertificate = filledInterview.healthCertificate
      interviewData.value.workPermit = filledInterview.workPermit
      interviewData.value.efetSeminars = filledInterview.efetSeminars
      interviewData.value.vaccinated = filledInterview.vaccinated
      interviewData.value.doses = filledInterview.doses
      interviewData.value.shifts = filledInterview.shifts
      interviewData.value.comments = filledInterview.comments
      interviewData.value.toStore = filledInterview.toStore
      interviewData.value.result = filledInterview.result
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      interviewData.value.bio = `${filledInterview.bio?.name}.pdf`
    }

    const cancelAll = () => {
      interviewData.value.date = ''
      interviewData.value.city = ''
      interviewData.value.area = ''
      interviewData.value.firstName = ''
      interviewData.value.lastName = ''
      interviewData.value.mobile = ''
      interviewData.value.age = 15
      interviewData.value.healthCertificate = false
      interviewData.value.workPermit = false
      interviewData.value.efetSeminars = false
      interviewData.value.vaccinated = false
      interviewData.value.doses = 0
      interviewData.value.shifts = 0
      interviewData.value.comments = ['']
      interviewData.value.toStore = ['']
      interviewData.value.result = ''
      interviewData.value.bio = ''
      showModal.value = !showModal.value
      // tobase64.value = ''
      emit('changingvalue')
    }

    return {
      interviewData,
      createInterview,
      submitAdd,
      deletefile,
      cancelAll,

      showDeleteModal,
      showModal,
      handleEncoding,
      files,
      tobase64,

      toggleModal,
      sendingFile,
      rejectionFlag,
      hiredFlag,

      options,
      storesOptions
    }
  }

})
</script>
<style lang="scss" scoped>

</style>
