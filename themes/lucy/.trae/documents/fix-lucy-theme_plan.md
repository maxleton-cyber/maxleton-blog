# Lucy Theme 修复计划

## 问题分析

通过对比 `cyber` 主题，发现 `lucy` 主题存在以下问题：

1. **目录结构不一致**：`cyber` 的 partial 文件放在 `layout/_partial/`，而 `lucy` 放在 `_partial/`
2. **样式引入方式错误**：`cyber` 使用 Hexo 内置的 `<%- css('css/style') %>` 辅助函数，而 `lucy` 使用普通 `<link>` 标签
3. **include 路径错误**：`cyber` 使用 `<%- include('_partial/navbar') %>`，而 `lucy` 使用 `<%- partial('_partial/header') %>`

## 修复步骤

### 1. 移动 partial 目录
将 `_partial/` 目录移动到 `layout/_partial/`

### 2. 修改 layout.ejs
- 使用 `<%- css('css/style') %>` 引入样式
- 使用 `<%- include('_partial/header') %>` 引入导航栏
- 使用 `<%- include('_partial/footer') %>` 引入页脚

### 3. 更新 header.ejs
参考 `cyber` 的 navbar.ejs 结构，添加 logo 和更多导航链接

### 4. 更新 footer.ejs
参考 `cyber` 的 footer.ejs 结构

### 5. 更新 index.ejs
使用 `page.posts.each()` 而不是 `page.posts.forEach()`

## 文件修改清单

| 文件 | 修改内容 |
|------|----------|
| `_partial/header.ejs` | 移动到 `layout/_partial/header.ejs`，更新内容 |
| `_partial/footer.ejs` | 移动到 `layout/_partial/footer.ejs`，更新内容 |
| `layout/layout.ejs` | 修改样式引入和 partial 引用方式 |
| `layout/index.ejs` | 使用 `.each()` 方法 |

## 依赖关系

无

## 风险处理

- 移动文件可能导致引用路径问题，需要仔细检查所有引用
- 修改模板语法可能导致渲染错误，需要测试验证