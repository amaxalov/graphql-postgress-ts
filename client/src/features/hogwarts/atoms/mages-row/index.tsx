/* eslint-disable no-unused-vars */
import * as React from 'react'
import type { Mage } from '../../types'

interface Props {
  id: Mage['id']
  name: Mage['name']
  age: Mage['age']
  deleteHandler: (id: string) => void
}

export const MagesRow: React.FC<Props> = ({ id, name, age, deleteHandler }) => (
  <tr>
    <td>{name}</td>
    <td>{age}</td>
    <td>
      <button type='button' onClick={() => deleteHandler(id)}>
        Delete
      </button>
    </td>
  </tr>
)
