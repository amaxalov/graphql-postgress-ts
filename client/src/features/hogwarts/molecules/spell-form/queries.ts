import { gql } from 'apollo-boost'

export const SPELL = gql`
  query GetSpell($id: ID!) {
    spell(id: $id) {
      id
      name
      learned
      mage {
        id
      }
    }
  }
`
