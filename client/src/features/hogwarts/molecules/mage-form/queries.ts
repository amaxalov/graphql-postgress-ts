import { gql } from 'apollo-boost'

export const MAGE = gql`
  query GetMage($id: ID!) {
    mage(id: $id) {
      id
      name
      age
    }
  }
`
