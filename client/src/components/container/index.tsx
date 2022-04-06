import * as React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1280px;
`


export const Container: React.FC = ({children}) => (
  <Root>
    {children}
  </Root>
)
