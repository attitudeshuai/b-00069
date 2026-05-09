import React from 'react';
import KPICard from '../components/KPICard';
import RevenueOverviewChart from '../components/RevenueOverviewChart';
import CompositeAnalysisChart from '../components/CompositeAnalysisChart';
import BusinessRevenueChart from '../components/BusinessRevenueChart';
import YearlyTrendChart from '../components/YearlyTrendChart';
import '../styles/dashboard.css';

interface KPIData {
  id: number;
  title: string;
  value: number;
  unit: string;
  trend_direction: 'up' | 'down';
  trend_percentage: number;
  description: string;
  icon: string;
}

const Dashboard: React.FC = () => {
  const kpiData: KPIData[] = [
    {
      id: 1,
      title: '用户总数',
      value: 245000,
      unit: '人',
      trend_direction: 'up',
      trend_percentage: 12.5,
      description: '环比上周期增长',
      icon: '👥',
    },
    {
      id: 2,
      title: '今日访问',
      value: 8520,
      unit: '次',
      trend_direction: 'up',
      trend_percentage: 8.2,
      description: '相比昨日增长',
      icon: '📊',
    },
    {
      id: 3,
      title: '月销售额',
      value: 3210000,
      unit: '元',
      trend_direction: 'up',
      trend_percentage: 15.3,
      description: '环比上月增长',
      icon: '💰',
    },
    {
      id: 4,
      title: '转化率',
      value: 3.8,
      unit: '%',
      trend_direction: 'down',
      trend_percentage: 2.1,
      description: '环比上周期下降',
      icon: '📈',
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {/* KPI Cards Row */}
        <div className="kpi-grid">
          {kpiData.map((kpi) => (
            <KPICard key={kpi.id} data={kpi} />
          ))}
        </div>

        {/* Charts Row 1: Revenue Overview and Composite Analysis */}
        <div className="charts-row">
          <div className="chart-col-lg">
            <RevenueOverviewChart title="收入概览" />
          </div>
          <div className="chart-col-sm">
            <CompositeAnalysisChart title="组合分析" />
          </div>
        </div>

        {/* Charts Row 2: Business Revenue and Yearly Trend */}
        <div className="charts-row">
          <div className="chart-col-lg">
            <BusinessRevenueChart title="当月各业务收入对比" />
          </div>
          <div className="chart-col-lg">
            <YearlyTrendChart title="年度最高业务收入趋势" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>&copy; 2026 管理后台仪表板 | 版权所有</p>
      </footer>
    </div>
  );
};

export default Dashboard;
