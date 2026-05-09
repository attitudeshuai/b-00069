import React, { useState } from 'react';
import './styles/app.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/index';
import UserManagement from './pages/UserManagement';
import DataAnalysis from './pages/DataAnalysis';
import ArticleList from './pages/ArticleList';
import CommentManagement from './pages/CommentManagement';
import BasicSettings from './pages/BasicSettings';
import PermissionManagement from './pages/PermissionManagement';

const App: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tabs, setTabs] = useState<{ id: string; label: string }[]>([
    { id: 'dashboard', label: '仪表板' }
  ]);
  const [refreshCount, setRefreshCount] = useState<{ [key: string]: number }>({
    dashboard: 0
  });

  const handlePageChange = (pageId: string, label: string = '') => {
    // If tab doesn't exist, add it
    if (!tabs.find(t => t.id === pageId)) {
      // Find label if not provided
      let tabLabel = label;
      if (!tabLabel) {
        // Simple mapping for demo purposes - in real app would look up from menu config
        if (pageId === 'users') tabLabel = '用户管理';
        else if (pageId === 'articles') tabLabel = '文章列表';
        else if (pageId === 'comments') tabLabel = '评论管理';
        else if (pageId === 'analytics') tabLabel = '数据分析';
        else if (pageId === 'basic-settings') tabLabel = '基本设置';
        else if (pageId === 'permissions') tabLabel = '权限管理';
        else tabLabel = '新页面';
      }
      setTabs([...tabs, { id: pageId, label: tabLabel }]);
      setRefreshCount(prev => ({
        ...prev,
        [pageId]: 0
      }));
    }
    setActiveTab(pageId);
  };

  const handleRefresh = () => {
    setRefreshCount(prev => ({
      ...prev,
      [activeTab]: (prev[activeTab] || 0) + 1
    }));
  };

  const handleFullscreen = () => {
    const element = document.documentElement;
    if (!document.fullscreenElement) {
      setSidebarCollapsed(true);
      element.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      setSidebarCollapsed(false);
    }
  };

  const handleTabClose = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return; // Don't close last tab

    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);

    if (activeTab === id) {
      setActiveTab(newTabs[newTabs.length - 1].id);
    }
  };

  const renderPage = () => {
    const key = `${activeTab}-${refreshCount[activeTab] || 0}`;
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard key={key} />;
      case 'users':
        return <UserManagement key={key} />;
      case 'analytics':
        return <DataAnalysis key={key} />;
      case 'articles':
        return <ArticleList key={key} />;
      case 'comments':
        return <CommentManagement key={key} />;
      case 'basic-settings':
        return <BasicSettings key={key} />;
      case 'permissions':
        return <PermissionManagement key={key} />;
      default:
        return <Dashboard key={key} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentPage={activeTab}
        onPageChange={handlePageChange}
      />
      <div className="main-content">
        <Header
          currentPage={activeTab}
          tabs={tabs}
          onTabChange={setActiveTab}
          onTabClose={handleTabClose}
          onRefresh={handleRefresh}
          onFullscreen={handleFullscreen}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
