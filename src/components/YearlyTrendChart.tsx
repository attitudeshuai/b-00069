import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import '../styles/chart.css';

interface TrendChartProps {
  title?: string;
}

const YearlyTrendChart: React.FC<TrendChartProps> = ({ title = '年度最高业务收入趋势' }) => {
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
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${item.color}; margin-right: 4px;"></span>
                ${item.seriesName || '最高业务收入'}
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
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
          name: '最高业务收入',
          type: 'line',
          step: 'end',
          data: [120000, 132000, 145000, 134000, 155000, 130000, 165000, 140000, 175000, 185000, 145000, 200000],
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#f97316',
            borderColor: '#fff',
            borderWidth: 2,
          },
          lineStyle: {
            color: '#f97316',
            width: 3,
          },
          areaStyle: {
            color: new (echarts as any).graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(249, 115, 22, 0.3)',
              },
              {
                offset: 1,
                color: 'rgba(249, 115, 22, 0.05)',
              },
            ]),
          },
          emphasis: {
            itemStyle: {
              borderWidth: 3,
              shadowColor: 'rgba(249, 115, 22, 0.5)',
              shadowBlur: 10,
            },
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

export default YearlyTrendChart;
