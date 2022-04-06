import { Container } from '@/components/container'
import * as React from 'react'
import { Table } from '../../molecules/table'
import * as Styled from './styled'

export const Main: React.FC = () => {
  const [tab, setTab] = React.useState('spells')

  const handleTabChange = React.useCallback(
    (value: string) => {
      if (tab !== value) setTab(value)
    },
    [tab]
  )

  return (
    <Styled.Root>
      <Styled.Tabs>
        <Styled.Tab isActive={tab === 'spells'} onClick={() => handleTabChange('spells')}>
          Spells
        </Styled.Tab>
        <Styled.Tab isActive={tab === 'mages'} onClick={() => handleTabChange('mages')}>
          Mages
        </Styled.Tab>
      </Styled.Tabs>
      <Container>
        <Styled.Content>
          <Table />
        </Styled.Content>
      </Container>
    </Styled.Root>
  )
}
