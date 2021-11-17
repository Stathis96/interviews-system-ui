import gql from 'graphql-tag'

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
    bio
    }
  }
`
