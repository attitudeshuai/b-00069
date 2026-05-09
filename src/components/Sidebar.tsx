import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import '../styles/sidebar.css';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  currentPage: string;
  onPageChange: (page: string, label?: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', label: '仪表板', icon: '📊', children: [] },
    { id: 'users', label: '用户管理', icon: '👤', children: [] },
    {
      id: 'content', label: '内容管理', icon: '📄', children: [
        { id: 'articles', label: '文章列表', icon: '📝' },
        { id: 'comments', label: '评论管理', icon: '💬' },
      ]
    },
    { id: 'analytics', label: '数据分析', icon: '📈', children: [] },
    {
      id: 'settings', label: '系统设置', icon: '⚙️', children: [
        { id: 'basic-settings', label: '基本设置', icon: '🔧' },
        { id: 'permissions', label: '权限管理', icon: '🔐' },
      ]
    },
  ];

  const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.children.length > 0) {
      if (collapsed) {
        onToggle();
      }
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
    } else {
      onPageChange(item.id, item.label);
    }
  };

  const isActive = (itemId: string, children: { id: string }[]) => {
    if (currentPage === itemId) return true;
    return children.some(child => child.id === currentPage);
  };

  const handleSubmenuClick = (childId: string) => {
    onPageChange(childId);
    if (isMobile) {
      onToggle();
    }
  };

  const handleMenuItemClick = (item: typeof menuItems[0]) => {
    if (item.children.length > 0) {
      if (collapsed) {
        onToggle();
      }
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
    } else {
      onPageChange(item.id, item.label);
      if (isMobile) {
        onToggle();
      }
    }
  };

  return (
    <>
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobile ? 'mobile-sidebar' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            {!collapsed && <span className="logo-text">Admin</span>}
            <span className="logo-icon">📱</span>
          </div>
          <button className="toggle-btn" onClick={onToggle} title={collapsed ? '展开' : '收起'}>
            {collapsed ? <FiMenu size={20} /> : <FiX size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                className={`nav-item ${isActive(item.id, item.children) ? 'active' : ''}`}
                onClick={() => handleMenuItemClick(item)}
                data-tooltip={collapsed ? item.label : undefined}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="nav-label">{item.label}</span>
                    {item.children.length > 0 && (
                      <span className={`expand-icon ${expandedMenu === item.id ? 'expanded' : ''}`}>▼</span>
                    )}
                  </>
                )}
              </button>
              {!collapsed && expandedMenu === item.id && item.children.length > 0 && (
                <div className="submenu">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      className={`submenu-item ${currentPage === child.id ? 'active' : ''}`}
                      onClick={() => handleSubmenuClick(child.id)}
                    >
                      <span className="nav-icon">{child.icon}</span>
                      <span className="nav-label">{child.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar" onClick={onToggle}>👤</div>
            {!collapsed && (
              <div className="user-info">
                <div className="user-name">Admin User</div>
                <div className="user-email">admin@example.com</div>
                <div className="user-role">管理员</div>
              </div>
            )}
          </div>
        </div>
      </aside>
      {isMobile && !collapsed && (
        <div className="sidebar-overlay" onClick={onToggle}></div>
      )}
    </>
  );
};

export default Sidebar;
