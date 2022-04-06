import * as React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { SpellsRow } from '../../atoms/spells-row'
import { AddSpellModal } from '../add-spell'
import { Btn } from '@/components/btn'
import { SPELLS } from './queries'
import { DELETE_SPELL } from './mutations'
import * as Styled from './styled'

export const SpellsTable: React.FC = () => {
  const [isOpen, open] = React.useState(false)
  const { loading, error, data } = useQuery(SPELLS)
  const [deleteMage] = useMutation(DELETE_SPELL)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const deleteHandler = (id: string) => {
    deleteMage({ variables: { id: parseInt(id) }, refetchQueries: [{ query: SPELLS }] })
  }

  const { spells = [] } = data
  return (
    <Styled.Root>
      <Styled.BtnCont>
        <Btn onClick={() => open(true)}>Add</Btn>
      </Styled.BtnCont>
      <Styled.Table>
        <Styled.Head>
          <tr>
            <th>Name</th>
            <th>Mage</th>
            <th>Learned</th>
            <th />
            <th />
          </tr>
        </Styled.Head>
        <tbody>
          {spells.map((item) => (
            <SpellsRow
              key={item.id}
              id={item.id}
              name={item.name}
              mageName={item.mage.name}
              learned={item.learned}
              deleteHandler={deleteHandler}
            />
          ))}
        </tbody>
      </Styled.Table>
      <AddSpellModal isOpen={isOpen} close={() => open(false)} />
    </Styled.Root>
  )
}
