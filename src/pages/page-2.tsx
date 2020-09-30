import * as React from 'react'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import MyFirstGrid from '../components/MyFirstGrid'

const PageTwo = () => (
  <IndexLayout>
    <Page>
      <Container>
        <MyFirstGrid />
      </Container>
    </Page>
  </IndexLayout>
)

export default PageTwo
