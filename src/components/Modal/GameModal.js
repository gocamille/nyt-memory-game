import React from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

import styles from './Modal.scss'

Modal.setAppElement('#root')

/**
 * GameModal component, renders the GameModal DOM Element.
 * @param {Object} props the default values for the Element.
 * @param {Boolean} isOpen a flag indicating whether the modal is open.
 * @param {Array} children a set of React child nodes.
 */
const GameModal = props => {
  const { isOpen, children } = props
  return (
    <Modal className={styles.container} isOpen={isOpen} contentLabel="Game Modal">
      {children}
    </Modal>
  )
}

GameModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  isOpen: PropTypes.bool,
}

export default GameModal
