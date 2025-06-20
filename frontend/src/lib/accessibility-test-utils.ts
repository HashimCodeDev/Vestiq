// Accessibility testing utilities

export interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info'
  rule: string
  message: string
  element?: Element
  severity: 'critical' | 'serious' | 'moderate' | 'minor'
}

export class AccessibilityTester {
  private issues: AccessibilityIssue[] = []

  // Check for missing alt text on images
  checkImageAltText(container: Element = document.body): AccessibilityIssue[] {
    const images = container.querySelectorAll('img')
    const issues: AccessibilityIssue[] = []

    images.forEach((img) => {
      const alt = img.getAttribute('alt')
      const ariaLabel = img.getAttribute('aria-label')
      const ariaLabelledBy = img.getAttribute('aria-labelledby')
      const role = img.getAttribute('role')

      if (!alt && !ariaLabel && !ariaLabelledBy && role !== 'presentation') {
        issues.push({
          type: 'error',
          rule: 'img-alt',
          message: 'Image missing alternative text',
          element: img,
          severity: 'serious',
        })
      }
    })

    return issues
  }

  // Check for proper heading hierarchy
  checkHeadingHierarchy(container: Element = document.body): AccessibilityIssue[] {
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const issues: AccessibilityIssue[] = []
    let previousLevel = 0

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1))
      
      if (level > previousLevel + 1) {
        issues.push({
          type: 'error',
          rule: 'heading-order',
          message: `Heading level ${level} skips level ${previousLevel + 1}`,
          element: heading,
          severity: 'moderate',
        })
      }

      previousLevel = level
    })

    return issues
  }

  // Check for form labels
  checkFormLabels(container: Element = document.body): AccessibilityIssue[] {
    const formControls = container.querySelectorAll('input, select, textarea')
    const issues: AccessibilityIssue[] = []

    formControls.forEach((control) => {
      const id = control.getAttribute('id')
      const ariaLabel = control.getAttribute('aria-label')
      const ariaLabelledBy = control.getAttribute('aria-labelledby')
      const type = control.getAttribute('type')

      // Skip hidden inputs and buttons
      if (type === 'hidden' || type === 'submit' || type === 'button') {
        return
      }

      let hasLabel = false

      if (ariaLabel || ariaLabelledBy) {
        hasLabel = true
      } else if (id) {
        const label = container.querySelector(`label[for="${id}"]`)
        if (label) {
          hasLabel = true
        }
      }

      if (!hasLabel) {
        issues.push({
          type: 'error',
          rule: 'label',
          message: 'Form control missing accessible label',
          element: control,
          severity: 'serious',
        })
      }
    })

    return issues
  }

  // Check color contrast (simplified version)
  checkColorContrast(container: Element = document.body): AccessibilityIssue[] {
    const issues: AccessibilityIssue[] = []
    const textElements = container.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, a, button')

    textElements.forEach((element) => {
      const styles = window.getComputedStyle(element)
      const fontSize = parseFloat(styles.fontSize)
      const fontWeight = styles.fontWeight

      // This is a simplified check - in a real implementation,
      // you would calculate actual contrast ratios
      const isLargeText = fontSize >= 18 || (fontSize >= 14 && (fontWeight === 'bold' || parseInt(fontWeight) >= 700))
      const requiredRatio = isLargeText ? 3 : 4.5

      // For demonstration purposes, we'll just check for common problematic combinations
      const color = styles.color
      const backgroundColor = styles.backgroundColor

      if (color === 'rgb(128, 128, 128)' && backgroundColor === 'rgb(255, 255, 255)') {
        issues.push({
          type: 'warning',
          rule: 'color-contrast',
          message: `Potential color contrast issue (required ratio: ${requiredRatio}:1)`,
          element: element,
          severity: 'serious',
        })
      }
    })

    return issues
  }

  // Check for keyboard accessibility
  checkKeyboardAccessibility(container: Element = document.body): AccessibilityIssue[] {
    const issues: AccessibilityIssue[] = []
    const interactiveElements = container.querySelectorAll('a, button, input, select, textarea, [tabindex]')

    interactiveElements.forEach((element) => {
      const tabIndex = element.getAttribute('tabindex')
      
      // Check for positive tabindex (anti-pattern)
      if (tabIndex && parseInt(tabIndex) > 0) {
        issues.push({
          type: 'warning',
          rule: 'tabindex',
          message: 'Positive tabindex values should be avoided',
          element: element,
          severity: 'moderate',
        })
      }

      // Check for missing focus indicators
      const styles = window.getComputedStyle(element, ':focus')
      if (styles.outline === 'none' && !styles.boxShadow && !styles.border) {
        issues.push({
          type: 'warning',
          rule: 'focus-visible',
          message: 'Interactive element may lack visible focus indicator',
          element: element,
          severity: 'moderate',
        })
      }
    })

    return issues
  }

  // Check ARIA usage
  checkAriaUsage(container: Element = document.body): AccessibilityIssue[] {
    const issues: AccessibilityIssue[] = []
    const elementsWithAria = container.querySelectorAll('[aria-labelledby], [aria-describedby]')

    elementsWithAria.forEach((element) => {
      const labelledBy = element.getAttribute('aria-labelledby')
      const describedBy = element.getAttribute('aria-describedby')

      if (labelledBy) {
        const labelElement = container.querySelector(`#${labelledBy}`)
        if (!labelElement) {
          issues.push({
            type: 'error',
            rule: 'aria-labelledby',
            message: `aria-labelledby references non-existent element: ${labelledBy}`,
            element: element,
            severity: 'serious',
          })
        }
      }

      if (describedBy) {
        const descriptionElement = container.querySelector(`#${describedBy}`)
        if (!descriptionElement) {
          issues.push({
            type: 'error',
            rule: 'aria-describedby',
            message: `aria-describedby references non-existent element: ${describedBy}`,
            element: element,
            severity: 'serious',
          })
        }
      }
    })

    return issues
  }

  // Run all accessibility checks
  runAllChecks(container: Element = document.body): AccessibilityIssue[] {
    const allIssues = [
      ...this.checkImageAltText(container),
      ...this.checkHeadingHierarchy(container),
      ...this.checkFormLabels(container),
      ...this.checkColorContrast(container),
      ...this.checkKeyboardAccessibility(container),
      ...this.checkAriaUsage(container),
    ]

    this.issues = allIssues
    return allIssues
  }

  // Get issues by severity
  getIssuesBySeverity(severity: AccessibilityIssue['severity']): AccessibilityIssue[] {
    return this.issues.filter(issue => issue.severity === severity)
  }

  // Get summary of issues
  getSummary(): { total: number; critical: number; serious: number; moderate: number; minor: number } {
    return {
      total: this.issues.length,
      critical: this.getIssuesBySeverity('critical').length,
      serious: this.getIssuesBySeverity('serious').length,
      moderate: this.getIssuesBySeverity('moderate').length,
      minor: this.getIssuesBySeverity('minor').length,
    }
  }

  // Clear issues
  clearIssues(): void {
    this.issues = []
  }
}

// Utility functions for testing
export const createAccessibilityTester = () => new AccessibilityTester()

export const testAccessibility = (container?: Element) => {
  const tester = createAccessibilityTester()
  return tester.runAllChecks(container)
}

// Mock screen reader announcements for testing
export const mockScreenReaderAnnouncement = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  if (typeof window === 'undefined') return

  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message

  document.body.appendChild(announcement)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}
