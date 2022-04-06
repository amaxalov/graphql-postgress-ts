import { gql } from 'apollo-boost'

export const ADD_SPELL = gql`
  mutation addSpell($name: String!, $learned: Boolean!, $mageId: Int!) {
    addSpell(name: $name, learned: $learned, mageId: $mageId) {
      name
    }
  }
`

export const UPDATE_SPELL = gql`
  mutation updateSpell($id: Int!, $name: String!, $learned: Boolean!, $mageId: Int!) {
    updateSpell(id: $id, name: $name, learned: $learned, mageId: $mageId) {
      name
    }
  }
`
