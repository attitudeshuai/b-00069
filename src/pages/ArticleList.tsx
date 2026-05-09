import React, { useState } from 'react';
import '../styles/pages.css';
import CustomSelect from '../components/CustomSelect';

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState([
    { id: 1, title: '2026年前端开发趋势展望', author: '张三', category: '技术', views: 1520, status: '已发布', date: '2026-01-18' },
    { id: 2, title: '如何提升网站性能优化', author: '李四', category: '教程', views: 980, status: '已发布', date: '2026-01-17' },
    { id: 3, title: 'React 19 新特性详解', author: '王五', category: '技术', views: 2340, status: '已发布', date: '2026-01-15' },
    { id: 4, title: '产品设计的用户体验思考', author: '赵六', category: '设计', views: 760, status: '草稿', date: '2026-01-14' },
    { id: 5, title: '团队协作效率提升指南', author: '钱七', category: '管理', views: 450, status: '审核中', date: '2026-01-13' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('全部分类');
  const [selectedStatus, setSelectedStatus] = useState('全部状态');
  const [isCheckingPermission, setIsCheckingPermission] = useState(false);
  const [checkingPermissionType, setCheckingPermissionType] = useState<string | null>(null);
  const [showNoPermission, setShowNoPermission] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState<number | null>(null);

  const handleAddArticle = () => {
    setIsCheckingPermission(true);
    // 模拟权限检查过程
    setTimeout(() => {
      setIsCheckingPermission(false);
      setShowNoPermission(true);
      // 3秒后自动关闭提示
      setTimeout(() => {
        setShowNoPermission(false);
      }, 3000);
    }, 1500);
  };

  const handleEditClick = () => {
    setIsCheckingPermission(true);
    setCheckingPermissionType('edit');
    // 模拟权限检查过程
    setTimeout(() => {
      setIsCheckingPermission(false);
      setCheckingPermissionType(null);
      setShowNoPermission(true);
      // 3秒后自动关闭提示
      setTimeout(() => {
        setShowNoPermission(false);
      }, 3000);
    }, 1500);
  };

  const handlePreviewClick = () => {
    setIsCheckingPermission(true);
    setCheckingPermissionType('preview');
    // 模拟权限检查过程
    setTimeout(() => {
      setIsCheckingPermission(false);
      setCheckingPermissionType(null);
      setShowNoPermission(true);
      // 3秒后自动关闭提示
      setTimeout(() => {
        setShowNoPermission(false);
      }, 3000);
    }, 1500);
  };

  const handleDeleteClick = (id: number) => {
    setArticleIdToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (articleIdToDelete) {
      setArticles(prevArticles => prevArticles.filter(article => article.id !== articleIdToDelete));
      setShowDeleteConfirm(false);
      setArticleIdToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setArticleIdToDelete(null);
  };

  const filteredArticles = articles.filter(article => {
    const categoryMatch = selectedCategory === '全部分类' || article.category === selectedCategory;
    const statusMatch = selectedStatus === '全部状态' || article.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📝 文章列表</h1>
        <p>管理和发布网站文章内容</p>
      </div>

      <div className="page-actions">
        <button className="btn-primary btn-add-user" onClick={handleAddArticle} disabled={isCheckingPermission}>+ 新建文章</button>
        <div className="filter-group">
          <CustomSelect
            options={['全部分类', '技术', '教程', '设计', '管理']}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
          <CustomSelect
            options={['全部状态', '已发布', '草稿', '审核中']}
            value={selectedStatus}
            onChange={setSelectedStatus}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>标题</th>
              <th>作者</th>
              <th>分类</th>
              <th>浏览量</th>
              <th>状态</th>
              <th>发布日期</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.length > 0 ? (
              filteredArticles.map(article => (
                <tr key={article.id}>
                  <td>{article.id}</td>
                  <td className="title-cell">{article.title}</td>
                  <td>{article.author}</td>
                  <td><span className={`category-tag ${article.category === '技术' ? 'tech' : article.category === '教程' ? 'tutorial' : article.category === '设计' ? 'design' : 'management'}`}>{article.category}</span></td>
                  <td>{article.views.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${article.status === '已发布' ? 'published' : article.status === '草稿' ? 'draft' : 'pending'}`}>
                      {article.status}
                    </span>
                  </td>
                  <td>{article.date}</td>
                  <td>
                    <button className="btn-icon" title="编辑" onClick={handleEditClick} disabled={isCheckingPermission && checkingPermissionType === 'edit'}>
                      {isCheckingPermission && checkingPermissionType === 'edit' ? '🔍' : '✏️'}
                    </button>
                    <button className="btn-icon" title="预览" onClick={handlePreviewClick} disabled={isCheckingPermission && checkingPermissionType === 'preview'}>
                      {isCheckingPermission && checkingPermissionType === 'preview' ? '🔍' : '👁️'}
                    </button>
                    <button className="btn-icon" title="删除" onClick={() => handleDeleteClick(article.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="no-data">
                  <div className="no-data-content">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4C13.9543 4 6 11.9543 6 22C6 32.0457 13.9543 40 24 40C34.0457 40 42 32.0457 42 22C42 11.9543 34.0457 4 24 4ZM24 36C16.268 36 10 29.732 10 22C10 14.268 16.268 8 24 8C31.732 8 38 14.268 38 22C38 29.732 31.732 36 24 36ZM24 18C26.2091 18 28 16.2091 28 14C28 11.7909 26.2091 10 24 10C21.7909 10 20 11.7909 20 14C20 16.2091 21.7909 18 24 18ZM24 32C27.3137 32 30 29.3137 30 26C30 22.6863 27.3137 20 24 20C20.6863 20 18 22.6863 18 26C18 29.3137 20.6863 32 24 32Z" fill="#9CA3AF" />
                    </svg>
                    <p>暂无数据</p>
                    <p className="no-data-desc">当前筛选条件下没有找到相关文章</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 权限检测提示 */}
      {isCheckingPermission && (
        <div className="permission-checking">
          <div className="permission-checking-content">
            <span className="permission-checking-icon">🔍</span>
            <span className="permission-checking-text">
              {checkingPermissionType === 'edit' ? '正在检测编辑权限...' :
                checkingPermissionType === 'preview' ? '正在检测预览权限...' :
                  '正在检测权限...'}
            </span>
          </div>
        </div>
      )}

      {/* 暂无权限提示 */}
      {showNoPermission && (
        <div className="permission-checking">
          <div className="permission-checking-content">
            <span className="permission-checking-icon">❌</span>
            <span className="permission-checking-text">暂无权限</span>
          </div>
        </div>
      )}

      {/* 删除确认弹窗 */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>确认删除</h3>
            <p>您确定要删除此文章吗？此操作不可撤销。</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={cancelDelete}>取消</button>
              <button className="btn-danger" onClick={confirmDelete}>确认删除</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
