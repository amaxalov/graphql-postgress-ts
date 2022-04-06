import * as React from 'react'
import styled from 'styled-components'

const BtnUi = styled.button`
  width: 220px;
  height: 40px;
  font-size: 22px;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  color: white;
  font-weight: bold;
  background-color: #1a96f6;
  transition: background-color ease-in 0.23s;
  &:hover {
    background-color: #0e81d9;
  }
`

interface Props {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export const Btn: React.FC<Props> = ({ children, onClick, type }) => (
  <BtnUi type={type} onClick={onClick}>
    {children}
  </BtnUi>
)

Btn.defaultProps = {
  onClick: null,
  type: 'button',
}
