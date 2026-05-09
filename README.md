# 管理后台仪表板

一个使用 React + TypeScript + ECharts 构建的现代化管理后台仪表板系统。

## 项目特点

- **React 18** - 最新的 React 框架
- **TypeScript** - 完整的类型支持
- **ECharts** - 强大的数据可视化库
- **现代设计** - 淡雅紫色主题，扁平化设计
- **响应式布局** - 适配各种屏幕尺寸
- **Docker 支持** - 一键部署

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### Docker 部署

```bash
# 使用 docker-compose 启动
docker-compose up

# 应用将在 http://localhost:3000 上运行
```

## 主要功能

### 1. 仪表板

- **KPI 指标卡片** - 展示 4 个核心业务指标，包含增长/下降趋势显示
- **数据可视化** - 收入概览（堆叠面积图）、组合分析（饼图）、业务对比（柱状图）、趋势分析（阶梯线图）

### 2. 用户管理

- 用户列表展示
- 添加/编辑用户
- 用户状态管理
- 角色分配

### 3. 文章管理

- 文章列表展示
- 文章分类筛选
- 文章状态管理
- 文章操作（编辑、预览、删除）

### 4. 评论管理

- 评论列表展示
- 评论状态管理（待审核、已通过、已拒绝）
- 评论操作（通过、拒绝、删除）

### 5. 数据分析

- 销售趋势分析
- 地区分布分析
- 产品表现分析
- 数据导出功能

### 6. 权限管理

- 角色列表展示
- 角色权限分配
- 权限详情设置

### 7. 基本设置

- 网站信息配置
- 区域设置（语言、时区）
- 偏好设置（深色模式、邮件通知）

### 8. 导航系统

- 左侧固定导航栏，支持展开/收起
- 多级菜单支持
- 当前页面高亮显示
- 移动端导航栏展开按钮

### 9. 页头管理

- 面包屑导航
- 多标签页管理
- 刷新和全屏按钮

### 10. 响应式设计

- 适配各种屏幕尺寸
- 移动端侧边栏弹出效果
- 表格水平滚动
- 表单响应式布局

## 项目结构

```
src/
├── components/          # React 组件
│   ├── Sidebar.tsx     # 左侧导航栏
│   ├── Header.tsx      # 顶部页头
│   ├── KPICard.tsx     # KPI 卡片
│   ├── RevenueOverviewChart.tsx    # 收入概览图表
│   ├── CompositeAnalysisChart.tsx  # 组合分析图表
│   ├── BusinessRevenueChart.tsx    # 业务对比图表
│   ├── YearlyTrendChart.tsx        # 年度趋势图表
│   ├── CustomSelect.tsx            # 自定义下拉选择器
│   └── CustomDatePicker.tsx        # 自定义日期选择器
├── pages/              # 页面
│   ├── index.tsx       # 主仪表板页面
│   ├── UserManagement.tsx          # 用户管理页面
│   ├── ArticleList.tsx             # 文章管理页面
│   ├── CommentManagement.tsx       # 评论管理页面
│   ├── DataAnalysis.tsx            # 数据分析页面
│   ├── PermissionManagement.tsx    # 权限管理页面
│   └── BasicSettings.tsx           # 基本设置页面
├── styles/             # 样式文件
│   ├── app.css         # 全局样式
│   ├── sidebar.css     # 导航栏样式
│   ├── header.css      # 页头样式
│   ├── kpi-card.css    # KPI 卡片样式
│   ├── chart.css       # 图表样式
│   ├── dashboard.css   # 仪表板样式
│   ├── pages.css       # 页面通用样式
│   ├── custom-select.css  # 自定义下拉选择器样式
│   └── custom-date-picker.css  # 自定义日期选择器样式
├── App.tsx             # 主应用组件
└── index.tsx           # 应用入口

public/
└── index.html          # HTML 模板

Dockerfile             # Docker 镜像配置
docker-compose.yml    # Docker Compose 配置
vite.config.ts        # Vite 配置
tsconfig.json         # TypeScript 配置
package.json          # 项目依赖配置
```

## 色彩方案

- **主色调**: 淡雅紫 (#9b7dd4)
- **辅助色**: 科技蓝 (#3b82f6), 活力绿 (#10b981), 温暖橙 (#f97316)
- **背景色**: 浅灰色 (#f3f4f6)
- **卡片色**: 白色 (#ffffff)
- **文字色**: 深灰色 (#374151), 浅灰色 (#9ca3af)
