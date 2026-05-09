import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import '../styles/chart.css';

interface RevenueChartProps {
  title?: string;
}

const RevenueOverviewChart: React.FC<RevenueChartProps> = ({ title = '收入概览' }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize chart
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const option: echarts.EChartsOption = {
      title: {
        text: title,
        left: '20',
        top: '15',
        textStyle: {
          fontSize: 16,
          fontWeight: 600,
          color: '#374151',
        },
      },
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#ffffff'
          }
        },
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        textStyle: {
          color: '#374151',
          fontSize: 12
        },
        padding: 8,
        position: 'top',
        zIndex: 9999,
        formatter: (params: any) => {
          if (!params || params.length === 0) return '';
          let result = `<div style="font-weight: 600; margin-bottom: 2px; font-size: 12px;">${params[0].name}</div>`;
          params.forEach((item: any) => {
            if (!item) return;
            const color = typeof item.color === 'object' ? item.color.colorStops?.[0]?.color || '#000' : item.color;
            result += `
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1px; font-size: 11px; white-space: nowrap;">
                <span style="display: flex; align-items: center; margin-right: 8px;">
                  <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${color}; margin-right: 4px;"></span>
                  ${item.seriesName || ''}
                </span>
                <span style="font-weight: 500;">¥${item.value ? item.value.toLocaleString() : '0'}</span>
              </div>
            `;
          });
          return result;
        }
      },
      legend: {
        data: ['主要收入', '核心业务', '广告收入'],
        top: 50,
        left: 20,
        icon: 'circle',
        itemGap: 20,
        textStyle: {
          color: '#6b7280'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '100',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisLine: {
            lineStyle: {
              color: '#e5e7eb'
            }
          },
          axisLabel: {
            color: '#9ca3af',
            margin: 12
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: (value: number) => `¥${value / 10000}w`,
            color: '#9ca3af'
          },
          splitLine: {
            lineStyle: {
              color: '#f3f4f6',
              type: 'dashed'
            }
          }
        }
      ],
      series: [
        {
          name: '主要收入',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140000, 232000, 101000, 264000, 90000, 340000, 250000, 140000, 125000, 115000, 145000, 210000]
        },
        {
          name: '核心业务',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [120000, 282000, 111000, 234000, 220000, 340000, 310000, 120000, 135000, 125000, 155000, 190000]
        },
        {
          name: '广告收入',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [320000, 132000, 201000, 154000, 190000, 230000, 210000, 180000, 175000, 165000, 185000, 250000]
        }
      ]
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

  return <div ref={chartRef} className="chart-container" style={{ minHeight: '320px' }} />;
};

export default RevenueOverviewChart;
