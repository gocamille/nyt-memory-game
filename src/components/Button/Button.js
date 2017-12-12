import React from 'react'
import PropTypes from 'prop-types'

import styles from './Button.scss'

/**
 * Button component, renders the Button DOM Element.
 * @param {Object} props the values for the Element.
 * @param {Function} props.action function that triggers a state change.
 * @param {Boolean} props.disabled a flag that indicates if the button can be clicked.
 */
const Button = props => {
  const { action, children, disabled } = props
  return (
    <button disabled={disabled} className={styles.button} type="button" onClick={action}>
      {children}
    </button>
  )
}

Button.propTypes = {
  action: PropTypes.func,
  children: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Button
