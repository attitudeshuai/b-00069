import React, { useState } from 'react';
import '../styles/pages.css';

interface Permission {
  id: string;
  name: string;
  [key: string]: boolean | string;
}

const PermissionManagement: React.FC = () => {
  const [activeRole, setActiveRole] = useState('admin');
  const [permissions, setPermissions] = useState<Permission[]>([
    { id: 'dashboard', name: '仪表板', admin: true, editor: true, user: true, guest: true },
    { id: 'users_view', name: '查看用户', admin: true, editor: true, user: false, guest: false },
    { id: 'users_edit', name: '编辑用户', admin: true, editor: false, user: false, guest: false },
    { id: 'users_delete', name: '删除用户', admin: true, editor: false, user: false, guest: false },
    { id: 'articles_view', name: '查看文章', admin: true, editor: true, user: true, guest: true },
    { id: 'articles_edit', name: '编辑文章', admin: true, editor: true, user: false, guest: false },
    { id: 'articles_delete', name: '删除文章', admin: true, editor: true, user: false, guest: false },
    { id: 'comments_manage', name: '管理评论', admin: true, editor: true, user: false, guest: false },
    { id: 'settings', name: '系统设置', admin: true, editor: false, user: false, guest: false },
  ]);
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    id: ''
  });
  const [showSaved, setShowSaved] = useState(false);

  const [roles, setRoles] = useState([
    { id: 'admin', name: '管理员', description: '拥有系统所有权限', users: 3 },
    { id: 'editor', name: '编辑', description: '可以管理内容和评论', users: 8 },
    { id: 'user', name: '普通用户', description: '基础访问权限', users: 245 },
    { id: 'guest', name: '访客', description: '只读访问权限', users: 0 },
  ]);

  const handlePermissionChange = (permissionId: string, value: boolean) => {
    setPermissions(prevPermissions =>
      prevPermissions.map(perm => {
        if (perm.id === permissionId) {
          return {
            ...perm,
            [activeRole]: value
          };
        }
        return perm;
      })
    );
  };

  const handleAddRoleClick = () => {
    setShowAddRoleForm(true);
  };

  const handleCancelAddRole = () => {
    setShowAddRoleForm(false);
    setNewRole({ name: '', description: '', id: '' });
  };

  const handleAddRole = () => {
    if (newRole.name && newRole.description) {
      const roleId = newRole.name.toLowerCase().replace(/\s+/g, '_');
      const newRoleObj = {
        id: roleId,
        name: newRole.name,
        description: newRole.description,
        users: 0
      };

      setRoles(prevRoles => [...prevRoles, newRoleObj]);

      setPermissions(prevPermissions =>
        prevPermissions.map(perm => ({
          ...perm,
          [roleId]: false
        }))
      );

      setShowAddRoleForm(false);
      setNewRole({ name: '', description: '', id: '' });
    }
  };

  const handleNewRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRole(prev => ({ ...prev, [name]: value }));
  };

  const handleSavePermissions = () => {
    setShowSaved(true);
    setTimeout(() => {
      setShowSaved(false);
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🔐 权限管理</h1>
        <p>管理用户角色和权限配置</p>
      </div>

      <div className="permission-layout">
        <div className="roles-sidebar">
          <h3>角色列表</h3>
          {roles.map(role => (
            <div
              key={role.id}
              className={`role-card ${activeRole === role.id ? 'active' : ''}`}
              onClick={() => setActiveRole(role.id)}
            >
              <div className="role-name">{role.name}</div>
              <div className="role-desc">{role.description}</div>
              <div className="role-users">{role.users} 个用户</div>
            </div>
          ))}
          <button className="btn-add-role" onClick={handleAddRoleClick}>+ 添加新角色</button>
        </div>

        <div className="permissions-panel">
          <h3>权限配置 - {roles.find(r => r.id === activeRole)?.name}</h3>
          <div className="permissions-table">
            <table>
              <thead>
                <tr>
                  <th>权限名称</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map(perm => (
                  <tr key={perm.id}>
                    <td>{perm.name}</td>
                    <td>
                      <label className="checkbox-switch">
                        <input
                          type="checkbox"
                          checked={perm[activeRole as keyof typeof perm] as boolean}
                          onChange={(e) => handlePermissionChange(perm.id, e.target.checked)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="permission-actions">
            <button className="btn-primary" onClick={handleSavePermissions}>保存权限</button>
          </div>
        </div>
      </div>

      {showAddRoleForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>+ 添加新角色</h3>
            <div className="form-group">
              <label>角色名称</label>
              <input
                type="text"
                name="name"
                value={newRole.name}
                onChange={handleNewRoleChange}
                className="form-input"
                placeholder="请输入角色名称"
              />
            </div>
            <div className="form-group">
              <label>角色描述</label>
              <textarea
                name="description"
                value={newRole.description}
                onChange={handleNewRoleChange}
                className="form-textarea"
                placeholder="请输入角色描述"
                rows={3}
              />
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={handleCancelAddRole}>取消</button>
              <button className="btn-primary" onClick={handleAddRole}>添加</button>
            </div>
          </div>
        </div>
      )}

      {showSaved && (
        <div className="permission-checking">
          <div className="permission-checking-content">
            <span className="permission-checking-icon">✓</span>
            <span className="permission-checking-text">已保存</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionManagement;
