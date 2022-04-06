import * as React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { SpellsRow } from '../../atoms/spells-row'
import { SpellForm } from '../spell-form'
import { Btn } from '@/components/btn'
import { SPELLS } from './queries'
import { DELETE_SPELL } from './mutations'
import * as Styled from './styled'

export const SpellsTable: React.FC = () => {
  const [isOpen, open] = React.useState(false)
  const [activeId, setActiveId] = React.useState<number | void>()
  const { loading, error, data } = useQuery(SPELLS)
  const [deleteMage] = useMutation(DELETE_SPELL)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const updateHandler = (id: number) => {
    setActiveId(id)
    open(true)
  }

  const deleteHandler = (id: number) => {
    deleteMage({ variables: { id: id }, refetchQueries: [{ query: SPELLS }] })
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
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
            />
          ))}
        </tbody>
      </Styled.Table>
      <SpellForm
        id={activeId}
        isOpen={isOpen}
        close={() => {
          setActiveId(undefined)
          open(false)
        }}
      />
    </Styled.Root>
  )
}
