import gql from 'graphql-tag'

export const getPaginatedInterviews = gql`
query getPaginatedInterviews($getPaginatedInterviewsData: PaginationInputData!,$status: String) {
  paginatedInterviews: getPaginatedInterviews(data: $getPaginatedInterviewsData,status: $status) {
    context {
    interviewId
    date
    city
    area
    firstName
    lastName
    mobile
    age
    healthCertificate
    workPermit
    efetSeminars
    vaccinated
    doses
    shifts
    comments
    toStore
    result
    bio
    isHired
    }
    total
    offset
  }
}
`

export const getAllInterviews = gql`
  query getAllInterviews{
    allInterviews: getAllInterviews {
    interviewId
    date
    city
    area
    firstName
    lastName
    mobile
    age
    healthCertificate
    workPermit
    efetSeminars
    vaccinated
    doses
    shifts
    comments
    toStore
    result
    bio
    isHired
  }
}
`

export const getNullInterviews = gql`
  query getNullInterviews{
    nullInterviews: getNullInterviews {
      interviewId
    date
    city
    area
    firstName
    lastName
    mobile
    age
    healthCertificate
    workPermit
    efetSeminars
    vaccinated
    doses
    shifts
    comments
    toStore
    result
    bio
    isHired
  }
}
`
export const getInterview = gql`
  query getInterview($getInterviewId: String!) {
    singleInterview: getInterview(id: $getInterviewId) {
      interviewId
    date
    city
    area
    firstName
    lastName
    mobile
    age
    healthCertificate
    workPermit
    efetSeminars
    vaccinated
    doses
    shifts
    comments
    toStore
    result
    isHired
    bio
    }
  }
`
export const downloadFile = gql`
  query downloadFile($file: PdfFile!, $downloadFileId: String!) {
    downloadedFile: downloadFile(file: $file, id: $downloadFileId)
  }
`
