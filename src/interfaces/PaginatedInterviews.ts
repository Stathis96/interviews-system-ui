import Interview from './Interview'

export default interface PaginatedInterviews{
  offset: number;
  context : Interview[],
  total: number
}
