import { gql } from 'apollo-boost'

export const SPELLS = gql`
  query GetSpells {
    spells {
      id
      name
      learned
      mage {
        id
        name
      }
    }
  }
`
