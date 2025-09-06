"use client";

import React, { useEffect, useRef } from 'react';

interface SparkOfLifeProps {
  className?: string;
  intensity?: number; // EN: 0~1 spark brightness; CN: 0~1 火花强度
}

/**
 * SparkOfLife - Animated S-shaped spark element
 * EN: Render an S-shaped path with moving glow particles and gradient stroke
 * CN: 渲染呼应 Somnia S 形态的火花路径，包含流动高光与发光描边
 */
export const SparkOfLife: React.FC<SparkOfLifeProps> = ({ className = '', intensity = 0.9 }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    let raf = 0;
    const start = Date.now();
    const animate = () => {
      const t = (Date.now() - start) / 1000;
      // EN: Animate gradient offset and blur pulsation; CN: 驱动渐变偏移与模糊脉动
      const gradient = svg.querySelector('#sparkGradient') as SVGLinearGradientElement | null;
      const glow = svg.querySelector('#glow') as SVGFESpecularLightingElement | null;
      if (gradient) {
        const o = (Math.sin(t * 0.6) + 1) / 2; // 0~1
        gradient.setAttribute('x1', `${o * 100}%`);
        gradient.setAttribute('x2', `${(1 - o) * 100}%`);
      }
      if (glow) {
        glow.setAttribute('specularExponent', `${20 + Math.sin(t * 2) * 8}`);
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 800 800"
      aria-hidden
    >
      <defs>
        {/* EN: Purple→Blue vivid gradient; CN: 深紫到艳蓝的主色渐变 */}
        <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>

        {/* EN: Outer glow filter; CN: 外发光滤镜 */}
        <filter id="sparkGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* EN: subtle specular lighting; CN: 轻微高光 */}
        <filter id="sparkSpecular" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feSpecularLighting id="glow" in="blur" surfaceScale="3" specularConstant="1.2" specularExponent="24" lightingColor="#a78bfa">
            <fePointLight x="400" y="200" z="80" />
          </feSpecularLighting>
          <feComposite in2="SourceAlpha" operator="in" />
          <feComposite in2="SourceGraphic" operator="arithmetic" k2="1" k3="1" />
        </filter>
      </defs>

      {/* EN: S-shaped Bezier path; CN: 抽象 S 形贝塞尔路径 */}
      <path
        id="spark-path"
        d="M 120 560 C 160 440 320 420 400 360 C 520 270 500 200 380 160 C 280 126 240 100 220 80 M 580 720 C 560 700 520 660 460 640 C 300 590 240 520 260 480 C 300 410 500 420 600 320 C 700 220 620 140 480 120"
        fill="none"
        stroke="url(#sparkGradient)"
        strokeWidth={8}
        opacity={intensity}
        filter="url(#sparkGlow)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* EN: dashed pulse along the path; CN: 路径上的虚线脉冲 */}
      <path
        d="M 120 560 C 160 440 320 420 400 360 C 520 270 500 200 380 160 C 280 126 240 100 220 80 M 580 720 C 560 700 520 660 460 640 C 300 590 240 520 260 480 C 300 410 500 420 600 320 C 700 220 620 140 480 120"
        fill="none"
        stroke="#e879f9"
        strokeOpacity={0.8}
        strokeWidth={2}
        strokeDasharray="6 18"
        strokeLinecap="round"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-240" dur="6s" repeatCount="indefinite" />
      </path>

      {/* EN: moving spark particle; CN: 沿路径移动的火花粒子 */}
      <circle r="5" fill="#fff" filter="url(#sparkGlow)">
        <animateMotion dur="5s" repeatCount="indefinite" rotate="auto">
          <mpath xlinkHref="#spark-path" />
        </animateMotion>
      </circle>
    </svg>
  );
};


