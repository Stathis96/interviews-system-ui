import Interview from './Interview'

export default interface PaginatedInterviews{
  context : Interview[],
  total: number
}
