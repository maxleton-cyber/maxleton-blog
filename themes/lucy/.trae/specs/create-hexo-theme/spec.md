# Lucy Hexo Theme - Product Requirement Document

## Overview
- **Summary**: 将现有的HTML预览页面转换为一个完整的Hexo主题，包含赛博朋克风格的设计。
- **Purpose**: 创建一个符合Hexo主题规范的博客主题，包含导航栏、页脚、文章列表等组件。
- **Target Users**: Hexo博客用户，喜欢赛博朋克风格的开发者和设计师。

## Goals
- 将HTML中的内联样式提取到单独的CSS文件
- 将导航栏拆分为独立的partial模板
- 将页脚拆分为独立的partial模板
- 创建符合Hexo规范的主题目录结构
- 确保主题可以正常运行

## Non-Goals (Out of Scope)
- 添加JavaScript交互功能
- 实现博客文章的动态渲染逻辑
- 添加评论系统或其他第三方插件

## Background & Context
- 现有HTML预览文件位于 `html-preview.html`
- 需要按照Hexo主题标准结构进行重构
- 主题名为"lucy"，采用赛博朋克/边缘行者风格设计

## Functional Requirements
- **FR-1**: 创建Hexo主题的标准目录结构（layout, source/css, _partial等）
- **FR-2**: 将内联样式提取到 `source/css/style.css`
- **FR-3**: 创建导航栏partial模板 `_partial/header.ejs`
- **FR-4**: 创建页脚partial模板 `_partial/footer.ejs`
- **FR-5**: 创建主布局模板 `layout/layout.ejs`
- **FR-6**: 创建首页模板 `layout/index.ejs`

## Non-Functional Requirements
- **NFR-1**: 保持原有的赛博朋克视觉风格和色彩方案
- **NFR-2**: 保持响应式设计
- **NFR-3**: 使用EJS模板引擎

## Constraints
- **Technical**: Hexo主题规范、EJS模板引擎
- **Dependencies**: Hexo框架

## Assumptions
- 用户已安装Hexo框架
- 用户了解Hexo主题的基本使用方法

## Acceptance Criteria

### AC-1: 主题目录结构创建完成
- **Given**: 当前目录只有html-preview.html文件
- **When**: 执行主题创建任务
- **Then**: 生成完整的Hexo主题目录结构
- **Verification**: `human-judgment`

### AC-2: 样式文件提取完成
- **Given**: HTML文件中有内联样式
- **When**: 提取样式到CSS文件
- **Then**: style.css包含所有样式，HTML中无内联样式
- **Verification**: `human-judgment`

### AC-3: 导航栏partial创建完成
- **Given**: HTML中有导航栏代码
- **When**: 创建header.ejs
- **Then**: 导航栏被正确分离到partial文件
- **Verification**: `human-judgment`

### AC-4: 页脚partial创建完成
- **Given**: HTML中有页脚代码
- **When**: 创建footer.ejs
- **Then**: 页脚被正确分离到partial文件
- **Verification**: `human-judgment`

### AC-5: 主布局和首页模板创建完成
- **Given**: 需要创建layout和index模板
- **When**: 创建layout.ejs和index.ejs
- **Then**: 模板正确引用partials和样式文件
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要创建package.json文件
- [ ] 是否需要添加_config.yml配置文件