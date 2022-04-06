import styled from 'styled-components'

export const Root = styled.div``

export const Tabs = styled.div`
  display: flex;
`

export const Tab = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  width: 50%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  border-bottom: ${(props) => (props.isActive ? '2px solid #1976d2' : 'none')};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  color: ${(props) => (props.isActive ? '#1976d2' : '#333')};
`

export const Content = styled.div`
  padding-top: 20px;
`
