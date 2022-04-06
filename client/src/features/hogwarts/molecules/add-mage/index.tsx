import * as React from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { Btn } from '@/components/btn'
import { MAGES } from '../mage-table/queries'
import { ADD_MAGE } from './mutations'
import * as Styled from './styled'

interface Props {
  isOpen: boolean
  close: () => void
}

export const AddMageModal: React.FC<Props> = ({ isOpen, close }) => {
  const { data: magesData, loading: magesLoading } = useQuery(MAGES)
  const [addMage] = useMutation(ADD_MAGE)
  const [name, setName] = React.useState('')
  const [age, setAge] = React.useState(null)

  if (!isOpen) return null
  if (magesLoading || !magesData) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    addMage({ variables: { name: name, age: parseInt(age) }, refetchQueries: [{ query: MAGES }] })
    close()
  }

  return (
    <Styled.Root
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close()
        }
      }}
    >
      <Styled.Modal>
        <Styled.Title>Add new mage</Styled.Title>
        <Styled.Form onSubmit={handleSubmit}>
          <label htmlFor='name'>Mage name: </label>
          <input name='name' onChange={(e) => setName(e.target.value)} value={name} type='text' required />
          <label htmlFor='name'>Mage age: </label>
          <input name='name' onChange={(e) => setAge(e.target.value)} value={age} type='number' required />
          <Btn type='submit'>Add!</Btn>
        </Styled.Form>
      </Styled.Modal>
    </Styled.Root>
  )
}
