import { gql } from 'apollo-boost'

export const ADD_MAGE = gql`
  mutation addMage($name: String!, $age: Int!) {
    addMage(name: $name, age: $age) {
      name
    }
  }
`

export const UPDATE_MAGE = gql`
  mutation updateMage($id: Int!, $name: String!, $age: Int!) {
    updateMage(id: $id, name: $name, age: $age) {
      name
    }
  }
`
