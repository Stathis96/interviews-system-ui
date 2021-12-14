import { ref, onMounted, watch, Ref } from 'vue'
import { print } from 'graphql'
import Interview from '../interfaces/Interview'
import { GraphQLResponse } from '../interfaces/AxiosResponse'
import { downloadFile, getAllInterviews, getInterview, getNullInterviews, getPaginatedInterviews } from '../gql/Interviews/InterviewQueries'
import { api } from '../boot/axios'
import PaginationInputData from '../interfaces/classes/PaginationInputData'
import PaginatedInterviews from '../interfaces/PaginatedInterviews'
import PdfFile from '../interfaces/PdfFile'

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

export function useFetchPaginatedInterviews (variables: Ref<PaginationInputData>, status: Ref<undefined | string>) {
  const result = ref<Interview[]>([])
  const loading = ref(false)
  const total = ref<number>(0)
  const offset = ref<number>(0)

  const fetchInterviews = async () => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(getPaginatedInterviews),
          variables: {
            // data: variables
            getPaginatedInterviewsData: {
              page: variables.value.page,
              limit: variables.value.limit,
              filter: variables.value.filter
            },
            status: status?.value
          }
        }
      }) as unknown as GraphQLResponse <{ paginatedInterviews: PaginatedInterviews}>

      if (response.data.data) {
        // console.log('CHECK THIS OUT', response.data.data.paginatedInterviews)
        result.value = response.data.data.paginatedInterviews.context
        total.value = response.data.data.paginatedInterviews.total
        offset.value = response.data.data.paginatedInterviews.offset
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
  watch(variables, async () => {
    // console.log('variables are', variables)
    await fetchInterviews()
  })
  watch(status, async () => {
    await fetchInterviews().catch(e => console.log(e))
  })
  // watch(status, async () => {
  //   // console.log('variables are', variables)
  //   await fetchInterviews()
  // })
  return {
    result,
    loading,
    total,
    offset,
    fetchInterviews
  }
}

export function useFetchDownloadFile () {
  const result = ref<string>()
  const loading = ref(false)

  const fetchFile = async (id: string, file: PdfFile) => {
    try {
      loading.value = true
      const response = await api({
        url: '',
        method: 'post',
        data: {
          query: print(downloadFile),
          variables: {
            downloadFileId: id,
            file: file
          }
        }
      }) as unknown as GraphQLResponse <{ downloadedFile: string}>

      if (response.data.data) {
        return response.data.data.downloadedFile
      }
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  // onMounted(async () => {
  //   await fetchFile().catch(e => console.log(e))
  // })

  return {
    result,
    loading,
    fetchFile
  }
}
