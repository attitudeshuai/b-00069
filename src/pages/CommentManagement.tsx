import React, { useState } from 'react';
import '../styles/pages.css';
import CustomSelect from '../components/CustomSelect';
import CustomDatePicker from '../components/CustomDatePicker';

interface Comment {
  id: number;
  author: string;
  article: string;
  content: string;
  status: string;
  date: string;
}

const CommentManagement: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: '小明', article: 'React 19 新特性详解', content: '非常详细的教程，学到了很多！', status: '已通过', date: '2026-01-20 10:30' },
    { id: 2, author: '小红', article: '2026年前端开发趋势展望', content: '期待更多这样的文章', status: '已通过', date: '2026-01-20 09:15' },
    { id: 3, author: '匿名用户', article: '如何提升网站性能优化', content: '这个垃圾广告...', status: '待审核', date: '2026-01-19 18:45' },
    { id: 4, author: '技术小白', article: 'React 19 新特性详解', content: '能出一个视频教程吗？', status: '已通过', date: '2026-01-19 14:20' },
    { id: 5, author: '路人甲', article: '产品设计的用户体验思考', content: '写得很好，继续加油！', status: '待审核', date: '2026-01-18 21:00' },
  ]);
  const [selectedStatus, setSelectedStatus] = useState('全部状态');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleApprove = (id: number) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === id ? { ...comment, status: '已通过' } : comment
      )
    );
  };

  const handleReject = (id: number) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === id ? { ...comment, status: '已拒绝' } : comment
      )
    );
  };

  const handleArticleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsRedirecting(true);
    setTimeout(() => {
      setIsRedirecting(false);
    }, 1500);
  };

  const handleDelete = (id: number) => {
    setComments(prevComments => prevComments.filter(comment => comment.id !== id));
  };

  const filteredComments = comments.filter(comment => {
    const statusMatch = selectedStatus === '全部状态' || comment.status === selectedStatus;
    const dateMatch = !selectedDate || comment.date.startsWith(selectedDate);
    return statusMatch && dateMatch;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>💬 评论管理</h1>
        <p>审核和管理用户评论</p>
      </div>

      <div className="page-actions">
        <div className="filter-group">
          <CustomSelect
            options={['全部状态', '待审核', '已通过', '已拒绝']}
            value={selectedStatus}
            onChange={setSelectedStatus}
            className="filter-select-custom"
          />
          <CustomDatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="选择日期"
            className="date-input-custom"
          />
        </div>
      </div>

      <div className="comments-list">
        {filteredComments.length > 0 ? (
          filteredComments.map(comment => (
            <div key={comment.id} className="comment-card">
              <div className="comment-header">
                <div className="comment-author">
                  <span className="avatar">👤</span>
                  <span className="name">{comment.author}</span>
                </div>
                <span className={`status-badge ${comment.status === '已通过' ? 'approved' : comment.status === '待审核' ? 'pending' : 'rejected'}`}>
                  {comment.status}
                </span>
              </div>
              <div className="comment-meta">
                评论文章：<a href="#" onClick={handleArticleClick}>{comment.article}</a>
              </div>
              <div className="comment-content">
                "{comment.content}"
              </div>
              <div className="comment-footer">
                <span className="comment-date">{comment.date}</span>
                <div className="comment-actions">
                  {comment.status === '待审核' && (
                    <>
                      <button className="btn-approve" title="通过" onClick={() => handleApprove(comment.id)}>✓ 通过</button>
                      <button className="btn-reject" title="拒绝" onClick={() => handleReject(comment.id)}>✗ 拒绝</button>
                    </>
                  )}
                  <button className="btn-delete" title="删除" onClick={() => handleDelete(comment.id)}>🗑️ 删除</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-comments">
            <p>暂无符合条件的评论</p>
          </div>
        )}
      </div>

      {isRedirecting && (
        <div className="permission-checking">
          <div className="permission-checking-content">
            <span className="permission-checking-icon">🔍</span>
            <span className="permission-checking-text">正在跳转文章链接</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentManagement;
