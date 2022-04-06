/* eslint-disable no-unused-vars */
import * as React from 'react'
import type { Spell, Mage } from '../../types'

interface Props {
  id: Spell['id']
  name: Spell['name']
  mageName: Mage['name']
  learned: Spell['learned']
  updateHandler: (id: number) => void
  deleteHandler: (id: number) => void
}

export const SpellsRow: React.FC<Props> = ({ id, name, mageName, learned, updateHandler, deleteHandler }) => (
  <tr>
    <td>{name}</td>
    <td>{mageName}</td>
    <td>
      <input type='checkbox' checked={learned} />
    </td>
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
