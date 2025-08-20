import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PerformanceMonitor } from '@/lib/performance';
import { BarChart3, Zap, Activity, X } from 'lucide-react';

const PerformanceDebugger: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metrics, setMetrics] = useState<Record<string, any>>({});
  const [monitor] = useState(() => PerformanceMonitor.getInstance());

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const updateMetrics = () => {
      setMetrics(monitor.getMetrics());
    };

    // Update metrics every 5 seconds
    const interval = setInterval(updateMetrics, 5000);
    updateMetrics(); // Initial update

    return () => clearInterval(interval);
  }, [monitor]);

  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-[9999] bg-background/90 backdrop-blur-sm"
      >
        <Activity className="w-4 h-4 mr-2" />
        Performance
      </Button>
    );
  }

  const getScoreColor = (metric: string, value: number) => {
    switch (metric) {
      case 'lcp':
        if (value <= 2500) return 'bg-green-500';
        if (value <= 4000) return 'bg-yellow-500';
        return 'bg-red-500';
      case 'fid':
        if (value <= 100) return 'bg-green-500';
        if (value <= 300) return 'bg-yellow-500';
        return 'bg-red-500';
      case 'cls':
        if (value <= 0.1) return 'bg-green-500';
        if (value <= 0.25) return 'bg-yellow-500';
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatValue = (metric: string, value: number) => {
    switch (metric) {
      case 'lcp':
      case 'fid':
        return `${value.toFixed(0)}ms`;
      case 'cls':
        return value.toFixed(3);
      default:
        return `${value.toFixed(1)}ms`;
    }
  };

  const coreWebVitals = ['lcp', 'fid', 'cls'].filter(metric => metrics[metric]);
  const renderMetrics = Object.entries(metrics).filter(([name]) => name.startsWith('render_'));
  const asyncMetrics = Object.entries(metrics).filter(([name]) => name.startsWith('async_'));

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-80">
      <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Monitor
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Core Web Vitals */}
          {coreWebVitals.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                <Zap className="w-4 h-4" />
                Core Web Vitals
              </h4>
              <div className="space-y-2">
                {coreWebVitals.map((metric) => {
                  const data = metrics[metric];
                  const colorClass = getScoreColor(metric, data.avg);
                  return (
                    <div key={metric} className="flex items-center justify-between">
                      <span className="text-sm font-medium uppercase">{metric}</span>
                      <Badge className={`${colorClass} text-white`}>
                        {formatValue(metric, data.avg)}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Component Render Times */}
          {renderMetrics.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Component Renders</h4>
              <div className="space-y-1">
                {renderMetrics.slice(0, 5).map(([name, data]) => {
                  const componentName = name.replace('render_', '');
                  return (
                    <div key={name} className="flex items-center justify-between text-sm">
                      <span className="truncate">{componentName}</span>
                      <Badge variant="outline" className="text-xs">
                        {data.avg.toFixed(1)}ms
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Async Operations */}
          {asyncMetrics.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-2">Async Operations</h4>
              <div className="space-y-1">
                {asyncMetrics.slice(0, 3).map(([name, data]) => {
                  const operationName = name.replace('async_', '');
                  return (
                    <div key={name} className="flex items-center justify-between text-sm">
                      <span className="truncate">{operationName}</span>
                      <Badge variant="outline" className="text-xs">
                        {data.avg.toFixed(1)}ms
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => monitor.logPerformanceSummary()}
              className="w-full"
            >
              Log Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceDebugger;
