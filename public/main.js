import { loadPosts,savePosts } from "./storage.js";

function findPostIndex(title,date){
    return posts.findIndex(p=>p.title===title && p.date === date);
}

// 1.页面加载提示（控制台）
console.log('✅ 博客页面已加载');
// 文章数据
const posts = [
    {
        title: 'CSS Grid 完全指南',
        summary: '从零开始掌握Grid布局,轻松实现复杂页面结构',
        date: '2026-08-15'
    },
    {
        title: 'FlexBox 实战技巧',
        summary: '深入理解FlexBox对齐、换行和伸缩',
        date: '2026-08-13'
    },
    {
        title: 'JavaScript 闭包入门',
        summary: '理解闭包的本质,写出更优雅、更安全的代码',
        date: '2026-08-10',
    },
    {
        title: '响应式设计原理',
        summary: '用媒体查询和相对单位，让页面适配所有屏幕。',
        date: '2026-08-08'
    },
    {
        title: 'Git 协作工作流',
        summary: '分支管理、Pull Request、Code Review 的最佳实践。',
        date: '2026-08-05'
    },
    {
        title: '前端性能优化',
        summary: '图片懒加载、代码分割、缓存策略，让网站飞起来。',
        date: '2026-08-01'
    }
];

async function loadPostsFromServer() {
    const res = await fetch("/posts");
    const data = await res.json();
    posts.length = 0;
    posts.push(...data);
    renderPosts();
}

loadPostsFromServer();

function renderPosts() {
    // 按日期降序排列（最新的在前）
    const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    const grid = document.querySelector('.blog-grid');
    // 清空容器（防止重复渲染）
    grid.innerHTML = '';
    // 遍历数据，生成HTML
    sortedPosts.forEach(function (post) {
        // 创建文章卡片
        const article = document.createElement('article');
        article.className = 'post-card';

        // 标题
        const titleEL = document.createElement('h2');
        titleEL.textContent = post?.title;

        // ✅ 双击编辑
        titleEL.addEventListener('dblclick', function () {
            const newTitle = prompt('修改标题：', this.textContent);
            if (newTitle && newTitle.trim() !== '') {
                const originalIndex = findPostIndex(post.title,post.date);
                if (originalIndex !== -1) {
                    posts[originalIndex].title = newTitle.trim();
                    renderPosts();
                    showMessage('✏️ 标题已更新', 'success');
                }
            }
        });

        // 摘要
        const summaryEl = document.createElement('p');
        summaryEl.textContent = post?.summary;

        // 日期
        const dateEL = document.createElement('span');
        dateEL.className = 'date';
        dateEL.textContent = post?.date;

        // 删除按钮
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️ 删除';
        deleteBtn.style.cssText = `
            margin-top: 12px;
            padding: 6px 16px;
            background: #e74c3c;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            transition: background 0.2s;
        `;
        deleteBtn.addEventListener('mouseenter', function () {
            this.style.background = '#c0392b';
        });
        deleteBtn.addEventListener('mouseleave', function () {
            this.style.background = '#e74c3c';
        });
        deleteBtn.addEventListener('click', async function () {
            const originalIndex = findPostIndex(post.title,post.date);
            if (originalIndex !== -1) {
                await fetch(`/posts/${post.id}`,{method:"DELETE"})
                await loadPostsFromServer();
                showMessage(`🗑️ 文章"${post.title}"已删除`,'warning');
            }
        });

        // 组装
        article.appendChild(titleEL);
        article.appendChild(summaryEl);
        article.appendChild(dateEL);
        article.appendChild(deleteBtn);
        grid.appendChild(article);
    });

    // ✅ 保存到 localStorage（只保存一次）
}

renderPosts();

// 2.工具函数：显示页面提示条
function showMessage(text, type) {
    // 移除已有的提示词（避免重复）
    const oldMsg = document.querySelector('.custom-toast');
    if (oldMsg) oldMsg.remove();
    // 创建新的提示条元素
    const msg = document.createElement('div');
    msg.className = 'custom-toast';

    // 创建文字部分
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    // 创建关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'x';
    closeBtn.style.cssText = `
        background: transparent;
        border:none;
        color:#fff;
        font-size:20px;
        margin-left:16px;
        cursor:pointer;
        opacity:0.7;
        transition:opacity 0.2s;
    `;
    closeBtn.addEventListener('mouseenter', function () {
        this.style.opacity = '1';
    });
    closeBtn.addEventListener('mouseleave', function () {
        this.style.opacity = '0.7';
    });

    msg.appendChild(textSpan);
    msg.appendChild(closeBtn);
    // 设置样式（直接写在JS里，方便独立运行）
    msg.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #2c3e50;
        padding: 12px 24px;
        border-radius: 40px;
        font-size: 16px;
        font-family: system-ui, sans-serif;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 9999;
        display:flex;
        align-items:center;
        gap:8px;
        opacity:0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        transform: translateX(-50%) translateY(10px);
        pointer-events: auto;
        `;
    let bgColor = '#2c3e50';
    if (type == 'success') {
        bgColor = '#27ae60';
    } else if (type == 'error') {
        bgColor = '#e74c3c'
    } else if (type == 'warning') {
        bgColor = '#f39c12';
    }
    msg.style.background = bgColor;
    document.body.appendChild(msg);
    // 触发淡入动画（用requestAnimationFrame确保过度有效)
    requestAnimationFrame(() => {
        msg.style.opacity = '1';
        msg.style.transform = 'translateX(-50%) translateY(0)';

    });
    const autoClose = setTimeout(() => {
        msg.style.opacity = '0';
        msg.style.transform = 'translateX(-50%) translateY(0)';
        setTimeout(() => {
            if (msg.parentNode) msg.remove();
        }, 300);
    }, 3000);
    closeBtn.addEventListener('click', function () {
        clearTimeout(autoClose);
        msg.remove();
    });
}
// 3.文章标题点击事件
const titles = document.querySelectorAll('.post-card h2');
titles.forEach(function (title) {
    title.addEventListener('click', function () {
        const titleText = this.textContent;
        showMessage(`📖 你点击了：${titleText}`);
    });
})
// 4. 摘要悬停变色效果（保留原有交互）
const summaries = document.querySelectorAll('.post-card p');

summaries.forEach(function (p) {
    p.addEventListener('mouseenter', function () {
        this.style.color = '#3498db';
        this.style.transition = 'color 0.25s ease';
    });
    p.addEventListener('mouseleave', function () {
        this.style.color = '#34495e';
    });
});
// 添加文章功能
const titleInput = document.getElementById('titleInput');
const summaryInput = document.getElementById('summaryInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
// 默认日期设为今天
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;

addBtn.addEventListener('click', function () {
    const title = titleInput.value.trim();
    const summary = summaryInput.value.trim();
    const date = dateInput.value;
    // 简单校验
    if (!title || !summary || !date) {
        showMessage('⚠️ 请填写完整信息（标题、摘要、日期）', 'warning');
        return;
    }
    // 添加到数组
    async function addPost() {
        await fetch("/posts",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({title,summary,date})
        });

        await loadPostsFromServer();
    }

    addPost();
    // 重新渲染
    renderPosts();
    // 清空表单
    titleInput.value = '';
    summaryInput.value = '';
    dateInput.value = today;

    showMessage(`✅ 文章"${title}"已发布！`, 'success');

});

// ========================================
// 5. 额外彩蛋：控制台提示
// ========================================
console.log('💡 试试点击任意文章标题，看看页面底部的提示！');