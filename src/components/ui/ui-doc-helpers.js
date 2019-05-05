import React from 'react'
import PropTypes from 'prop-types'
import { Button, Box, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons'

export const ExampleBox = ({ text = 'Example Box' }) => <Box>{text}</Box>
ExampleBox.propTypes = {
  text: PropTypes.string
}

export const ExampleButtonCog = () => (
  <Button size="small" color="link">
    <Icon size="small" align="left">
      <FontAwesomeIcon icon={faCog} />
    </Icon>
  </Button>
)

export const ExampleButtonSearch = () => (
  <Button size="small" color="link">
    <Icon size="small" align="left">
      <FontAwesomeIcon icon={faSearch} />
    </Icon>
  </Button>
)
