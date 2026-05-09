import React, { useState } from 'react';
import '../styles/pages.css';
import CustomSelect from '../components/CustomSelect';

const UserManagement: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [isCheckingEditPermission, setIsCheckingEditPermission] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '用户',
    status: '活跃'
  });

  const [users, setUsers] = useState([
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '活跃', lastLogin: '2026-01-20 10:30' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', status: '活跃', lastLogin: '2026-01-20 09:15' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', status: '禁用', lastLogin: '2026-01-18 14:20' },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '用户', status: '活跃', lastLogin: '2026-01-19 16:45' },
    { id: 5, name: '钱七', email: 'qianqi@example.com', role: '编辑', status: '活跃', lastLogin: '2026-01-20 08:00' },
  ]);

  const handleExport = () => {
    setIsExporting(true);
    // 模拟导出过程
    setTimeout(() => {
      setIsExporting(false);
    }, 2000);
  };

  const handleDeleteClick = (userId: number) => {
    setUserIdToDelete(userId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (userIdToDelete) {
      setUsers(users.filter(user => user.id !== userIdToDelete));
      setShowDeleteConfirm(false);
      setUserIdToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setUserIdToDelete(null);
  };

  const handleEditClick = (userId: number) => {
    setEditingUserId(userId);
    setIsCheckingEditPermission(true);
    // 模拟权限检测过程
    setTimeout(() => {
      setIsCheckingEditPermission(false);
      setEditingUserId(null);
    }, 1500);
  };

  const handleAddUserClick = () => {
    setShowAddUserModal(true);
  };

  const handleAddUserCancel = () => {
    setShowAddUserModal(false);
    // 重置表单
    setNewUser({
      name: '',
      email: '',
      role: '用户',
      status: '活跃'
    });
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 生成新用户ID
    const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    // 创建新用户对象
    const userToAdd = {
      id: newUserId,
      ...newUser,
      lastLogin: '未登录'
    };
    // 添加到用户列表
    setUsers([...users, userToAdd]);
    // 关闭弹窗并重置表单
    setShowAddUserModal(false);
    setNewUser({
      name: '',
      email: '',
      role: '用户',
      status: '活跃'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👤 用户管理</h1>
        <p>管理系统中的所有用户账户</p>
      </div>

      <div className="page-actions">
        <button className="btn-primary btn-add-user" onClick={handleAddUserClick}>+ 添加用户</button>
        <button
          className="btn-secondary"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? '导出中...' : '导出数据'}
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>姓名</th>
              <th>邮箱</th>
              <th>角色</th>
              <th>状态</th>
              <th>最后登录</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td><span className={`badge badge-${user.role === '管理员' ? 'admin' : user.role === '编辑' ? 'editor' : 'user'}`}>{user.role}</span></td>
                <td><span className={`status ${user.status === '活跃' ? 'active' : 'disabled'}`}>{user.status}</span></td>
                <td>{user.lastLogin}</td>
                <td>
                  <button className="btn-icon" title="编辑" onClick={() => handleEditClick(user.id)} disabled={isCheckingEditPermission && editingUserId === user.id}>
                    {isCheckingEditPermission && editingUserId === user.id ? '🔍' : '✏️'}
                  </button>
                  <button className="btn-icon" title="删除" onClick={() => handleDeleteClick(user.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 删除确认弹窗 */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>确认删除</h3>
            <p>您确定要删除此用户吗？此操作不可撤销。</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={cancelDelete}>取消</button>
              <button className="btn-danger" onClick={confirmDelete}>确认删除</button>
            </div>
          </div>
        </div>
      )}

      {/* 权限检测提示 */}
      {isCheckingEditPermission && (
        <div className="permission-checking">
          <div className="permission-checking-content">
            <span className="permission-checking-icon">🔍</span>
            <span className="permission-checking-text">正在检测编辑权限...</span>
          </div>
        </div>
      )}

      {/* 添加用户弹窗 */}
      {showAddUserModal && (
        <div className="modal-overlay">
          <div className="modal modal-add-user">
            <h3>+ 添加用户</h3>
            <form onSubmit={handleAddUserSubmit}>
              <div className="form-group">
                <label htmlFor="name">姓名</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">邮箱</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">角色</label>
                <CustomSelect
                  options={[
                    { value: '管理员', label: '管理员' },
                    { value: '编辑', label: '编辑' },
                    { value: '用户', label: '用户' }
                  ]}
                  value={newUser.role}
                  onChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">状态</label>
                <CustomSelect
                  options={[
                    { value: '活跃', label: '活跃' },
                    { value: '禁用', label: '禁用' }
                  ]}
                  value={newUser.status}
                  onChange={(value) => setNewUser(prev => ({ ...prev, status: value }))}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={handleAddUserCancel}>取消</button>
                <button type="submit" className="btn-primary btn-add-user">保存</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
