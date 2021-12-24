<template>
    <div class="w-full bg-base-300 py-10">
        <div class="w-full h-screen m-2 bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded overflow-auto" style="height:80vh">
        <!-- <div class="w-full mx-auto h-screen container bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded" style="height:80vh"> -->
            <div class="flex flex-col lg:flex-row p-4 lg:p-8 justify-between items-start lg:items-stretch w-full">
                <div class="w-full lg:w-1/3 flex flex-col lg:flex-row items-start lg:items-center">

                    <div class="flex items-center relative">
                      <!-- Search Input -->
                      <input class="border-2 border-neutral bg-red transition h-10 px-5 pr-16 rounded-md focus:outline-none w-full text-black text-lg " type="text" name="search" placeholder="Search" v-model="filter"/>
                      <button type="button" class="absolute right-2 top-3 mr-2">
                        <svg class="text-black h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
                          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                        </svg>
                      </button>
                    </div>

                    <div v-if="!showNotNull" class="ml-20 flex items-center">
                      <div class="relative">
                        <label for="start" class="font-bold">Start date:</label>
                        <input type="date" id="start" name="trip-start"

                          min="2020-01-21" max="2030-12-31" v-model="startDate" >
                      </div>
                      <div class="relative">
                        <label for="start" class="font-bold">End date:</label>
                        <input type="date" id="start" name="trip-start"

                          min="2020-01-21" max="2030-12-31" v-model="endDate">
                        </div>
                    </div>

                </div>

                <div class="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                <!-- Pagination Stuff -->
                    <div class="flex items-center lg:border-l lg:border-r border-gray-300 py-3 lg:py-0 lg:px-6" >

                        <div class="dropdown dropdown-hover
                            bg-gray-200 border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm
                            mr-2">Records per Page
                                <select class="ml-6 mt-16 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-20" v-model.number="paginatedData.limit" @click="change">
                                    <option value="10" selected>10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="10000">All</option>
                                </select>
                        </div>
                        <p class="text-base text-gray-600 dark:text-gray-400" id="page-view">Viewing {{x}} - {{y}} of {{total}} </p>
                        <!-- <p class="pl-10">page: {{paginatedData.page}} limit:{{paginatedData.limit}} offset:{{offset}}</p> -->
                        <a class="text-gray-600 dark:text-gray-400 ml-2 border-transparent border cursor-pointer rounded" @click="subtract">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <polyline points="15 6 9 12 15 18" />
                            </svg>
                        </a>
                        <a class="text-gray-600 dark:text-gray-400 border-transparent border rounded focus:outline-none cursor-pointer" @click="add">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-right" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <polyline points="9 6 15 12 9 18" />
                            </svg>
                        </a>
                    </div>

                    <div class="lg:ml-6 flex items-center">
                    <!-- Button for Showing Interviews with NULL RESULT -->
                        <button class="bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm" @click="showNotNull = !showNotNull">From-To Interviews</button>
                        <button class="ml-2 bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm" @click="showPending = !showPending">Pending Interviews</button>
                        <!-- ADD NEW INTERVIEW -->
                        <div class="text-white ml-4 cursor-pointer focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 w-8 h-8 rounded flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" @click="openCreateDialog(emptyInterview)" >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End of Table's Header -->

            <!-- Populating Table -->
            <!-- xl:overflow-x-hidden -->
            <div class="w-full h-full overflow-x-scroll">
                <table class="min-w-full bg-white dark:bg-gray-800" >
                    <thead>
                        <tr class="w-full h-16 border-gray-300 border-b py-8">
                          <!-- Button for checking ALL interviews -->
                            <!-- <th class="pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                                <input type="checkbox" class="cursor-pointer relative w-5 h-5 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" onclick="checkAll(this)" />
                            </th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                                <div class="text-gray-600 dark:text-gray-400 opacity-0 cursor-default relative w-10">
                                    <div class="absolute top-0 right-0 w-5 h-5 mr-2 -mt-1 rounded-full bg-indigo-700 text-white flex justify-center items-center text-xs">3</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                    </svg>
                                </div>
                            </th> -->
                            <!-- <div class="flex flex-col"> -->
                            <th class="pl-8 text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4 cursor-pointer" title="Click to sort table with regard to Date" @click="sortData"
                            >Date</th>
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                            </svg> -->
                            <!-- </div> -->
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">FirstName</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">LastName</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">City</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">Area</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">Mobile</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">Age</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">HealthCertificate</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">WorkPermit</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">EfetSeminars</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">Vaccinated</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">Doses</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">Shifts</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-center text-sm tracking-normal leading-4">Comments</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-center text-sm tracking-normal leading-4">ToStore</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-center text-sm tracking-normal leading-4">Result</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-left text-sm tracking-normal leading-4">Bio</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-6 text-center text-sm tracking-normal leading-4">Hired</th>
                            <th class="text-gray-600 dark:text-gray-400 font-bold pr-8 text-left text-sm tracking-normal leading-4">More</th>
                        </tr>
                    </thead>
                    <!-- Table's Rows  -->
                    <tbody>
                        <tr class="h-10 border-gray-300 border-b" v-for="result in paginatedResult" :key="result.id" :result="result"
                          :class="result.isHired === null && checkIfValidShop(result) ? 'bg-yellow-100': result.isHired === false ? 'bg-red-200' : result.isHired === true ? 'bg-green-200' : 'bg-white'"
                        >
                            <td class="pl-4 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{moment(result?.date).format('L, h:mm:ss a')}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.firstName}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.lastName}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.city}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.area}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.mobile}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.age}}</td>

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.healthCertificate" class="relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.workPermit" class="relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.efetSeminars" class="relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.vaccinated" class="relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <td class="text-sm text-center pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.doses}}</td>
                            <td class="text-sm text-center pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.shifts}}</td>

                            <td class="text-sm text-center pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4" v-if="checkString(result.comments.toString())">{{result.comments.toString()}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4 tooltip" v-else>{{result.comments.toString().slice(0,18)}}
                                <p class="text-xs italic font-thin">...show more</p>
                                <span class="tooltiptext">{{result.comments.toString()}}</span>
                            </td>

                            <td class="text-sm text-center pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.toStore.toString()}}</td>

                            <!-- For Result -->
                            <td class="text-sm text-center pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.result}}</td>
                            <!-- <td class="pr-6">
                                <div v-if="result.result === null || result.result === ''" class="w-3 h-3 rounded-full bg-primary"></div>
                                <div v-else-if="result.result === 'FAILED'" class="w-3 h-3 rounded-full bg-red-600"></div>
                                <div v-else-if="checkIfValidShop(result)" class="w-3 h-3 rounded-full bg-success"></div>
                                <div v-else class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            </td> -->
                            <!-- For result -->

                            <!-- For Bio -->
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4" title="Preview PDF file">
                              <div v-if="result.bio.name !== ''">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" @click="sendMessage(result)">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              </div>
                            </td>
                            <!-- For Bio -->

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.isHired" class="relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <!-- For action bullets -->
                            <td class="pr-8 relative">
                                <div v-if="showBullets" class="opacity-0 fixed inset-0" @click="showrow"></div>
                                <div v-if="rowId === result.interviewId && showBullets" class="dropdown-content mt-8 absolute left-0 -ml-12 shadow-md z-10 w-32">
                                    <ul class="bg-white dark:bg-gray-800 shadow rounded py-1">
                                        <li class="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal" @click="openCreateDialog(result)">Edit</li>
                                        <li class="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal" @click="toggleModal(result.interviewId)">Delete</li>
                                    </ul>
                                </div>
                                <button class="text-gray-500 rounded cursor-pointer border border-transparent focus:outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" @click="openSide(result.interviewId)" class="icon icon-tabler icon-tabler-dots-vertical dropbtn" width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="19" r="1" />
                                        <circle cx="12" cy="5" r="1" />
                                    </svg>
                                </button>
                            </td>
                            <!-- For action bullets -->
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- placing message Content nearest to parent  -->
          <div class="relative" role="alert" v-if="negativeMessage">
              <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 absolute inset-x-0 top-0 h-16">
                Action Failed!
              </div>
              <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 absolute inset-x-0 top-0 h-16">
                <p>{{response}}</p>
              </div>
          </div>

          <div class="relative" role="alert" v-if="positiveMessage">
            <div class="bg-green-100 text-white font-bold rounded-t px-4 py-2 absolute inset-x-0 top-0 h-16">
              Success!
            </div>
            <div class="border border-t-0 border-green-500 rounded-b bg-green-100 px-4 py-3 text-green-900 absolute inset-x-0 top-0 h-16">
              <p>The interview was created/updated succesfully!</p>
            </div>
        </div>
        <!-- placing message Content nearest to parent  -->
        </div>
    </div>
        <div v-if="showModal">
            <DeleteModal
              :rowId="rowId"
              @changevalue='closemodal'
              @refetchinterviews='paginatedInterviews'
              @refetch='fetch'
            />
        </div>
        <div v-if="addInterview">
            <Modal
              :editedInterview="editedInterview"
              @refetchinterviews='paginatedInterviews'
              @refetch='fetch'
              @changingvalue='closemodal'
              @changingmessage="showerror"
            />
        </div>

        <div v-if="showPdf" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex" @click="hidePdf">
          <embed
            class="w-3/6 h-5/6"
            type="text/html"
            :src="`data:application/pdf;base64,${shownFile}`"
          />
        </div>
        <div v-if="showPdf" class="opacity-25 fixed inset-0 z-40 bg-black"></div>

</template>

<script lang="ts">
/* eslint-disable no-self-assign */
import { computed, defineComponent, ref, watch } from '@vue/runtime-core'
import moment from 'moment'

import { storesOptions } from '../assets/storeOptions'

import DeleteModal from './DeleteModal.vue'
import Modal from './Modal.vue'
import Interview from '../interfaces/Interview'
import PdfFile from '../interfaces/PdfFile'

import { useFetchDownloadFile, useFetchPaginatedInterviews } from '../hooks/useFetchInterviews'

export default defineComponent({
  name: 'CompactTableWithActionsAndSelect',
  components: {
    DeleteModal,
    Modal
  },
  setup () {
    const emptyInterview = ref<Interview>({
      interviewId: '',
      date: new Date(),
      city: '',
      area: '',
      firstName: '',
      lastName: '',
      mobile: '',
      age: 15,
      healthCertificate: false,
      workPermit: false,
      isHired: null,
      efetSeminars: false,
      vaccinated: false,
      doses: 0,
      shifts: 0,
      comments: [''],
      toStore: [''],
      result: '',
      bio: { path: '', name: '' }
    })
    const showBullets = ref(false)
    const showModal = ref(false)
    const addInterview = ref(false)
    const showNotNull = ref(true)
    const showPending = ref(true)
    const showPdf = ref(false)
    const rowId = ref('')
    const editedInterview = ref<Interview>()
    const shownFile = ref<string>('')

    const checkIfValidShop = (result:Interview) => {
      for (const store of storesOptions) {
        if (result.result === store) return true
      }
    }

    const sendMessage = async (interview: Interview) => {
      showPdf.value = true
      const { fetchFile } = useFetchDownloadFile()
      await fetchFile(interview.interviewId, interview.bio as PdfFile)
        .then((res) => {
          if (res === undefined) return
          shownFile.value = res
        })
    }

    const hidePdf = () => {
      showPdf.value = !showPdf.value
    }
    const toggleModal = (id: string) => {
      showModal.value = !showModal.value
      showBullets.value = false
      rowId.value = id
    }
    const openSide = (id : string) => {
      showBullets.value = !showBullets.value
      rowId.value = id
    }
    const showrow = () => {
      showBullets.value = !showBullets.value
    }
    const openCreateDialog = (interview: Interview) => {
      addInterview.value = !addInterview.value
      editedInterview.value = interview
    }
    const closemodal = () => {
      showModal.value = false
      addInterview.value = false
      showBullets.value = false
    }

    const pagination = ref({
      page: 1,
      limit: 10,
      rowsNumber: 20,
      filter: ''
    })

    const paginatedData = computed(() => {
      return {
        page: pagination.value.page,
        limit: pagination.value.limit,
        filter: pagination.value.filter
      }
    })
    const x = ref(paginatedData.value.page)
    const y = ref(paginatedData.value.limit)
    const filter = ref(paginatedData.value.filter)

    const change = () => {
      pagination.value.limit = paginatedData.value.limit
      if (paginatedData.value.limit > total.value) {
        y.value = total.value
      } else {
        y.value = paginatedData.value.limit
      }
    }
    watch(filter, () => {
      pagination.value.filter = filter.value
    })

    watch(paginatedData, () => {
      console.log('LIMIT CHANGED: ', paginatedData.value.limit)
      console.log('Filter Changed', paginatedData.value.filter)
    })

    const status = computed(() => {
      if (showNotNull.value === true && showPending.value === true) {
        console.log('pendings value', showNotNull.value)
        return undefined
      } else if (showPending.value === false && showNotNull.value === true) {
        console.log('else if', showPending.value)
        console.log()
        return 'pending'
      } else {
        console.log('start Date', startDate.value)
        console.log('end Date', endDate.value)
        return startDate.value + ',' + endDate.value
      }
    })

    const { result: paginatedResult, fetchInterviews: paginatedInterviews, total, offset } = useFetchPaginatedInterviews(paginatedData, status)
    watch(total, () => {
      pagination.value.rowsNumber = total.value
    })

    const subtract = () => {
      if (pagination.value.page - 1 <= 0) return
      pagination.value.page = pagination.value.page - 1
      if (x.value === y.value) {
        y.value = y.value - 1
      } else if (y.value === total.value && x.value !== total.value) {
        y.value = offset.value
      } else {
        y.value = y.value - pagination.value.limit
      }
      x.value = x.value - pagination.value.limit
    }

    const add = () => {
      if (x.value + pagination.value.limit > total.value) return
      pagination.value.page = pagination.value.page + 1
      x.value = x.value + pagination.value.limit
      if (y.value + pagination.value.limit > total.value) {
        y.value = total.value
      } else {
        y.value = y.value + pagination.value.limit
      }
    }

    const positiveMessage = ref(false)
    const negativeMessage = ref(false)
    const response = ref<string>('')

    const showerror = (res:any) => {
      response.value = res as string
      console.log('show response', res)
      if (!res) {
        positiveMessage.value = true
        setTimeout(() => {
          positiveMessage.value = false
        }, 5000)
      } else {
        negativeMessage.value = true
        setTimeout(() => {
          negativeMessage.value = false
        }, 5000)
      }
    }
    const checkString = (comments : string) => {
      if (comments.length < 18) return true
    }

    const showTooltip = ref(false)
    const showFullString = (comments :string) => {
      showTooltip.value = !showTooltip.value
      console.log(comments)
    }

    // const array = computed(() => {
    //   return paginatedResult.value
    // })
    const sortAscending = ref(false)
    const sortData = () => {
      if (sortAscending.value) {
        sortAscending.value = !sortAscending.value
        paginatedResult.value = paginatedResult.value.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
      } else {
        sortAscending.value = !sortAscending.value
        paginatedResult.value = paginatedResult.value.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
      }
    }

    const startDate = ref('')
    const endDate = ref('')
    console.log('start Date', startDate.value)
    console.log('endDate', endDate.value)
    return {
      moment,
      editedInterview,
      emptyInterview,

      toggleModal,
      response,
      positiveMessage,
      negativeMessage,

      showerror,
      showModal,
      showTooltip,
      showNotNull,
      showPending,
      showrow,
      showBullets,
      closemodal,

      openCreateDialog,
      openSide,
      addInterview,
      rowId,
      filter,

      fetch,
      paginatedResult,
      paginatedInterviews,

      total,
      paginatedData,
      x,
      y,
      offset,
      change,
      add,
      subtract,

      sendMessage,
      showPdf,
      shownFile,
      hidePdf,

      checkIfValidShop,
      checkString,
      showFullString,

      sortData,
      sortAscending,
      startDate,
      endDate
    }
  }
})
</script>

<style lang="scss" scoped>
//for tooltip
.tooltip {
  cursor: help;
  position: relative;
  display: table-cell;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: rgb(12, 147, 226);
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 5px;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 1%;
  margin-left: -20px;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
th {
  background: white;
  position: sticky;
  top: 0; /* Don't forget this, required for the stickiness */
  z-index: 10;
}
</style>
