import gql from 'graphql-tag'

export const createInterviewMutation = gql`
mutation createInterview($data: InterviewInputData!){
  createInterview : createInterview(data: $data) {
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
export const updateInterviewMutation = gql`
mutation updateInterview($updateInterviewData: InterviewInputData!, $updateInterviewId: String!){
  updateInterview: updateInterview(data: $updateInterviewData, id: $updateInterviewId) {
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
export const deleteInterviewMutation = gql`
mutation($deleteInterviewId: String!){
  deleteInterview: deleteInterview(id: $deleteInterviewId)
}
`

export const deleteFileMutation = gql`
mutation($file: PdfFile!) {
  deleteFile: deleteFile(file: $file)
}
`
