import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'rbx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleDoubleRight,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons'

export const UiPagination = ({
  align = 'left',
  pages = 1,
  page = 1,
  onFirst,
  onPrevious,
  onNext,
  onLast
}) => {
  if (pages < 2) return null

  return (
    <Button.Group hasAddons align={align} style={{ marginTop: '1rem' }}>
      <Button size="small" onClick={onFirst} disabled={page === 1}>
        <Icon size="small">
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </Icon>
      </Button>

      <Button size="small" onClick={onPrevious} disabled={page === 1}>
        <Icon size="small">
          <FontAwesomeIcon icon={faAngleLeft} />
        </Icon>
      </Button>

      <Button size="small" static>
        {page}/{pages}
      </Button>

      <Button size="small" onClick={onNext} disabled={page === pages}>
        <Icon size="small">
          <FontAwesomeIcon icon={faAngleRight} />
        </Icon>
      </Button>

      <Button size="small" onClick={onLast} disabled={page === pages}>
        <Icon size="small">
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </Icon>
      </Button>
    </Button.Group>
  )
}

UiPagination.propTypes = {
  align: PropTypes.oneOf(['left', 'centered', 'right']),
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onFirst: PropTypes.func,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onLast: PropTypes.func
}
