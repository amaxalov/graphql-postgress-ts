/* eslint-disable no-unused-vars */
import * as React from 'react'
import type { Spell, Mage } from '../../types'

interface Props {
  id: Spell['id']
  name: Spell['name']
  mageName: Mage['name']
  learned: Spell['learned']
  deleteHandler: (id: string) => void
}

export const SpellsRow: React.FC<Props> = ({ id, name, mageName, learned, deleteHandler }) => (
  <tr>
    <td>{name}</td>
    <td>{mageName}</td>
    <td>
      <input type='checkbox' checked={learned} />
    </td>
    <td>
      <button type='button' onClick={() => deleteHandler(id)}>
        Delete
      </button>
    </td>
  </tr>
)
