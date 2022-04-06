import { Container } from '@/components/container'
import * as React from 'react'
import { MageTable } from '../../molecules/mage-table'
import { SpellsTable } from '../../molecules/spells-table'
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
        <Styled.Content>{tab === 'spells' ? <SpellsTable /> : <MageTable />}</Styled.Content>
      </Container>
    </Styled.Root>
  )
}
