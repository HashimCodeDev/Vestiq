import { AccessibilityTester, createAccessibilityTester, testAccessibility } from '../accessibility-test-utils'

describe('Accessibility Test Utils', () => {
  let container: HTMLElement
  let tester: AccessibilityTester

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    tester = createAccessibilityTester()
  })

  afterEach(() => {
    document.body.removeChild(container)
    tester.clearIssues()
  })

  describe('checkImageAltText', () => {
    it('should detect images without alt text', () => {
      container.innerHTML = '<img src="test.jpg">'
      
      const issues = tester.checkImageAltText(container)
      
      expect(issues).toHaveLength(1)
      expect(issues[0].rule).toBe('img-alt')
      expect(issues[0].severity).toBe('serious')
    })

    it('should not flag images with alt text', () => {
      container.innerHTML = '<img src="test.jpg" alt="Test image">'
      
      const issues = tester.checkImageAltText(container)
      
      expect(issues).toHaveLength(0)
    })

    it('should not flag images with aria-label', () => {
      container.innerHTML = '<img src="test.jpg" aria-label="Test image">'
      
      const issues = tester.checkImageAltText(container)
      
      expect(issues).toHaveLength(0)
    })

    it('should not flag decorative images', () => {
      container.innerHTML = '<img src="test.jpg" role="presentation">'
      
      const issues = tester.checkImageAltText(container)
      
      expect(issues).toHaveLength(0)
    })
  })

  describe('checkHeadingHierarchy', () => {
    it('should detect skipped heading levels', () => {
      container.innerHTML = '<h1>Title</h1><h3>Subtitle</h3>'
      
      const issues = tester.checkHeadingHierarchy(container)
      
      expect(issues).toHaveLength(1)
      expect(issues[0].rule).toBe('heading-order')
      expect(issues[0].message).toContain('skips level 2')
    })

    it('should not flag proper heading hierarchy', () => {
      container.innerHTML = '<h1>Title</h1><h2>Subtitle</h2><h3>Sub-subtitle</h3>'
      
      const issues = tester.checkHeadingHierarchy(container)
      
      expect(issues).toHaveLength(0)
    })
  })

  describe('checkFormLabels', () => {
    it('should detect form controls without labels', () => {
      container.innerHTML = '<input type="text" name="test">'
      
      const issues = tester.checkFormLabels(container)
      
      expect(issues).toHaveLength(1)
      expect(issues[0].rule).toBe('label')
      expect(issues[0].severity).toBe('serious')
    })

    it('should not flag form controls with labels', () => {
      container.innerHTML = `
        <label for="test">Test Input</label>
        <input type="text" id="test" name="test">
      `
      
      const issues = tester.checkFormLabels(container)
      
      expect(issues).toHaveLength(0)
    })

    it('should not flag form controls with aria-label', () => {
      container.innerHTML = '<input type="text" aria-label="Test input">'
      
      const issues = tester.checkFormLabels(container)
      
      expect(issues).toHaveLength(0)
    })

    it('should skip hidden inputs', () => {
      container.innerHTML = '<input type="hidden" name="csrf">'
      
      const issues = tester.checkFormLabels(container)
      
      expect(issues).toHaveLength(0)
    })
  })

  describe('checkAriaUsage', () => {
    it('should detect invalid aria-labelledby references', () => {
      container.innerHTML = '<div aria-labelledby="nonexistent">Content</div>'
      
      const issues = tester.checkAriaUsage(container)
      
      expect(issues).toHaveLength(1)
      expect(issues[0].rule).toBe('aria-labelledby')
      expect(issues[0].message).toContain('nonexistent')
    })

    it('should detect invalid aria-describedby references', () => {
      container.innerHTML = '<div aria-describedby="nonexistent">Content</div>'
      
      const issues = tester.checkAriaUsage(container)
      
      expect(issues).toHaveLength(1)
      expect(issues[0].rule).toBe('aria-describedby')
    })

    it('should not flag valid aria references', () => {
      container.innerHTML = `
        <div id="label">Label</div>
        <div aria-labelledby="label">Content</div>
      `
      
      const issues = tester.checkAriaUsage(container)
      
      expect(issues).toHaveLength(0)
    })
  })

  describe('checkKeyboardAccessibility', () => {
    it('should detect positive tabindex values', () => {
      container.innerHTML = '<div tabindex="1">Content</div>'
      
      const issues = tester.checkKeyboardAccessibility(container)
      
      expect(issues).toHaveLength(1)
      expect(issues[0].rule).toBe('tabindex')
      expect(issues[0].message).toContain('Positive tabindex')
    })

    it('should not flag negative or zero tabindex', () => {
      container.innerHTML = `
        <div tabindex="-1">Content</div>
        <div tabindex="0">Content</div>
      `
      
      const issues = tester.checkKeyboardAccessibility(container)
      
      expect(issues.filter(issue => issue.rule === 'tabindex')).toHaveLength(0)
    })
  })

  describe('runAllChecks', () => {
    it('should run all accessibility checks', () => {
      container.innerHTML = `
        <img src="test.jpg">
        <h1>Title</h1>
        <h3>Subtitle</h3>
        <input type="text">
        <div aria-labelledby="nonexistent">Content</div>
      `
      
      const issues = tester.runAllChecks(container)
      
      expect(issues.length).toBeGreaterThan(0)
      
      // Should have issues from multiple checks
      const ruleTypes = new Set(issues.map(issue => issue.rule))
      expect(ruleTypes.size).toBeGreaterThan(1)
    })
  })

  describe('getSummary', () => {
    it('should provide correct summary of issues', () => {
      // Add some test issues
      tester.runAllChecks(container)
      
      const summary = tester.getSummary()
      
      expect(summary).toHaveProperty('total')
      expect(summary).toHaveProperty('critical')
      expect(summary).toHaveProperty('serious')
      expect(summary).toHaveProperty('moderate')
      expect(summary).toHaveProperty('minor')
      expect(typeof summary.total).toBe('number')
    })
  })

  describe('testAccessibility function', () => {
    it('should be a convenience function for running tests', () => {
      container.innerHTML = '<img src="test.jpg">'
      
      const issues = testAccessibility(container)
      
      expect(Array.isArray(issues)).toBe(true)
      expect(issues.length).toBeGreaterThan(0)
    })
  })
})
