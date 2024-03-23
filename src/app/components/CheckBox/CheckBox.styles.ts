import { tv } from 'tailwind-variants'

const styles = tv({
  slots: {
    container: 'relative inline-flex ',
    label: 'ml-2 text-sm',
    input:
      'peer relative appearance-none form-checkbox h-4 w-4 text-pink-600 rounded-sm border focus:ring-pink-500 border-gray-300 borderfocus:outline-none focus:ring-2 focus:ring-offset-2',
  },
  variants: {
    invalid: {
      true: {
        label: '!text-red-600',
        input:
          '!border-red-500 focus:!border-red-500 bg-red-100 checked:!bg-red-400 !text-white focus:ring-red-500',
      },
    },
    disabled: {
      true: {
        label: 'text-gray-500',
        input:
          'cursor-not-allowed text-gray-400 bg-gray-100 border-gray-400 focus:border-gray-500 checked:border-gray-400 checked:border-gray-400',
      },
    },
    readOnly: {
      true: {
        input: 'cursor-not-allowed',
      },
    },
  },
})

export default styles
