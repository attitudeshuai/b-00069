import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import '../styles/kpi-card.css';

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

interface KPICardProps {
  data: KPIData;
}

const formatNumber = (num: number): string => {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '亿';
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toLocaleString();
};

const KPICard: React.FC<KPICardProps> = ({ data }) => {
  const isPositive = data.trend_direction === 'up';

  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <div className="kpi-title">{data.title}</div>
        <div className="kpi-icon">{data.icon}</div>
      </div>

      <div className="kpi-value">
        {formatNumber(data.value)} <span className="kpi-unit">{data.unit}</span>
      </div>

      <div className={`kpi-trend ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? <FiArrowUp size={16} /> : <FiArrowDown size={16} />}
        <span className="trend-text">{data.trend_percentage}% vs 上周期</span>
      </div>

      <div className="kpi-description">{data.description}</div>
    </div>
  );
};

export default KPICard;
