import React from 'react'
import { Hero } from 'rbx'
import { UiLoading } from './ui-loading'

export const UiLoadingPage = () => (
  <Hero color="link" size="fullheight">
    <Hero.Body>
      <UiLoading />
    </Hero.Body>
  </Hero>
)
