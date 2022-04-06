import * as React from 'react'
import { useQuery } from 'react-apollo'
import { SPELLS } from './queries'
import * as Styled from './styled'

export const Table: React.FC = () => {
  const { loading, error, data } = useQuery(SPELLS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <Styled.Root>
      <Styled.Head>
        <tr>
          <th>Name</th>
          <th>Mage</th>
          <th>Learned</th>
          <th />
        </tr>
      </Styled.Head>
      <tbody>
        {data.spells.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.mage.name}</td>
            <td>
              <input type='checkbox' />
            </td>
          </tr>
        ))}
      </tbody>
    </Styled.Root>
  )
}
