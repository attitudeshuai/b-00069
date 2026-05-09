import React from 'react';
import '../styles/pages.css';

const DataAnalysis: React.FC = () => {
  const stats = [
    { label: '本周访问量', value: '52,340', change: '+12.5%', positive: true },
    { label: '平均停留时间', value: '3m 45s', change: '+8.2%', positive: true },
    { label: '跳出率', value: '32.5%', change: '-5.1%', positive: true },
    { label: '转化率', value: '4.2%', change: '-2.3%', positive: false },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📈 数据分析</h1>
        <p>深入了解网站流量和用户行为</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="analysis-sections">
        <div className="analysis-card">
          <h3>📊 流量来源分析</h3>
          <div className="chart-placeholder">
            <div className="bar-chart">
              <div className="bar" style={{ height: '80%' }}><span>直接访问</span><span>40%</span></div>
              <div className="bar" style={{ height: '60%' }}><span>搜索引擎</span><span>30%</span></div>
              <div className="bar" style={{ height: '40%' }}><span>社交媒体</span><span>20%</span></div>
              <div className="bar" style={{ height: '20%' }}><span>其他</span><span>10%</span></div>
            </div>
          </div>
        </div>

        <div className="analysis-card">
          <h3>🌍 地区分布</h3>
          <div className="region-list">
            <div className="region-item"><span>北京</span><div className="progress-bar"><div style={{ width: '85%' }}></div></div><span>28%</span></div>
            <div className="region-item"><span>上海</span><div className="progress-bar"><div style={{ width: '65%' }}></div></div><span>22%</span></div>
            <div className="region-item"><span>广州</span><div className="progress-bar"><div style={{ width: '50%' }}></div></div><span>18%</span></div>
            <div className="region-item"><span>深圳</span><div className="progress-bar"><div style={{ width: '40%' }}></div></div><span>15%</span></div>
            <div className="region-item"><span>其他</span><div className="progress-bar"><div style={{ width: '30%' }}></div></div><span>17%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
