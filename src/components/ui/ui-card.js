import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'rbx'

export const UiCard = ({ title, buttons, children }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Header.Title>{title}</Card.Header.Title>
        {buttons && (
          <Card.Header.Icon>
            <Button.Group>{buttons}</Button.Group>
          </Card.Header.Icon>
        )}
      </Card.Header>
      <Card.Content>{children}</Card.Content>
    </Card>
  )
}

UiCard.propTypes = {
  title: PropTypes.string.isRequired,
  buttons: PropTypes.any,
  children: PropTypes.any
}
