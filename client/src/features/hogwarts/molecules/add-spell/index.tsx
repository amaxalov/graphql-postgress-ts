import * as React from 'react'
import { Btn } from '@/components/btn'
import { useMutation, useQuery } from 'react-apollo'
import { MAGES } from '../mage-table/queries'
import { SPELLS } from '../spells-table/queries'
import { ADD_SPELL } from './mutations'
import * as Styled from './styled'

interface Props {
  isOpen: boolean
  close: () => void
}

export const AddSpellModal: React.FC<Props> = ({ isOpen, close }) => {
  const { data: magesData, loading: magesLoading } = useQuery(MAGES)
  const [addSpell] = useMutation(ADD_SPELL)
  const [name, setName] = React.useState('')
  const [mage, setMage] = React.useState('')
  const [isLearned, learned] = React.useState(false)

  if (!isOpen) return null
  if (magesLoading || !magesData) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    addSpell({
      variables: { name: name, learned: isLearned, mageId: parseInt(mage) },
      refetchQueries: [{ query: SPELLS }],
    })
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
        <Styled.Title>Add new spell</Styled.Title>
        <Styled.Form onSubmit={handleSubmit}>
          <label htmlFor='name'>Spell name: </label>
          <input name='name' onChange={(e) => setName(e.target.value)} value={name} type='text' required />
          <label htmlFor='mage'>Mage name: </label>
          <select name='mage' onChange={(e) => setMage(e.target.value)} value={mage} required>
            <option hidden disabled value='' />
            {magesData?.mages.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <label htmlFor='learned'>Is learned: </label>
          <input name='learned' onChange={() => learned(!isLearned)} checked={isLearned} type='checkbox' />
          <Btn type='submit'>Add!</Btn>
        </Styled.Form>
      </Styled.Modal>
    </Styled.Root>
  )
}
