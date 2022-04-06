import { gql } from 'apollo-boost'

export const MAGES = gql`
  query GetMages {
    mages {
      id
      name
      age
    }
  }
`
