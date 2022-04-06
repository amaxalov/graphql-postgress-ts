import { gql } from 'apollo-boost'

export const DELETE_MAGE = gql`
  mutation deleteMage($id: Int!) {
    deleteMage(id: $id) {
      name
    }
  }
`
