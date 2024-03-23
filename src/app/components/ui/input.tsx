import * as React from 'react'

import { cn } from 'src/app/lib/utils'
import cx from 'clsx'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean | string
  fullWidth?: boolean
  required?: boolean
  disabled?: boolean
}

const styleLabel = 'max-w-fit text-md font-medium'

const InputShadcn = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label className={cx(`${styleLabel}`)} htmlFor={label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:ring-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2',
            className,
          )}
          id={label}
          type={type}
          {...props}
        />
        {props.error && (
          <p className="text-xs text-pink-600 font-medium">{props.error}</p>
        )}
      </div>
    )
  },
)
InputShadcn.displayName = 'InputShadcn'

export { InputShadcn }
