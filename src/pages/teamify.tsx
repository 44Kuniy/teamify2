import * as React from 'react'
import { css } from '@emotion/core'
import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import TeamifyGrid from '../components/TeamifyGrid'

const h1style = css`
  background-color: #000;
  color: red;
  font-size: 24px;
  &:hover {
    color: #000;
  }
`

const PageTwo = () => (
  <IndexLayout>
    <Page>
      <Container>
        <TeamifyGrid />
      </Container>
    </Page>
  </IndexLayout>
)

export default PageTwo
