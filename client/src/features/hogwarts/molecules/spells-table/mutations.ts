import { gql } from 'apollo-boost'

export const DELETE_SPELL = gql`
  mutation deleteSpell($id: Int!) {
    deleteSpell(id: $id) {
      name
    }
  }
`
