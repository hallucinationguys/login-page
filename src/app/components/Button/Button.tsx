import React from 'react'
import cx from 'clsx'
import { styles } from './Button.style'

type ButtonType = 'button' | 'submit' | undefined
type ButtonUse = 'primary' | 'secondary' | 'link' | 'default'
type ButtonFont = 'normal' | 'medium' | 'semibold' | 'bold'
type ButtonSize = 'xl' | 'lg' | 'md' | 'sm'
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
  isCompleted?: boolean
  appearance?: ButtonUse
  size?: ButtonSize
  font?: ButtonFont
  className?: string
  icon?: React.ReactElement
}

export function Button(props: Props) {
  const {
    children,
    disabled = false,
    loading = false,
    appearance = 'default',
    size = 'md',
    font = 'medium',
    className,
    icon,
    ...rest
  } = props

  return (
    <button
      className={cx(
        styles.base,
        styles.size[size],
        styles.font[font],
        styles.appearance[appearance],
        disabled && styles.disabled,
        loading && styles.loading,
        className,
      )}
      type={props?.type}
      {...rest}
    >
      <div className="w-full flex flex-row justify-center items-center ">
        {icon} {children}
      </div>
    </button>
  )
}
