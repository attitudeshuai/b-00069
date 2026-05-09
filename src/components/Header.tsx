import React, { useState } from 'react';
import { FiRefreshCw, FiMaximize2, FiChevronDown, FiMenu } from 'react-icons/fi';
import '../styles/header.css';

interface HeaderProps {
  onRefresh: () => void;
  currentPage: string;
  tabs: { id: string; label: string }[];
  onTabChange: (id: string) => void;
  onTabClose: (id: string, e: React.MouseEvent) => void;
  onFullscreen?: () => void;
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onRefresh,
  currentPage,
  tabs,
  onTabChange,
  onTabClose,
  onFullscreen,
  sidebarCollapsed = false,
  onToggleSidebar
}) => {
  // Find current tab label
  const currentTab = tabs.find(t => t.id === currentPage) || { label: '仪表板' };
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleTabSelect = (tabId: string) => {
    onTabChange(tabId);
    setShowMobileMenu(false);
  };

  return (
    <header className="header">
      {isMobile && (
        <button
          className="mobile-sidebar-toggle"
          onClick={onToggleSidebar}
          title="展开导航栏"
        >
          <FiMenu size={20} />
        </button>
      )}

      {isMobile ? (
        <>
          <div className="mobile-tabs-menu">
            <button
              className="mobile-tabs-trigger"
              onClick={handleMobileMenuToggle}
            >
              <span>{currentTab.label}</span>
              <FiChevronDown className={`menu-arrow ${showMobileMenu ? 'open' : ''}`} />
            </button>

            {showMobileMenu && (
              <div className="mobile-tabs-dropdown">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`mobile-tab-item ${tab.id === currentPage ? 'active' : ''}`}
                    onClick={() => handleTabSelect(tab.id)}
                  >
                    {tab.label}
                    {tabs.length > 1 && (
                      <span
                        className="mobile-tab-close"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTabClose(tab.id, e);
                        }}
                        title="关闭标签"
                      >
                        ×
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${tab.id === currentPage ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
              {tabs.length > 1 && (
                <span
                  className="tab-close"
                  onClick={(e) => onTabClose(tab.id, e)}
                  title="关闭标签"
                >
                  ×
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      <div className="header-actions">
        <button className="action-btn" onClick={onRefresh} title="刷新">
          <FiRefreshCw size={18} />
        </button>
        <button className="action-btn" onClick={onFullscreen} title="全屏" disabled={sidebarCollapsed}>
          <FiMaximize2 size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
