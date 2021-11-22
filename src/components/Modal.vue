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
            <input type="date" class="input input-sm input-bordered" v-model="interviewData.date">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">FirstName</span>
            </label>
            <input type="text" class="input input-sm input-bordered" v-model="interviewData.firstName">
            </div>

            <div class="form-control">
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
              <span class="label-text">Result</span>
            </label>
            <input type="text" class="input input-sm input-bordered" v-model="interviewData.result">
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">Comments</span>
            </label>
            <textarea class="textarea h-24 textarea-bordered" v-model="interviewData.comments"></textarea>
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">ToStore</span>
            </label>
            <textarea class="textarea h-24 textarea-bordered" v-model="interviewData.toStore"></textarea>
            </div>

            <div class="form-control">
            <label class="label">
              <span class="label-text">Bio</span>
            </label>
            <!-- <input type="file" name="upload" accept="application/pdf" @change="call"/> -->
            <input type="text" class="input input-sm input-bordered" v-model="interviewData.bio">
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
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from '@vue/runtime-core'
import { useInterviewMutations, useInterviewUpdateMutations } from '../hooks/useInterviewsMutations'
import InterviewInputData from '../interfaces/classes/InterviewInputData'
import Interview from '../interfaces/Interview'
import moment from 'moment'

export default defineComponent({
  name: 'regular-modal',
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
    const showModal = ref(true)
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
      bio: ''
    })

    const { createInterview } =
    useInterviewMutations(interviewData.value)

    const { updateInterview } =
    useInterviewUpdateMutations(interviewData.value)

    const submitAdd = () => {
      if (props.editedInterview?.interviewId === '') {
        createInterview().then((res) => {
          console.log('created', res)
          emit('refetchinterviews')
          emit('refetch')
          cancelAll()
        }).catch((err) => {
          alert(err)
        })
      } else {
        updateInterview(props.editedInterview?.interviewId as string).then((res) => {
          console.log('updated', res)
          console.log('what was sent', interviewData.value)
          emit('refetchinterviews')
          emit('refetch')
          cancelAll()
        }).catch((err) => {
          alert(err)
        })
      }
    }
    onMounted(() => {
      if (props.editedInterview?.interviewId !== '') {
        filledFields(props.editedInterview as Interview)
      }
    })
    const filledFields = (filledInterview :Interview) => {
      // interviewData.value = { ...filledInterview, date: moment(filledInterview.date.toString()).format('YYYY-MM-DD') }
      interviewData.value.date = moment(filledInterview.date.toString()).format('YYYY-MM-DD')
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
      interviewData.value.bio = filledInterview.bio
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
      emit('changingvalue')
    }

    return {
      interviewData,
      createInterview,
      submitAdd,
      cancelAll,
      showModal
    }
  }

})
</script>
