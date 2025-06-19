import { PerformanceMonitor, FPSMonitor, getMemoryUsage, analyzeBundleSize } from '../performance'

describe('Performance Utilities', () => {
  describe('PerformanceMonitor', () => {
    let monitor: PerformanceMonitor

    beforeEach(() => {
      monitor = PerformanceMonitor.getInstance()
      monitor.clearMetrics()
    })

    it('should be a singleton', () => {
      const monitor1 = PerformanceMonitor.getInstance()
      const monitor2 = PerformanceMonitor.getInstance()
      expect(monitor1).toBe(monitor2)
    })

    it('should measure function execution time', () => {
      const testFunction = () => {
        // Simulate some work
        for (let i = 0; i < 1000; i++) {
          Math.random()
        }
        return 'result'
      }

      const result = monitor.measureFunction('test-function', testFunction)
      
      expect(result).toBe('result')
      expect(monitor.getAverage('test-function')).toBeGreaterThan(0)
    })

    it('should measure async function execution time', async () => {
      const asyncFunction = async () => {
        await new Promise(resolve => setTimeout(resolve, 10))
        return 'async-result'
      }

      const result = await monitor.measureAsyncFunction('async-test', asyncFunction)
      
      expect(result).toBe('async-result')
      expect(monitor.getAverage('async-test')).toBeGreaterThanOrEqual(10)
    })

    it('should record and calculate metrics correctly', () => {
      monitor.recordMetric('test-metric', 10)
      monitor.recordMetric('test-metric', 20)
      monitor.recordMetric('test-metric', 30)

      expect(monitor.getAverage('test-metric')).toBe(20)
    })

    it('should return all metrics with statistics', () => {
      monitor.recordMetric('metric1', 10)
      monitor.recordMetric('metric1', 20)
      monitor.recordMetric('metric2', 5)

      const allMetrics = monitor.getAllMetrics()

      expect(allMetrics).toEqual({
        metric1: {
          average: 15,
          count: 2,
          latest: 20,
        },
        metric2: {
          average: 5,
          count: 1,
          latest: 5,
        },
      })
    })

    it('should clear metrics', () => {
      monitor.recordMetric('test', 10)
      expect(monitor.getAverage('test')).toBe(10)

      monitor.clearMetrics()
      expect(monitor.getAverage('test')).toBe(0)
    })
  })

  describe('FPSMonitor', () => {
    let fpsMonitor: FPSMonitor

    beforeEach(() => {
      fpsMonitor = new FPSMonitor()
      // Mock requestAnimationFrame
      global.requestAnimationFrame = jest.fn((cb) => {
        setTimeout(cb, 16) // ~60fps
        return 1
      })
    })

    afterEach(() => {
      fpsMonitor.stop()
    })

    it('should start and stop monitoring', () => {
      expect(fpsMonitor.getFPS()).toBe(0)
      
      fpsMonitor.start()
      expect(fpsMonitor.getFPS()).toBe(0) // Initial value
      
      fpsMonitor.stop()
    })

    it('should not start multiple times', () => {
      const requestAnimationFrameSpy = jest.spyOn(global, 'requestAnimationFrame')
      
      fpsMonitor.start()
      fpsMonitor.start() // Should not start again
      
      expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('getMemoryUsage', () => {
    it('should return null in non-browser environment', () => {
      const result = getMemoryUsage()
      expect(result).toBeNull()
    })

    it('should return memory usage when available', () => {
      // Mock performance.memory
      Object.defineProperty(performance, 'memory', {
        value: {
          usedJSHeapSize: 1000000,
          totalJSHeapSize: 2000000,
          jsHeapSizeLimit: 4000000,
        },
        configurable: true,
      })

      const result = getMemoryUsage()
      
      expect(result).toEqual({
        usedJSHeapSize: 1000000,
        totalJSHeapSize: 2000000,
        jsHeapSizeLimit: 4000000,
        usagePercentage: 25,
      })
    })
  })

  describe('analyzeBundleSize', () => {
    beforeEach(() => {
      // Mock DOM
      document.querySelectorAll = jest.fn()
    })

    it('should return null in non-browser environment', () => {
      // Temporarily remove window
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      const result = analyzeBundleSize()
      expect(result).toBeNull()

      global.window = originalWindow
    })

    it('should analyze bundle size correctly', () => {
      const mockScripts = [
        { src: 'script1.js' },
        { src: 'script2.js' },
      ]
      const mockStyles = [
        { rel: 'stylesheet' },
      ]

      ;(document.querySelectorAll as jest.Mock)
        .mockReturnValueOnce(mockScripts)
        .mockReturnValueOnce(mockStyles)

      const result = analyzeBundleSize()

      expect(result).toEqual({
        scriptCount: 2,
        styleCount: 1,
        totalResources: 3,
      })
    })
  })
})
