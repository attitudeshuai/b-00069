import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import '../styles/chart.css';

interface BusinessRevenueChartProps {
  title?: string;
}

const BusinessRevenueChart: React.FC<BusinessRevenueChartProps> = ({ title = '当月各业务收入对比' }) => {
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
        trigger: 'axis',
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
          if (!Array.isArray(params) || params.length === 0) return '';
          const item = params[0];
          return `<div style="font-weight: 600; margin-bottom: 2px; font-size: 12px;">${item.name}</div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1px; font-size: 11px; white-space: nowrap;">
              <span style="display: flex; align-items: center; margin-right: 8px;">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${typeof item.color === 'object' ? (item.color as any).colorStops?.[0]?.color || '#9b7dd4' : item.color}; margin-right: 4px;"></span>
                ${item.seriesName || '收入'}
              </span>
              <span style="font-weight: 500;">¥${item.value ? item.value.toLocaleString() : '0'}</span>
            </div>`;
        },
      },
      grid: {
        left: 60,
        right: 30,
        top: 70,
        bottom: 50,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['电商业务', '内容业务', '云服务', '广告投放', '增值服务', '其他'],
        axisLine: {
          lineStyle: {
            color: '#e5e7eb',
          },
        },
        axisLabel: {
          color: '#9ca3af',
          fontSize: 12,
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: '#f3f4f6',
          },
        },
        axisLabel: {
          color: '#9ca3af',
          fontSize: 12,
          formatter: (value: number) => `¥${(value / 10000).toFixed(0)}w`,
        },
      },
      series: [
        {
          name: '收入',
          type: 'bar',
          data: [320000, 280000, 180000, 150000, 95000, 70000],
          itemStyle: {
            color: new (echarts as any).graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#9b7dd4',
              },
              {
                offset: 1,
                color: '#7c5bb0',
              },
            ]),
            borderRadius: [8, 8, 0, 0],
          },
          label: {
            show: false,
          },
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

export default BusinessRevenueChart;
