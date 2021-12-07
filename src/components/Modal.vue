
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
            <input type="file" name="upload" accept="application/pdf" @change='handleEncoding($event)'/>
            <!-- <input type="text" class="input input-sm input-bordered" v-model="interviewData.bio"> -->
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
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
    const files = ref<any>()
    const tobase64 = ref<string>('')

    const handleEncoding = async (e: Event) => {
      console.log('mpika sto prwto meros', e.target)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e.target === null || (e.target as HTMLInputElement).files === null) return
      files.value = (<HTMLInputElement>e.target).files
      console.log('show files', files.value)
      if (files.value) {
        console.log('mpika sto deutero meros', files.value)
        for await (const af of files.value) {
          const data = await encodeToBase64(af as File)
          if (data) {
            tobase64.value = data
            console.log('deixe ka ito tobase64', tobase64.value)
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
      bio: 'data:application/pdf;JVBERi0xLjQKMSAwIG9iago8PAovQ3JlYXRvciAoT3JhY2xlMTFnUjEgQVMgUmVwb3J0cyBTZXJ2aWNlcykKL0NyZWF0aW9uRGF0ZSAoRDoyMDIxMDkxNzE0NDU1MykKL01vZERhdGUgKEQ6MjAyMTA5MTcxNDQ1NTMpCi9Qcm9kdWNlciAoT3JhY2xlIFBERiBkcml2ZXIpCi9UaXRsZSAoRm9ybSBFMSAyMDIxKQovQXV0aG9yIChBLkEuRC5FLiAgLyAgR0Rpci4gZS1Hb3YgLyBTLlMuKQo+PgplbmRvYmoKNSAwIG9iago8PC9MZW5ndGggNiAwIFIKL0ZpbHRlciBbL0FTQ0lJODVEZWNvZGUgL0ZsYXRlRGVjb2RlXQo+PgpzdHJlYW0KR2IhI1s5b24nZiUpKU8+a1poTi4sNSNAXj05S0olRzY3RSZHKENdZD9GaWpgIzInY105RTBINGxILGdzQlFmRyJCT20sbE9Xa2toCkFOdUw/XiYncDprPTg5Ui1pKkgnVnRVOlExQi9TO0lbJ0E2cSJVb11tZTs6bDhELnUjQHJXcW5VRyRNUl9qSEFacDtubU4kbmhdWwopLyIrVFFTRSVmVktwQl9VYzleUDI4P1o5InFsajtqNUBzNU0qXWcvQj41ZSJPNWhMMytjUmVaYTYyRkxrVCdpMWhFOmNsZ2wkQSUKS0E2PUw0YW43aSpldDljaElkX3BZS2xeYE4pOj8wUD1zIlU+JkUkKWdHSSEtMS9vUkNRdC9hKHIlKT89czdINzZqKyg6YVkyKS4wCiswXE41TzQ/YXApdUhmJEhQPkcxbHE/aDplUCovZ0crYmMhOWg0bE8iXnRJWEE0OGglSlFtbV0kNV5PZzQtR2RhP0g7WkYmQEE0OQozOUNYXyd0VUBjZyU3Jk5jZVs7W3AkR2tYZ1QpRyIiU21rSyo+IipbXiVMImlDWlUlPFNeKWhLMjQ3bkkjaS5sQGJBODljM20mM3IKImYoIz03S3JSVidiSCEhXHAsYFlCKiNOOj50K0k9Pi9kWj5YLiElVSJTbDxYUERTWEhBNTFEJS1Bamk9MlReTmozUDAjK19OWCI6Ck8hLlNtNyQyUT1XZThOQCpdXlpXUlQsOC88T2pxLl4sP2k9QE9FLSFGcyZyWWhrWlg5YDNscnUuIVFxM2xLS1NOOCszJUBoOyteTApqT1YqJSNIYjhMPjMmVSlYbGYncjplSj0ma2tZNjYka19YVE5dXidWJihwUE9gXzZpLSk9ck5sU0EzdCRyXiUucWUsRFpFVipiTDMKbGMmalk3WEhlS0tQMzZTUlxRXCNXRUk8aWFMUzEoQ1BsSGBkQ19kbGMsbFVpOFAnJCYvMysuMVYicFZjOnJTN11eW2RgJ3I5YUdQCkllOyFlKVBmY1lQVDxJKjlMU0suIXFbbm4jTCgjVlw/UEtKJD03OkoiJm01PiUnbSszMmZoaCxBJmNZMU4+WDZDYSZdSiJGUWpkVQptUTBFZTxtNlMrOUErVXU0Ly88TENDRE8uWmFZKGJwWT5ZVCZUMERaSEhjS11tKkdSVCprSUAjKUhxTjJkbFFpYEVHVCNxLFcoXzMKYm45PCJnIiwzazVEKEBha2FxJVg+SWs5QCxqOlgpNnFYT2NNPWtBIzY9PmcoWUhlPGYiQEk2bkwrYjlITkUkVTVyaUZiOnFhUiNbCmVEI2IuW0RWTWAmJDlZITBYMy5nIWFqPmw9cCkyalhZWGVvbzM0YD0pS1w3T3BCZzM8P2dANylbWy1ncUAhImQlOjZScC5BO3ByKQolYGZZSlpxZSxTbFE3NmpgVnUsdT0vMUEjNlkzcjZhVDQpSDk/KUYvKlElR09RcytRO2xSPnNOPVdVXSNqJmRJNzEsLW5HY1AsTS8KaGU+Zy4qa11QKVYzWGtNUlZVJjMwOWFwPDxQJyFqbTk2bW5TJ2NeOzE+ZSJzQVohNEw6bVowRXFaKzU7NFk3cUUhRWYwXS9AS0lnCmxjJyNGWVB0LTgtViU4S2BRLUhfaFthUTYtXl5rYmgzTTVQSmozUFglTD9bJCpVbzhwWUQ4NCImRjFlQzddcnA7VHFzLm9fSkxqVApNUXNjayMwVj1QTjZbMD5qYjAib2hUM0RTQEhfZFBaX1NiO2lRMFcsT2BDdW5yb1NPbmpPVG49Ij0wUW9yPk5QXSI8OmohYGNLIjwKUVBhbCQmQ3ErL0wiKT0kLSJUQkBxUiRKX1AmWVpnNStWa202RilBMldTMGNhUSlLKUFlJnQnbUBGPFAsNCk/bG1HXnQsSkM8cDJhCihVc19KQ3Anbm1VUDhCKEVyKF5sKl1DM146cFZQJE1LMlFEUVpeT0lTNVBQWm5RLlU5RT5kTlJXNEA1VFhQMFQqPmkiQCtWcitpVwpFaXFuYTtiZCMrR05jZGYyQEtgaH4+CmVuZHN0cmVhbQplbmRvYmoKNiAwIG9iagoxNTQyCmVuZG9iagoxMCAwIG9iago8PAovVHlwZSAvWE9iamVjdAovU3VidHlwZSAvSW1hZ2UKL05hbWUgL2ltMQovV2lkdGggMzY4Ci9IZWlnaHQgMzc2Ci9CaXRzUGVyQ29tcG9uZW50IDgKL0NvbG9yU3BhY2UgL0RldmljZVJHQgovRmlsdGVyIFsvQVNDSUk4NURlY29kZSAvRENURGVjb2RlXSAKL0xlbmd0aCAxMSAwIFIKPj4Kc3RyZWFtCnM0SUEwISJfYWw4T2BbXCE8PCojISEqJyJzNFtOQCEhKiokITxFMyUhPEUzJSE8RTMlITxFMyUhPEUzJSE8RTMlITxFMyUhPEUzJQohPEUzJSE8RTMlITxFMyUhPEUzJSE8RTMlITxFMyUhPEUzJSFXVW1TNk5JMmchPEUzJSE8RTMlITxFMyUhPEUzJSE8RTMlITxFMyUKITxFMyUhPEUzJSE8RTMlITxFMyUhPEUzJSE8RTMlITxFMyUhPEUzJSE8RTMlITxONTkhImZKO0dRRGFjIT9xTEYmSE10RyFXVSg8CipybDlBIlRcVykhPEUzJHohISEhIiFXclEvInBZRD8kNEhtUCE0PEA8IVdgQiohWCZULyJVInIuISEuS0shV3JFKiZIcmRqMGdRIVcKOy4wXFJFPjEwWk9lRSUqNkYiP0E7VU90WjFMYkJWI21xRmEoYD01PC03OjJqLlBzIkAyYE5mWTZVWEA0N24/M0Q7Y0hhdD0nL1UvCkBxOS5fQjR1IW9GKilQSkdCZUNaSzducjVMUFVlRVAqOyxxUUMhdSxSXEhSUVY1Qy9oV04qODFbJ2Q/T1xASzJmX28wTzZhMmxCRgpkYVFecmYlOFItZz5WJk9qUTVPZWtpcUMmbygyTUhwQG5AWHFaIko2KnJ1P0QhPEUzJSE8RTMlITw8KiIhISEhIiFXclEvInBZRD8KJDRIbVAhNDxDPSFXYD8qIjlTYzMiVSJyLiE8UkhGITxOPzgiOWZyJyJxajQhI0BWVGMrdTRdVCdMSXFVWiwkX2sxSypdV0BXS2onCigqa2BxLTFNY2cpJmFoTC1uLVcnMkUqVFUzXlo7KDdScCFAOGxKXGg8YGBDKz4lOylTQW5QZGtDMytLPkcnQTFWSEBnZCZLbmJBPQpNMklJW1BhLlEkUiRqRDtVU09gYFZsNlNwWkVwcEdbXldjV10jKUEnYFEjcz5haWAmXGVDRS4lZlwsITxqNWY9YWtOTTBxbygyTUgKcEBuQFhxWiM3TCRqLU0xIVlHTUghJ15KX24wayNnISU9UyEhJT1TISElPVMhISU9UyEhJT1TISElPVMhISU9U1YoXU9KUjBESSo9Cm0hJkkwIlNfb3JNSEBmaWcwWUZVLWowSkwsYk8kVTRbOGVZbnBVQV0jT01bMHJjZT5tcnJAWktKJiwpS0JiMSJfPXJzMSZYMkZjNQohMT9WUGxoUFZkaFMqQEZEYTMwaSlUVmQ0LWNYSUJGOGw1MStvMi08YVpvYztxL0peRkxyU0BsSSVPWl9kREdjVURlSkk2RExQKHMKSVU7ckJuU2U9dVxjLyo2Y2k0ITxrbDFZUilaSXQwWi5tX0tUJjgsNmJzMjFGMEQ6azBQQUJrNk5rYCU2YC9iTE9ycj9PTmo3V0VQCiwuXDs/XlRjVl5iUHFQcVVKZ1V1ciQrR3ItMyF0LGNnLjM+cFomcjNcO14uYUw/Lyc3W20pZiheV1hmTFRBTyE9NFsoZUhpWFNPSQpmYChxYWJQT2YlVEErX20hKjhlVV48YkwiJHFFT2hrK0QzYnFgIiVObylBXTJyXCIzTkp0KWJWP09JUi9MYGEiZV8qcD9BWUpiQk4KcFZAN0s0W0JoWVUlKVhsJU5QNkdVXEozYGhtNEU/cnJBJU5acSdoJnI1SCU4I0VLQD5DVGZxWmpFOEZrMnM4LE9aUzFcJ0NjajwuClQqKFx0SHIvKmFLZyRSQXIxJ0BockNQPUJYdC5pZTRyYTl0YFo+cDszO3ApTUxQJWM0cGdqQylhaEBJRlwkc3RdVmwrVEA9PXRidApNUFRRPWI6P3ViN2JsSW4+NSUqbFxRPyVzMjY/OEpENVInVk1fPU4wUThZITo8WzA1blFYTTAkbUc5P0tqaTJfPzpULlwjVTsiQlgKYk5mUGppVnAkLDVLKjlQa09tWzIhIUcrVlhoSSF1aDs+UixeXF5JdEJtaFJMMi9SIlpNcj9sLVMvaTNHPT09PChhKFInM0YrQCVyCj5faTRuNDgsXVFVQWs0JSV0WyJTNUE3Z2JdX0g4PGNvYSVhaiZ0bDtYZVpMJlNYXW8jb0g0XW9ESyVuWChzZ2khbjQ5MShqN1tnIQohLm86a2JNTmVYSU4vOE1yckQqVVNEcS4mcGFLIypwXHQ0JitvO11HQC8pY0lqPD1PJyNfKnJaZjpQZiY5KTxXJEtERnMx'
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
      // interviewData.value.bio = filledInterview.bio
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
      showModal,
      handleEncoding,
      files,
      tobase64
    }
  }

})
</script>
