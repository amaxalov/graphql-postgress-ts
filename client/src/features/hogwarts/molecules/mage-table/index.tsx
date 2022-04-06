import * as React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import { Btn } from '@/components/btn'
import { MagesRow } from '../../atoms/mages-row'
import { AddMageModal } from '../add-mage'
import { MAGES } from './queries'
import { DELETE_MAGE } from './mutations'
import * as Styled from './styled'

export const MageTable: React.FC = () => {
  const [isOpen, open] = React.useState(false)
  const { loading, error, data } = useQuery(MAGES)
  const [deleteMage] = useMutation(DELETE_MAGE)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const deleteHandler = (id: string) => {
    deleteMage({ variables: { id: parseInt(id) }, refetchQueries: [{ query: MAGES }] })
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
          </tr>
        </Styled.Head>
        <tbody>
          {mages.map((item) => (
            <MagesRow key={item.id} id={item.id} name={item.name} age={item.age} deleteHandler={deleteHandler} />
          ))}
        </tbody>
      </Styled.Table>
      <AddMageModal isOpen={isOpen} close={() => open(false)} />
    </Styled.Root>
  )
}
