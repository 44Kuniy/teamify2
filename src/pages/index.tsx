/** @jsx jsx */
import * as React from 'react'
import { Link } from 'gatsby'
import { jsx, css } from '@emotion/core'
import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import 'semantic-ui-css/semantic.min.css'

const h1style = css`
  background-color: #000;
  color: red;
  font-size: 24px;
  &:hover {
    color: #000;
  }
`
const IndexPage = () => (
  <IndexLayout>
    <Page>
      <Container>
        <h1 css={h1style}>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <Link to="/teamify/">Go to page 2</Link>
      </Container>
    </Page>
  </IndexLayout>
)

export default IndexPage
