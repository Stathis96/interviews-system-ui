import { ref } from 'vue'
import { print } from 'graphql'
import Interview from '../interfaces/Interview'
import InterviewInputData from '../interfaces/classes/InterviewInputData'
import { api } from '../boot/axios'
import { GraphQLResponse } from '../interfaces/AxiosResponse'
import { createInterviewMutation, deleteFileMutation, deleteInterviewMutation, updateInterviewMutation } from '../gql/Interviews/InterviewMutations'
import PdfFile from '../interfaces/PdfFile'

export function useInterviewMutations (variables: InterviewInputData) {
  const result = ref<Interview>()
  const loading = ref(false)

  const createInterview = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(createInterviewMutation),
          variables: {
            // data: variables
            data: {
              date: variables.date,
              city: variables.city,
              area: variables.area,
              firstName: variables.firstName,
              lastName: variables.lastName,
              mobile: variables.mobile,
              age: variables.age,
              healthCertificate: variables.healthCertificate,
              workPermit: variables.workPermit,
              efetSeminars: variables.efetSeminars,
              vaccinated: variables.vaccinated,
              doses: variables.doses,
              shifts: variables.shifts,
              comments: variables.comments,
              toStore: variables.toStore,
              result: variables.result,
              bio: variables.bio
            }
          }
        }
      }) as unknown as GraphQLResponse <{ createInterview: Interview}>

      if (response.data.data) {
        result.value = response.data.data.createInterview
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  return {
    createInterview,
    result,
    loading
  }
}

export function useInterviewUpdateMutations (variables: InterviewInputData) {
  const result = ref<Interview>()
  const loading = ref(false)

  const updateInterview = async (updateInterviewId: string) => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(updateInterviewMutation),
          variables: {
            // data: variables
            updateInterviewData: {
              date: variables.date,
              city: variables.city,
              area: variables.area,
              firstName: variables.firstName,
              lastName: variables.lastName,
              mobile: variables.mobile,
              age: variables.age,
              healthCertificate: variables.healthCertificate,
              workPermit: variables.workPermit,
              efetSeminars: variables.efetSeminars,
              vaccinated: variables.vaccinated,
              doses: variables.doses,
              shifts: variables.shifts,
              comments: variables.comments,
              toStore: variables.toStore,
              result: variables.result,
              bio: variables.bio
            },
            updateInterviewId: updateInterviewId
          }
        }
      }) as unknown as GraphQLResponse <{ updateInterview: Interview}>

      if (response.data.data) {
        result.value = response.data.data.updateInterview
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  return {
    updateInterview,
    result,
    loading
  }
}

export function useInterviewDeleteMutations () {
  const result = ref<void>()
  const loading = ref(false)

  const deleteInterview = async (id: string) => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(deleteInterviewMutation),
          variables: {
            // data: variables
            deleteInterviewId: id
          }
        }
      }) as unknown as GraphQLResponse <{ deleteInterview: void}>

      if (response.data.data) {
        result.value = response.data.data.deleteInterview
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  return {
    deleteInterview,
    result,
    loading
  }
}

export function useDeleteMutations () {
  const result = ref<void>()
  const loading = ref(false)

  const deleteFile = async (file: PdfFile) => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(deleteFileMutation),
          variables: {
            // data: variables
            file: file
          }
        }
      }) as unknown as GraphQLResponse <{ deleteFile: void}>

      if (response.data.data) {
        result.value = response.data.data.deleteFile
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  return {
    deleteFile,
    result,
    loading
  }
}
