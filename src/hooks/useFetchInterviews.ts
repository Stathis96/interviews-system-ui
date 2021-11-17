import { ref, onMounted } from 'vue'
import { print } from 'graphql'
import Interview from '../interfaces/Interview'
import { GraphQLResponse } from '../interfaces/AxiosResponse'
import { getAllInterviews, getInterview, getNullInterviews } from '../gql/Interviews/InterviewQueries'
import { api } from '../boot/axios'

export function useFetchInterviews () {
  const result = ref<Interview[]>([])
  const loading = ref(false)

  const fetchInterviews = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getAllInterviews)
        }
      }) as unknown as GraphQLResponse <{ allInterviews: Interview[]}>

      if (response.data.data) {
        result.value = response.data.data.allInterviews
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchInterviews().catch(e => console.log(e))
  })

  return {
    result,
    loading,
    fetchInterviews
  }
}

export function useFetchNullInterviews () {
  const result = ref<Interview[]>([])
  const loading = ref(false)

  const fetchInterviews = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getNullInterviews)
        }
      }) as unknown as GraphQLResponse <{ nullInterviews: Interview[]}>

      if (response.data.data) {
        console.log(response.data.data.nullInterviews)
        result.value = response.data.data.nullInterviews
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchInterviews().catch(e => console.log(e))
  })

  return {
    result,
    loading,
    fetchInterviews
  }
}

export function useFetchInterviewById (id: string) {
  const result = ref<Interview>()
  const loading = ref(false)

  const fetchInterview = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getInterview),
          variables: {
            getInterviewId: id
          }
        }
      }) as unknown as GraphQLResponse <{ singleInterview: Interview}>

      if (response.data.data) {
        result.value = response.data.data.singleInterview
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  onMounted(async () => {
    await fetchInterview().catch(e => console.log(e))
  })

  return {
    result,
    loading,
    fetchInterview
  }
}
