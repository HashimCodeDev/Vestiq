// Performance monitoring utilities

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // Measure function execution time
  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    this.recordMetric(name, end - start)
    return result
  }

  // Measure async function execution time
  async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()
    this.recordMetric(name, end - start)
    return result
  }

  // Record a metric
  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    this.metrics.get(name)!.push(value)
  }

  // Get average for a metric
  getAverage(name: string): number {
    const values = this.metrics.get(name) || []
    if (values.length === 0) return 0
    return values.reduce((sum, val) => sum + val, 0) / values.length
  }

  // Get all metrics
  getAllMetrics(): Record<string, { average: number; count: number; latest: number }> {
    const result: Record<string, { average: number; count: number; latest: number }> = {}
    
    for (const [name, values] of this.metrics.entries()) {
      result[name] = {
        average: this.getAverage(name),
        count: values.length,
        latest: values[values.length - 1] || 0,
      }
    }
    
    return result
  }

  // Clear metrics
  clearMetrics(): void {
    this.metrics.clear()
  }
}

// Bundle size analyzer
export const analyzeBundleSize = () => {
  if (typeof window === 'undefined') return null

  const scripts = Array.from(document.querySelectorAll('script[src]'))
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
  
  return {
    scriptCount: scripts.length,
    styleCount: styles.length,
    totalResources: scripts.length + styles.length,
  }
}

// Memory usage monitor
export const getMemoryUsage = () => {
  if (typeof window === 'undefined' || !('memory' in performance)) {
    return null
  }

  const memory = (performance as any).memory
  return {
    usedJSHeapSize: memory.usedJSHeapSize,
    totalJSHeapSize: memory.totalJSHeapSize,
    jsHeapSizeLimit: memory.jsHeapSizeLimit,
    usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
  }
}

// FPS monitor
export class FPSMonitor {
  private fps = 0
  private lastTime = 0
  private frameCount = 0
  private isRunning = false

  start(): void {
    if (this.isRunning) return
    this.isRunning = true
    this.lastTime = performance.now()
    this.frameCount = 0
    this.tick()
  }

  stop(): void {
    this.isRunning = false
  }

  getFPS(): number {
    return this.fps
  }

  private tick = (): void => {
    if (!this.isRunning) return

    const currentTime = performance.now()
    this.frameCount++

    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime))
      this.frameCount = 0
      this.lastTime = currentTime
    }

    requestAnimationFrame(this.tick)
  }
}

// Image optimization utilities
export const optimizeImageLoading = () => {
  // Preload critical images
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = src
    })
  }

  // Lazy load images with intersection observer
  const lazyLoadImages = (selector = 'img[data-src]') => {
    if (typeof window === 'undefined') return

    const images = document.querySelectorAll(selector)
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const src = img.dataset.src
          if (src) {
            img.src = src
            img.removeAttribute('data-src')
            imageObserver.unobserve(img)
          }
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  return { preloadImage, lazyLoadImages }
}

// Performance decorator for React components
export const withPerformanceMonitoring = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  const monitor = PerformanceMonitor.getInstance()
  
  return function PerformanceMonitoredComponent(props: P) {
    return monitor.measureFunction(
      `render-${componentName}`,
      () => React.createElement(Component, props)
    )
  }
}

// Export singleton instance
export const performanceMonitor = PerformanceMonitor.getInstance()
