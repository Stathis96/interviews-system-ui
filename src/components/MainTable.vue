<template>
    <div class="w-full bg-base-300 py-10">
        <div class="w-full mx-auto h-screen container bg-white dark:bg-gray-800 dark:bg-gray-800 shadow rounded" style="height:60vh">
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
                </div>

                <div class="w-full lg:w-2/3 flex flex-col lg:flex-row items-start lg:items-center justify-end">
                <!-- Pagination Stuff -->
                    <div class="flex items-center lg:border-l lg:border-r border-gray-300 py-3 lg:py-0 lg:px-6" v-if="showNotNull">

                        <!-- <p class="text-base text-gray-600 dark:text-gray-400 pr-4" id="page-view">Records per Page </p> -->
                        <div class="dropdown dropdown-hover
                            bg-gray-200 border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm
                            mr-2">Records per Page
                            <!-- <div class="m-1 btn">Records per Page</div> -->
                                <select class="ml-6 mt-16 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-20" v-model.number="paginatedData.limit" @click="change">
                                    <option value="3" selected>3</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
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
                    <!-- List View - Grid View Changeable -->
                    <!-- <div class="flex items-center lg:border-r border-gray-300 pb-3 lg:pb-0 lg:px-6">
                        <div class="relative w-32 z-10">
                            <div class="pointer-events-none text-gray-600 dark:text-gray-400 absolute inset-0 m-auto mr-2 xl:mr-4 z-0 w-5 h-5">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon cursor-pointer icon-tabler icon-tabler-chevron-down" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"></path>
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>

                            <select aria-label="Selected tab" class="focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray text-base form-select block w-full py-2 px-2 xl:px-3 rounded text-gray-600 dark:text-gray-400 appearance-none bg-transparent">
                                <option>List View</option>
                                <option>Grid View</option>
                            </select>
                        </div>
                    </div> -->
                    <div class="lg:ml-6 flex items-center">
                    <!-- Button for Showing Interviews with NULL RESULT -->
                        <button class="bg-gray-200 transition duration-150 ease-in-out focus:outline-none border border-transparent focus:border-gray-800 focus:shadow-outline-gray hover:bg-gray-300 rounded text-indigo-700 px-5 h-8 flex items-center text-sm" @click="showNotNull = !showNotNull">Interviews with Null Result</button>
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
            <div class="w-full h-full overflow-x-scroll xl:overflow-x-hidden">
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
                            <th class="pl-8 text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Date</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">FirstName</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">LastName</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">City</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Area</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Mobile</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Age</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">HealthCertificate</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">WorkPermit</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">EfetSeminars</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Vaccinated</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Doses</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Shifts</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Comments</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">ToStore</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Result</th>
                            <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">Bio</th>
                            <!-- <th class="text-gray-600 dark:text-gray-400 font-normal pr-6 text-left text-sm tracking-normal leading-4">
                                <div class="opacity-0 w-2 h-2 rounded-full bg-indigo-400"></div>
                            </th> -->
                            <td class="text-gray-600 dark:text-gray-400 font-normal pr-8 text-left text-sm tracking-normal leading-4">More</td>
                        </tr>
                    </thead>
                    <!-- Table's Rows  -->
                    <tbody>
                        <tr class="h-24 border-gray-300 border-b"  v-for="result in paginatedResult" :key="result.id" :result="result" v-if="showNotNull">

                            <td class="pl-4 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{moment(result?.date).format('MMMM Do YYYY')}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.firstName}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.lastName}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.city}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.area}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.mobile}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.age}}</td>

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.healthCertificate" class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.workPermit" class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.efetSeminars" class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.vaccinated" class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.doses}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.shifts}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.comments}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.toStore}}</td>

                            <!-- For Result -->
                            <td class="pr-6">
                                <div v-if="result.result === null || result.result === ''" class="w-3 h-3 rounded-full bg-success"></div>
                                <div v-else class="w-3 h-3 rounded-full bg-red-600"></div>
                            </td>
                            <!-- For result -->

                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.bio}}</td>

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
                        </tr>

                        <tr class="h-24 border-gray-300 border-b"  v-for="result in res" :key="result.id" :result="res" v-else>

                            <td class="pl-4 text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{moment(result?.date).format('MMMM Do YYYY')}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.firstName}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.lastName}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.city}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.area}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.mobile}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.age}}</td>

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.healthCertificate" class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.workPermit" class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.efetSeminars" class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <td class="pl-8 pr-6 text-left whitespace-no-wrap text-sm text-gray-800 dark:text-gray-100 tracking-normal leading-4">
                                <input type="checkbox" v-if="result.vaccinated" class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" checked disabled  />
                                <input type="checkbox" v-else class="cursor-pointer relative w-4 h-4 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none" disabled  />
                            </td>

                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.doses}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.shifts}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.comments}}</td>
                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.toStore}}</td>

                            <!-- For Result -->
                            <td class="pr-6">
                                <div v-if="result.result === null" class="w-3 h-3 rounded-full bg-success"></div>
                                <div v-else class="w-3 h-3 rounded-full bg-red-600"></div>
                            </td>
                            <!-- For result -->

                            <td class="text-sm pr-6 whitespace-no-wrap text-gray-800 dark:text-gray-100 tracking-normal leading-4">{{result.bio}}</td>

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
                        </tr>
                    </tbody>
                </table>
            </div>
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
            />
        </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/runtime-core'
import { useFetchInterviews, useFetchNullInterviews, useFetchPaginatedInterviews } from '../hooks/useFetchInterviews'
import DeleteModal from './DeleteModal.vue'
import Modal from './Modal.vue'

import moment from 'moment'
import Interview from '../interfaces/Interview'

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
      efetSeminars: false,
      vaccinated: false,
      doses: 0,
      shifts: 0,
      comments: [''],
      toStore: [''],
      result: '',
      bio: ''
    })
    const showBullets = ref(false)
    const showModal = ref(false)
    const addInterview = ref(false)
    const showNotNull = ref(true)
    const rowId = ref('')
    const editedInterview = ref<Interview>()

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
    const { result, fetchInterviews } = useFetchInterviews()
    const { result: res, fetchInterviews: fetch } = useFetchNullInterviews()

    const pagination = ref({
      page: 1,
      limit: 3,
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

    const { result: paginatedResult, fetchInterviews: paginatedInterviews, total, offset } = useFetchPaginatedInterviews(paginatedData)
    watch(total, () => {
      pagination.value.rowsNumber = total.value
    })

    // const nullToggle = ref(false)
    // const visibleData = ref<Interview[]>([])
    // watch(nullToggle, () => {
    //   if (nullToggle.value === true) {
    //     visibleData.value = res.value
    //   } else {
    //     visibleData.value = paginatedResult.value
    //   }
    // })

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
    return {
      toggleModal,
      showModal,
      closemodal,
      showNotNull,
      openCreateDialog,
      result,
      fetchInterviews,
      showrow,
      addInterview,
      showBullets,
      openSide,
      rowId,
      filter,
      moment,
      editedInterview,
      emptyInterview,
      res,
      add,
      subtract,
      fetch,
      paginatedResult,
      paginatedInterviews,
      total,
      paginatedData,
      x,
      y,
      offset,
      change
    }
  }
})
// methods: {
//   dropdownFunction (event) {
//     const dropdowns = document.getElementsByClassName('dropdown-content')
//     let i
//     const list = event.currentTarget.parentElement.parentElement.getElementsByClassName('dropdown-content')[0]
//     for (i = 0; i < dropdowns.length; i++) {
//       dropdowns[i].classList.add('hidden')
//     }
//     list.classList.toggle('hidden')
//   },
//   documentClick (event) {
//     if (!event.target.matches('.dropbtn')) {
//       const dropdowns = document.getElementsByClassName('dropdown-content')
//       let i
//       for (i = 0; i < dropdowns.length; i++) {
//         const openDropdown = dropdowns[i]
//         openDropdown.classList.add('hidden')
//       }
//     }
//   },
//   checkAll (event) {
//     const rows = event.currentTarget.parentElement.parentElement.parentElement.nextElementSibling.children
//     for (let i = 0; i < rows.length; i++) {
//       if (event.currentTarget.checked) {
//         rows[i].classList.add('bg-gray-100')
//         const checkbox = rows[i].getElementsByTagName('input')[0]
//         if (checkbox) {
//           checkbox.checked = true
//         }
//       } else {
//         rows[i].classList.remove('bg-gray-100')
//         const checkbox = rows[i].getElementsByTagName('input')[0]
//         if (checkbox) {
//           checkbox.checked = false
//         }
//       }
//     }
//   },
//   tableInteract (event) {
//     const single = event.currentTarget.parentElement.parentElement
//     single.classList.toggle('bg-gray-100')
//   },
//   pageView (val) {
//     const text = document.getElementById('page-view')
//     if (val) {
//       if (this.$data.temp === 2) {
//         this.$data.temp = 0
//       } else {
//         this.$data.temp = this.$data.temp + 1
//       }
//     } else if (this.$data.temp !== 0) {
//       this.$data.temp = this.$data.temp - 1
//     }
//     switch (this.$data.temp) {
//       case 0:
//         text.innerHTML = 'Viewing 1 - 20 of 60'
//         break
//       case 1:
//         text.innerHTML = 'Viewing 21 - 40 of 60'
//         break
//       case 2:
//         text.innerHTML = 'Viewing 41 - 60 of 60'
//     }
//   }
// },
// created () {
//   document.addEventListener('click', this.documentClick)
// },
// unmounted () {
//   document.removeEventListener('click', this.documentClick)
// },

</script>

<style lang="scss" scoped>

</style>
