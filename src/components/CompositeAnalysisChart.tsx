import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import '../styles/chart.css';

interface CompositeChartProps {
  title?: string;
}

const CompositeAnalysisChart: React.FC<CompositeChartProps> = ({ title = '组合分析' }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const option = {
      title: {
        text: title,
        left: 20,
        top: 15,
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: '#374151',
        },
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 8,
        appendToBody: true,
        zIndex: 9999,
        textStyle: {
          color: '#374151',
          fontSize: 12
        },
        formatter: (params: any) => {
          if (!params.name) return '';
          return `<div style="font-weight: 600; margin-bottom: 2px; font-size: 12px;">${params.name}</div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1px; font-size: 11px; white-space: nowrap;">
              <span style="display: flex; align-items: center; margin-right: 8px;">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${params.color}; margin-right: 4px;"></span>
                占比
              </span>
              <span style="font-weight: 500;">${params.percent}%</span>
            </div>`;
        },
      },
      series: [
        {
          name: '占比',
          type: 'pie',
          radius: ['35%', '55%'],
          top: 60,
          data: [
            { value: 40, name: '主要收入' },
            { value: 30, name: '核心业务' },
            { value: 20, name: '广告收入' },
            { value: 10, name: '其他业务' },
          ],
          itemStyle: {
            borderRadius: [4, 4],
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            fontSize: 12,
            color: '#6b7280',
            formatter: '{b}\n{c}%',
            distanceToLabelLine: 4,
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 13,
              fontWeight: 600,
            },
          },
          color: ['#9b7dd4', '#3b82f6', '#10b981', '#f97316'],
        },
      ],
    };

    chartInstance.current.setOption(option);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [title]);

  return <div className="chart-container" ref={chartRef} style={{ minHeight: '320px' }} />;
};

export default CompositeAnalysisChart;
