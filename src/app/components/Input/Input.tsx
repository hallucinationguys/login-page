import React from 'react'
import cx from 'clsx'
import { styles } from './Input.style'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  passwordType?: string
  error?: boolean | string
  fullWidth?: boolean
  required?: boolean
  disabled?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { label, required = false, disabled = false, ...rest } = props

    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label className={cx(`${styles.label}`)} htmlFor={label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          aria-invalid={props.error ? 'true' : 'false'}
          className={cx(`${styles.base}`)}
          disabled={disabled}
          id={label}
          required={required}
          {...rest}
        />

        {props.error && (
          <p className="text-xs text-pink-600 font-medium">{props.error}</p>
        )}
      </div>
    )
  },
)

export default Input
