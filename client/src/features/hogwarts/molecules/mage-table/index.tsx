import * as React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { Btn } from '@/components/btn'
import { MagesRow } from '../../atoms/mages-row'
import { MageForm } from '../mage-form'
import { MAGES } from './queries'
import { DELETE_MAGE } from './mutations'
import * as Styled from './styled'

export const MageTable: React.FC = () => {
  const [isOpen, open] = React.useState(false)
  const [activeId, setActiveId] = React.useState<number | void>()
  const { loading, error, data } = useQuery(MAGES)
  const [deleteMage] = useMutation(DELETE_MAGE)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const updateHandler = (id: number) => {
    setActiveId(id)
    open(true)
  }

  const deleteHandler = (id: number) => {
    deleteMage({ variables: { id: id }, refetchQueries: [{ query: MAGES }] })
  }

  const { mages = [] } = data
  return (
    <Styled.Root>
      <Styled.BtnCont>
        <Btn onClick={() => open(true)}>Add</Btn>
      </Styled.BtnCont>
      <Styled.Table>
        <Styled.Head>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th />
            <th />
          </tr>
        </Styled.Head>
        <tbody>
          {mages.map((item) => (
            <MagesRow
              key={item.id}
              id={item.id}
              name={item.name}
              age={item.age}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
            />
          ))}
        </tbody>
      </Styled.Table>
      <MageForm
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
