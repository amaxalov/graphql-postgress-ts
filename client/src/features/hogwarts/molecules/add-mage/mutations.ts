import { gql } from 'apollo-boost'

export const ADD_MAGE = gql`
  mutation addMage($name: String!, $age: Int!) {
    addMage(name: $name, age: $age) {
      name
    }
  }
`
