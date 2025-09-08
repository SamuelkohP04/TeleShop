'use client';

import { useEffect, useState, ReactNode } from 'react';

interface NavigatorMemory extends Navigator {
  deviceMemory?: number;
}

interface NavigatorConnection extends Navigator {
  connection?: {
    effectiveType?: '4g' | '3g' | '2g' | 'slow-2g';
  };
}

interface DeviceCapabilities {
  deviceMemory?: number;
  hardwareConcurrency?: number;
  connection?: {
    effectiveType?: string;
  };
}


type ExtendedNavigator = NavigatorMemory & NavigatorConnection & DeviceCapabilities;


interface PerformanceOptimizerProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number; // Performance threshold (0-1)
}

export default function PerformanceOptimizer({ 
  children, 
  fallback = null,
  threshold = 0.5 
}: PerformanceOptimizerProps) {
  const [shouldRender, setShouldRender] = useState(true);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    // Simple performance detection
    const detectPerformance = () => {
      // Check device memory (if available)
      const memory = (navigator as NavigatorMemory).deviceMemory || 4;

      // Check CPU cores (if available)
      const cores = (navigator as ExtendedNavigator).hardwareConcurrency || 4;
      
      // Check connection speed (if available)
      const connection = (navigator as NavigatorConnection).connection;
      const effectiveType = connection?.effectiveType || '4g';
      
      // Performance score calculation
      let score = 0;
      
      // Memory score (0-1)
      if (memory >= 8) score += 0.4;
      else if (memory >= 4) score += 0.3;
      else if (memory >= 2) score += 0.2;
      else score += 0.1;
      
      // CPU score (0-1)
      if (cores >= 8) score += 0.3;
      else if (cores >= 4) score += 0.2;
      else if (cores >= 2) score += 0.1;
      else score += 0.05;
      
      // Connection score (0-1)
      if (effectiveType === '4g') score += 0.3;
      else if (effectiveType === '3g') score += 0.2;
      else if (effectiveType === '2g') score += 0.1;
      else score += 0.05;
      
      const isLowEndDevice = score < threshold;
      setIsLowEnd(isLowEndDevice);
      
      // On very low-end devices, delay rendering for better performance
      if (isLowEndDevice) {
        const timer = setTimeout(() => {
          setShouldRender(true);
        }, 1000); // 1 second delay
        
        return () => clearTimeout(timer);
      }
    };

    detectPerformance();
  }, [threshold]);

  // Show fallback on low-end devices while loading
  if (isLowEnd && !shouldRender) {
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="min-h-[200px] bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-white/40 text-xs">Optimizing for your device...</div>
      </div>
    );
  }

  return <>{children}</>;
}

// Hook for performance monitoring
export function usePerformanceMonitor() {
  const [performance, setPerformance] = useState({
    memory: 0,
    cores: 0,
    connection: 'unknown',
    score: 0,
    isLowEnd: false
  });

  useEffect(() => {
    const memory = (navigator as unknown as DeviceCapabilities).deviceMemory || 0;
    const cores = (navigator as unknown as DeviceCapabilities).hardwareConcurrency || 0;
    const connection = (navigator as unknown as DeviceCapabilities).connection;
    const effectiveType = connection?.effectiveType || 'unknown';
    
    // Calculate performance score
    let score = 0;
    if (memory >= 8) score += 0.4;
    else if (memory >= 4) score += 0.3;
    else if (memory >= 2) score += 0.2;
    else if (memory > 0) score += 0.1;
    
    if (cores >= 8) score += 0.3;
    else if (cores >= 4) score += 0.2;
    else if (cores >= 2) score += 0.1;
    else if (cores > 0) score += 0.05;
    
    if (effectiveType === '4g') score += 0.3;
    else if (effectiveType === '3g') score += 0.2;
    else if (effectiveType === '2g') score += 0.1;
    else score += 0.05;
    
    setPerformance({
      memory,
      cores,
      connection: effectiveType,
      score,
      isLowEnd: score < 0.5
    });
  }, []);

  return performance;
} 