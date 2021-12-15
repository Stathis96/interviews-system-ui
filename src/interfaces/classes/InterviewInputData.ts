export default interface InterviewInputData{
  date: string,
  city: string,
  area: string,
  firstName: string,
  lastName: string,
  mobile: string,
  age: number,
  healthCertificate: boolean,
  workPermit: boolean,
  efetSeminars: boolean,
  vaccinated: boolean,
  doses : number,
  shifts : number,
  comments: string[],
  toStore : string[],
  result: string | null,
  bio?: string
}
