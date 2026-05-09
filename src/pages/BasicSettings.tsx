import React, { useState } from 'react';
import '../styles/pages.css';
import CustomSelect from '../components/CustomSelect';

const BasicSettings: React.FC = () => {
  const [siteName, setSiteName] = useState('我的管理后台');
  const [siteDescription, setSiteDescription] = useState('一个现代化的管理仪表板系统');
  const [language, setLanguage] = useState('zh-CN');
  const [timezone, setTimezone] = useState('Asia/Shanghai');
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotification, setEmailNotification] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => {
        setShowSaved(false);
      }, 1500);
    }, 800);
  };

  const handleReset = () => {
    setSiteName('我的管理后台');
    setSiteDescription('一个现代化的管理仪表板系统');
    setLanguage('zh-CN');
    setTimezone('Asia/Shanghai');
    setDarkMode(false);
    setEmailNotification(true);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🔧 基本设置</h1>
        <p>配置系统的基本参数</p>
      </div>

      <div className="settings-container">
        <div className="settings-section">
          <h3>网站信息</h3>
          <div className="form-group">
            <label>网站名称</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>网站描述</label>
            <textarea
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              className="form-textarea"
              rows={3}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>区域设置</h3>
          <div className="form-row">
            <div className="form-group">
              <label>语言</label>
              <CustomSelect
                value={language}
                onChange={setLanguage}
                options={[
                  { value: 'zh-CN', label: '简体中文' },
                  { value: 'zh-TW', label: '繁體中文' },
                  { value: 'en-US', label: 'English' },
                  { value: 'ja-JP', label: '日本語' }
                ]}
                className="form-select-custom"
              />
            </div>
            <div className="form-group">
              <label>时区</label>
              <CustomSelect
                value={timezone}
                onChange={setTimezone}
                options={[
                  { value: 'Asia/Shanghai', label: '中国标准时间 (UTC+8)' },
                  { value: 'Asia/Tokyo', label: '日本标准时间 (UTC+9)' },
                  { value: 'America/New_York', label: '美国东部时间 (UTC-5)' },
                  { value: 'Europe/London', label: '格林威治标准时间 (UTC+0)' }
                ]}
                className="form-select-custom"
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>偏好设置</h3>
          <div className="toggle-group">
            <div className="toggle-item">
              <div>
                <span className="toggle-label">深色模式</span>
                <span className="toggle-desc">开启后界面将使用深色主题</span>
              </div>
              <label className="switch">
                <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-item">
              <div>
                <span className="toggle-label">邮件通知</span>
                <span className="toggle-desc">接收系统重要通知邮件</span>
              </div>
              <label className="switch">
                <input type="checkbox" checked={emailNotification} onChange={() => setEmailNotification(!emailNotification)} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button className="btn-primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? '保存中...' : '保存设置'}
          </button>
          <button className="btn-secondary" onClick={handleReset}>重置</button>
        </div>

        {showSaved && (
          <div className="permission-checking">
            <div className="permission-checking-content">
              <span className="permission-checking-icon">✓</span>
              <span className="permission-checking-text">已保存</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicSettings;
