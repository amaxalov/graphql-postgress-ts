/* eslint-disable no-unused-vars */
import * as React from 'react'
import type { Mage } from '../../types'

interface Props {
  id: Mage['id']
  name: Mage['name']
  age: Mage['age']
  updateHandler: (id: number) => void
  deleteHandler: (id: number) => void
}

export const MagesRow: React.FC<Props> = ({ id, name, age, updateHandler, deleteHandler }) => (
  <tr>
    <td>{name}</td>
    <td>{age}</td>
    <td>
      <button type='button' onClick={() => updateHandler(parseInt(id))}>
        Edit
      </button>
    </td>
    <td>
      <button type='button' onClick={() => deleteHandler(parseInt(id))}>
        Delete
      </button>
    </td>
  </tr>
)
