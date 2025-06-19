import { cn } from '../utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('merges class names correctly', () => {
      const result = cn('px-4', 'py-2', 'bg-blue-500')
      expect(result).toBe('px-4 py-2 bg-blue-500')
    })

    it('handles conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class active-class')
    })

    it('filters out falsy values', () => {
      const result = cn('base-class', false && 'hidden-class', null, undefined, '')
      expect(result).toBe('base-class')
    })

    it('merges conflicting Tailwind classes correctly', () => {
      const result = cn('px-4', 'px-6')
      expect(result).toBe('px-6')
    })

    it('handles arrays of classes', () => {
      const result = cn(['px-4', 'py-2'], 'bg-blue-500')
      expect(result).toBe('px-4 py-2 bg-blue-500')
    })

    it('handles objects with conditional classes', () => {
      const result = cn({
        'base-class': true,
        'active-class': true,
        'hidden-class': false,
      })
      expect(result).toBe('base-class active-class')
    })

    it('handles complex combinations', () => {
      const isActive = true
      const isDisabled = false
      const result = cn(
        'btn',
        'px-4 py-2',
        {
          'bg-blue-500': isActive,
          'bg-gray-300': isDisabled,
        },
        isActive && 'hover:bg-blue-600',
        ['rounded', 'shadow']
      )
      expect(result).toBe('btn px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded shadow')
    })

    it('handles empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('handles single class name', () => {
      const result = cn('single-class')
      expect(result).toBe('single-class')
    })

    it('deduplicates identical classes', () => {
      const result = cn('px-4', 'py-2', 'px-4')
      expect(result).toBe('py-2 px-4')
    })

    it('handles responsive classes correctly', () => {
      const result = cn('px-4', 'sm:px-6', 'lg:px-8')
      expect(result).toBe('px-4 sm:px-6 lg:px-8')
    })

    it('handles hover and focus states', () => {
      const result = cn('bg-blue-500', 'hover:bg-blue-600', 'focus:bg-blue-700')
      expect(result).toBe('bg-blue-500 hover:bg-blue-600 focus:bg-blue-700')
    })

    it('handles dark mode classes', () => {
      const result = cn('bg-white', 'dark:bg-gray-900', 'text-black', 'dark:text-white')
      expect(result).toBe('bg-white dark:bg-gray-900 text-black dark:text-white')
    })

    it('resolves conflicting responsive classes', () => {
      const result = cn('px-4', 'sm:px-4', 'sm:px-6')
      expect(result).toBe('px-4 sm:px-6')
    })

    it('handles arbitrary values', () => {
      const result = cn('w-[100px]', 'h-[200px]')
      expect(result).toBe('w-[100px] h-[200px]')
    })

    it('handles important modifier', () => {
      const result = cn('!px-4', 'px-6')
      expect(result).toBe('!px-4 px-6')
    })
  })
})
