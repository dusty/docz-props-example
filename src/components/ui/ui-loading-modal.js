import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'rbx'
import { UiLoading } from './ui-loading'

export const UiLoadingModal = ({ isOpen = false }) => {
  if (!isOpen) return null
  return (
    <div className="modal is-active">
      <Modal.Background />
      <Modal.Content>
        <UiLoading />
      </Modal.Content>
    </div>
  )
}

UiLoadingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired
}
