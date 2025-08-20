// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private observers: Map<string, PerformanceObserver> = new Map();

  private constructor() {
    this.setupObservers();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private setupObservers() {
    // Monitor layout shifts
    if ('PerformanceObserver' in window) {
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          this.recordMetric('cls', clsValue);
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
        this.observers.set('cls', clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }

      // Monitor first input delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric('fid', (entry as any).processingStart - entry.startTime);
          }
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
        this.observers.set('fid', fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // Monitor largest contentful paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.recordMetric('lcp', lastEntry.startTime);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
        this.observers.set('lcp', lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }
    }
  }

  private recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    this.metrics.get(name)!.push(value);
  }

  // Measure component render time
  measureRender<T>(componentName: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    this.recordMetric(`render_${componentName}`, end - start);
    return result;
  }

  // Measure async operations
  async measureAsync<T>(operationName: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const end = performance.now();
      this.recordMetric(`async_${operationName}`, end - start);
      return result;
    } catch (error) {
      const end = performance.now();
      this.recordMetric(`async_${operationName}_error`, end - start);
      throw error;
    }
  }

  // Get performance metrics
  getMetrics(): Record<string, { avg: number; min: number; max: number; count: number }> {
    const result: Record<string, { avg: number; min: number; max: number; count: number }> = {};
    
    for (const [name, values] of this.metrics.entries()) {
      if (values.length > 0) {
        result[name] = {
          avg: values.reduce((sum, val) => sum + val, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
          count: values.length,
        };
      }
    }
    
    return result;
  }

  // Log performance summary
  logPerformanceSummary() {
    const metrics = this.getMetrics();
    console.group('🚀 Performance Metrics');
    
    // Core Web Vitals
    if (metrics.lcp) {
      console.log(`📊 LCP (Largest Contentful Paint): ${metrics.lcp.avg.toFixed(2)}ms`);
    }
    if (metrics.fid) {
      console.log(`⚡ FID (First Input Delay): ${metrics.fid.avg.toFixed(2)}ms`);
    }
    if (metrics.cls) {
      console.log(`📏 CLS (Cumulative Layout Shift): ${metrics.cls.avg.toFixed(4)}`);
    }
    
    // Component render times
    const renderMetrics = Object.entries(metrics).filter(([name]) => name.startsWith('render_'));
    if (renderMetrics.length > 0) {
      console.log('\n🎨 Component Render Times:');
      renderMetrics.forEach(([name, data]) => {
        const componentName = name.replace('render_', '');
        console.log(`  ${componentName}: ${data.avg.toFixed(2)}ms (${data.count} renders)`);
      });
    }
    
    // Async operation times
    const asyncMetrics = Object.entries(metrics).filter(([name]) => name.startsWith('async_'));
    if (asyncMetrics.length > 0) {
      console.log('\n⏱️ Async Operations:');
      asyncMetrics.forEach(([name, data]) => {
        const operationName = name.replace('async_', '');
        console.log(`  ${operationName}: ${data.avg.toFixed(2)}ms (${data.count} operations)`);
      });
    }
    
    console.groupEnd();
  }

  // Clean up observers
  destroy() {
    for (const observer of this.observers.values()) {
      observer.disconnect();
    }
    this.observers.clear();
    this.metrics.clear();
  }
}

// React hook for performance monitoring
export function usePerformanceMonitor() {
  const monitor = PerformanceMonitor.getInstance();
  
  return {
    measureRender: monitor.measureRender.bind(monitor),
    measureAsync: monitor.measureAsync.bind(monitor),
    getMetrics: monitor.getMetrics.bind(monitor),
    logSummary: monitor.logPerformanceSummary.bind(monitor),
  };
}

// Utility functions for optimization
export const optimizationUtils = {
  // Debounce function
  debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  },

  // Throttle function
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Check if user prefers reduced motion
  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Check connection quality
  getConnectionQuality(): 'slow' | 'medium' | 'fast' {
    const connection = (navigator as any).connection;
    if (!connection) return 'medium';
    
    const { effectiveType, downlink } = connection;
    
    if (effectiveType === 'slow-2g' || effectiveType === '2g' || downlink < 1) {
      return 'slow';
    } else if (effectiveType === '3g' || downlink < 5) {
      return 'medium';
    } else {
      return 'fast';
    }
  },

  // Adaptive loading based on connection
  shouldLazyLoad(): boolean {
    const quality = this.getConnectionQuality();
    return quality === 'slow' || quality === 'medium';
  },

  // Image optimization
  getOptimizedImageUrl(url: string, width?: number, quality = 80): string {
    // This would integrate with your image optimization service
    // For now, just return the original URL
    return url;
  },
};

// Initialize performance monitoring in development
if (process.env.NODE_ENV === 'development') {
  const monitor = PerformanceMonitor.getInstance();
  
  // Log performance summary every 30 seconds
  setInterval(() => {
    monitor.logPerformanceSummary();
  }, 30000);
  
  // Add to window for debugging
  (window as any).performanceMonitor = monitor;
}
