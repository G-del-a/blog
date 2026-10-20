# 📘 全栈学习手册（详细版）

> 按实际动手做过的内容整理，含知识点说明  
> 更新时间：2026-10-16

---

## 目录

1. [前端基础](#1-前端基础)
2. [JavaScript 核心](#2-javascript-核心)
3. [DOM 与浏览器](#3-dom-与浏览器)
4. [异步编程](#4-异步编程)
5. [模块化与 ES6+](#5-模块化与-es6)
6. [HTTP 协议](#6-http-协议)
7. [Node 原生服务器](#7-node-原生服务器)
8. [fs 文件持久化](#8-fs-文件持久化)
9. [CORS](#9-cors)
10. [Express](#10-express)
11. [SQLite 与 SQL](#11-sqlite-与-sql)
12. [Docker](#12-docker)
13. [React 基础](#13-react-基础)
14. [React Router](#14-react-router)
15. [React Context](#15-react-context)
16. [Vite](#16-vite)
17. [部署](#17-部署)
18. [常见报错速查](#18-常见报错速查)
19. [函数速查表](#19-函数速查表)
20. [完整学习路径](#20-完整学习路径)

---

## 1. 前端基础

### 1.1 HTML

**是什么**：网页的骨架。用标签描述内容。

**学过的**：

| 知识点 | 说明 |
|--------|------|
| 常用标签 | `div` `span` `h1~h6` `p` `a` `img` `button` `input` `form` |
| 语义化 | `header` `nav` `main` `article` `section` `footer` |
| 表单 | `input`（text / date）、`button`、`placeholder` |
| 属性 | `id`、`class`、`href`、`src`、`type` |

**例子**：

```html
<header class="navbar">
  <a href="/" class="logo">我的网站</a>
  <ul class="menu">
    <li><a href="/">首页</a></li>
  </ul>
</header>
```

---

### 1.2 CSS

**是什么**：控制网页样式。

**学过的**：

| 知识点 | 说明 |
|--------|------|
| 选择器 | `.class`、`#id`、`标签`、`后代`、`:hover` |
| 盒模型 | `margin` / `border` / `padding` / `content` |
| 颜色 | `#hex`、`rgb()` |
| 字体 | `font-size`、`font-weight`、`font-family` |
| 圆角 | `border-radius` |
| 阴影 | `box-shadow` |
| 过渡 | `transition` |

**例子**：

```css
.post-card {
  background: aliceblue;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  transition: box-shadow 0.2s;
}
```

---

### 1.3 Flexbox

**是什么**：一维布局（横着或竖着一排）。

**学过的**：

| 属性 | 作用 |
|------|------|
| `display: flex` | 开启 flex |
| `justify-content` | 主轴对齐 |
| `align-items` | 交叉轴对齐 |
| `gap` | 间距 |
| `flex-wrap` | 换行 |
| `flex-direction` | 方向 |

**例子**：

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
```

---

### 1.4 CSS Grid

**是什么**：二维布局（横竖同时排）。

**学过的**：

| 属性 | 作用 |
|------|------|
| `display: grid` | 开启 grid |
| `grid-template-columns` | 定义列 |
| `gap` | 间距 |

**例子**：

```css
.blog-grid {
  display: grid;
  gap: 20px;
}

@media (min-width: 1024px) {
  .blog-grid { grid-template-columns: 1fr 1fr 1fr; }
}
```

---

### 1.5 响应式

**是什么**：让页面适配不同屏幕。

**学过的**：

```css
@media (min-width: 1024px) { ... }
@media (max-width: 600px) { ... }
```

| 断点 | 布局 |
|------|------|
| 桌面 | 3 列 |
| 平板 | 2 列 |
| 手机 | 1 列 |

---

## 2. JavaScript 核心

### 2.1 变量

```javascript
let a = 1;      // 可重新赋值
const b = 2;    // 不可重新赋值
```

---

### 2.2 数据类型

| 类型 | 例子 |
|------|------|
| `string` | `"hello"` |
| `number` | `1`、`3.14` |
| `boolean` | `true` / `false` |
| `null` / `undefined` | 空值 |
| `object` | `{ name: "x" }` |
| `array` | `[1, 2, 3]` |

---

### 2.3 函数

```javascript
function add(a, b) {
  return a + b;
}

const add2 = (a, b) => a + b;
```

**箭头函数和普通函数的区别（`this`）**：

| 写法 | `this` |
|------|--------|
| `function () {}` | 谁调用指向谁 |
| `() => {}` | 定义时外层是谁指向谁 |

---

### 2.4 闭包

**是什么**：内层函数记住外层变量，外层函数结束后变量依然存在。

```javascript
function makeCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const c = makeCounter();
c(); // 1
c(); // 2
```

---

### 2.5 class 与继承

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log(this.name);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  bark() {
    console.log(this.breed);
  }
}
```

| 关键字 | 作用 |
|--------|------|
| `class` | 定义类 |
| `extends` | 继承 |
| `super(...)` | 调用父类构造函数 |
| `new` | 创建实例 |

---

### 2.6 数组方法

| 方法 | 作用 | 例子 |
|------|------|------|
| `map` | 加工每个元素 | `[1,2].map(n => n*2)` → `[2,4]` |
| `filter` | 筛选 | `[1,2,3].filter(n => n>1)` → `[2,3]` |
| `reduce` | 压缩成一个值 | `[1,2,3].reduce((a,b)=>a+b,0)` → `6` |
| `find` | 找第一个 | `[1,2,3].find(n => n>1)` → `2` |
| `some` | 有没有满足 | `[1,2].some(n => n>1)` → `true` |
| `every` | 是不是全都满足 | `[1,2].every(n => n>0)` → `true` |
| `forEach` | 遍历 | 无返回值 |
| `sort` | 排序 | `[...arr].sort((a,b) => a-b)` |

**注意**：`sort` 会修改原数组，一般先 `[...arr]` 复制。

---

### 2.7 对象与解构

```javascript
const user = { name: "小明", age: 18 };

// 对象解构
const { name, age } = user;

// 数组解构
const [a, b] = [1, 2];

// 交换
[a, b] = [b, a];

// 展开
const arr2 = [...arr1, 4, 5];
const obj2 = { ...obj1, age: 20 };
```

**在 React props 里**：

```javascript
function PostCard({ post, onDelete }) { ... }
```

---

## 3. DOM 与浏览器

### 3.1 选择元素

```javascript
document.querySelector(".blog-grid");
document.querySelectorAll(".post-card");
```

### 3.2 创建元素

```javascript
const div = document.createElement("div");
div.textContent = "hello";
div.className = "card";

document.body.appendChild(div);
```

### 3.3 事件

```javascript
btn.addEventListener("click", function () {
  console.log("clicked");
});
```

| 事件 | 触发时机 |
|------|----------|
| `click` | 点击 |
| `dblclick` | 双击 |
| `mouseenter` / `mouseleave` | 进入/离开 |
| `input` | 输入 |
| `change` | 值改变 |

### 3.4 localStorage

```javascript
localStorage.setItem("key", JSON.stringify(data));
const data = JSON.parse(localStorage.getItem("key") || "[]");
```

| 方法 | 作用 |
|------|------|
| `setItem(k, v)` | 保存 |
| `getItem(k)` | 读取 |
| `removeItem(k)` | 删除 |
| `clear()` | 清空 |

**注意**：只能存字符串，对象要 `JSON.stringify`。

---

## 4. 异步编程

### 4.1 同步 vs 异步

| 类型 | 例子 |
|------|------|
| 同步 | `console.log`、数组遍历 |
| 异步 | `setTimeout`、`fetch`、文件读写 |

---

### 4.2 Promise

**是什么**：一张“未来会给你结果”的凭证。

```javascript
function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("done"), ms);
  });
}

delay(1000).then(result => console.log(result));
```

| 状态 | 意思 |
|------|------|
| `pending` | 等待中 |
| `fulfilled` | 成功 |
| `rejected` | 失败 |

---

### 4.3 async / await

```javascript
async function run() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}
```

| 关键字 | 作用 |
|--------|------|
| `async` | 声明异步函数 |
| `await` | 等 Promise 完成 |
| `try/catch` | 捕获错误 |

**规则**：`await` 只能写在 `async` 函数里。

---

### 4.4 Promise.all / race

```javascript
// 等全部完成
const results = await Promise.all([p1, p2, p3]);

// 谁先完成用谁
const fastest = await Promise.race([p1, p2, p3]);
```

---

### 4.5 事件循环

**执行顺序**：

```text
同步代码 → 清空所有微任务 → 下一个宏任务 → 清空微任务 → ...
```

| 类型 | 来源 |
|------|------|
| 微任务 | `Promise.then`、`await` 后代码、`queueMicrotask` |
| 宏任务 | `setTimeout`、`setInterval`、I/O、渲染 |

**例子**：

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// 输出：1 4 3 2
```

---

## 5. 模块化与 ES6+

### 5.1 import / export

```javascript
// a.js
export function add(a, b) { return a + b; }

// b.js
import { add } from "./a.js";
```

**Node 里要加**：

```json
"type": "module"
```

**注意**：路径要写全 `.js`，不能省。

---

### 5.2 模板字符串

```javascript
const name = "小明";
console.log(`你好，${name}`);
```

**必须用反引号 `` ` ``，不是引号。**

---

### 5.3 可选链 `?.`

```javascript
user?.address?.city
```

前面是 `null` / `undefined` 时不再往下取，返回 `undefined`，不报错。

---

### 5.4 空值合并 `??`

```javascript
const name = user.name ?? "默认";
```

只有左边是 `null` / `undefined` 时才用右边。

**和 `||` 的区别**：

```javascript
0 || 10    // 10
0 ?? 10    // 0
```

---

### 5.5 正则

```javascript
const reg = /^\w+@\w+\.\w+$/;
reg.test("abc@example.com"); // true
```

| 符号 | 意思 |
|------|------|
| `\w` | 字母/数字/下划线 |
| `\d` | 数字 |
| `+` | 1 次或多次 |
| `*` | 0 次或多次 |
| `?` | 0 或 1 次 |
| `^` | 开头 |
| `$` | 结尾 |
| `\.` | 转义的点 |
| `[]` | 里面任意一个 |
| `{2,5}` | 出现 2-5 次 |

---

## 6. HTTP 协议

### 6.1 是什么

浏览器和服务器之间沟通的规则。

### 6.2 请求

```text
GET /about HTTP/1.1
Host: localhost:3000
```

### 6.3 响应

```text
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

<html>...</html>
```

### 6.4 请求方法

| 方法 | 用途 |
|------|------|
| GET | 拿数据 |
| POST | 提交数据 |
| PUT | 更新 |
| DELETE | 删除 |

### 6.5 状态码

| 码 | 含义 |
|----|------|
| 200 | 成功 |
| 204 | 成功无内容（OPTIONS） |
| 301 / 302 | 重定向 |
| 404 | 找不到 |
| 500 | 服务器错误 |

### 6.6 常见响应头

| 头 | 作用 |
|----|------|
| `Content-Type` | 数据类型 |
| `charset=utf-8` | 编码 |
| `Access-Control-Allow-Origin` | CORS |

---

## 7. Node 原生服务器

### 7.1 最小服务器

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end("你好");
});

server.listen(3000, () => {
  console.log("启动：http://localhost:3000");
});
```

### 7.2 req / res

| 对象 | 内容 |
|------|------|
| `req.method` | 请求方法 |
| `req.url` | 路径 |
| `req.on("data", fn)` | 数据到达 |
| `req.on("end", fn)` | 数据结束 |
| `res.setHeader(k, v)` | 设置头 |
| `res.statusCode = n` | 状态码 |
| `res.end(data)` | 结束响应 |

### 7.3 接收 POST

```javascript
let body = "";
req.on("data", chunk => body += chunk);
req.on("end", () => {
  const post = JSON.parse(body);
  res.end(JSON.stringify(post));
});
```

### 7.4 中文乱码

**原因**：Node 按 UTF-8 发，浏览器不知道编码。

**解决**：

```javascript
res.setHeader("Content-Type", "text/html; charset=utf-8");
```

---

## 8. fs 文件持久化

### 8.1 引入

```javascript
const fs = require("fs");
const path = require("path");
```

### 8.2 路径

```javascript
const filePath = path.join(__dirname, "posts.json");
```

| 名字 | 作用 |
|------|------|
| `__dirname` | 当前文件目录 |
| `path.join` | 拼路径，跨平台 |

### 8.3 读 / 写

```javascript
function readPosts() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writePosts(posts) {
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
}
```

| 函数 | 作用 |
|------|------|
| `fs.readFileSync(p, "utf-8")` | 同步读文件 |
| `fs.writeFileSync(p, d)` | 同步写文件 |
| `JSON.parse(str)` | 字符串 → 对象 |
| `JSON.stringify(obj, null, 2)` | 对象 → 字符串，缩进 2 格 |

---

## 9. CORS

### 9.1 什么是跨域

**协议、域名、端口**任一不同就算跨域。

例子：

- 前端 `http://127.0.0.1:5500`
- 后端 `http://localhost:3000`
→ 端口不同，跨域

### 9.2 原生解决

```javascript
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
  res.statusCode = 204;
  res.end();
  return;
}
```

### 9.3 三个头

| 头 | 作用 |
|----|------|
| `Allow-Origin` | 允许哪些来源 |
| `Allow-Methods` | 允许哪些方法 |
| `Allow-Headers` | 允许哪些请求头 |

### 9.4 易错点

- `Allow-Origin` 只能有一个值，不能写成方法列表
- 复杂请求会先发 `OPTIONS` 预检

---

## 10. Express

### 10.1 安装

```bash
npm install express cors
```

### 10.2 最小服务器

```javascript
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("hello"));

app.listen(3000);
```

### 10.3 路由方法

| 方法 | HTTP |
|------|------|
| `app.get` | GET |
| `app.post` | POST |
| `app.put` | PUT |
| `app.delete` | DELETE |

### 10.4 三个 req 属性

| 属性 | 来源 | 例子 |
|------|------|------|
| `req.params` | 路径 `:id` | `/posts/21` → `"21"` |
| `req.query` | 问号后 | `?a=1` |
| `req.body` | 请求体 | 需 `express.json()` |

### 10.5 四个 res 方法

| 方法 | 作用 |
|------|------|
| `res.send(x)` | 通用发送 |
| `res.json(x)` | 发 JSON |
| `res.status(n)` | 设置状态码 |
| `res.sendFile(p)` | 发文件 |

### 10.6 中间件

```javascript
app.use((req, res, next) => {
  console.log(req.url);
  next();
});
```

| 中间件 | 作用 |
|--------|------|
| `cors()` | 跨域 |
| `express.json()` | 解析 JSON 请求体 |
| `express.static(dir)` | 发静态文件 |

### 10.7 兜底路由（Express 5）

**不能用**：

```javascript
app.get("*", ...);   // ❌ Express 5 报错
```

**正确**：

```javascript
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
```

放在所有路由最后。

---

## 11. SQLite 与 SQL

### 11.1 为什么换 `node:sqlite`

- `better-sqlite3` 需要编译，ARM64 容器里段错误
- `node:sqlite` 是 Node 24 内置，无原生模块，不会崩

### 11.2 建库建表

```javascript
const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("blog.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT,
    date TEXT
  )
`);
```

### 11.3 列类型

| 写法 | 意思 |
|------|------|
| `INTEGER` | 整数 |
| `TEXT` | 字符串 |
| `PRIMARY KEY` | 主键 |
| `AUTOINCREMENT` | 自动递增 |
| `NOT NULL` | 不能为空 |
| `IF NOT EXISTS` | 表存在就跳过 |

### 11.4 常用语句

```javascript
// 查全部
db.prepare("SELECT * FROM posts").all();

// 查一行
db.prepare("SELECT * FROM posts WHERE id = ?").get(id);

// 插入
db.prepare("INSERT INTO posts (title, summary, date) VALUES (?, ?, ?)")
  .run(title, summary, date);

// 删除
db.prepare("DELETE FROM posts WHERE id = ?").run(id);

// 更新
db.prepare("UPDATE posts SET title = ? WHERE id = ?").run(newTitle, id);
```

### 11.5 statement 方法

| 方法 | 返回 | 用途 |
|------|------|------|
| `.run(...)` | info | 增删改 |
| `.all()` | 数组 | 查多行 |
| `.get()` | 一行 | 查一行 |

### 11.6 SQL 关键字

| 关键字 | 意思 |
|--------|------|
| `SELECT` | 查 |
| `INSERT` | 增 |
| `UPDATE` | 改 |
| `DELETE` | 删 |
| `WHERE` | 条件 |
| `AND` / `OR` | 且 / 或 |
| `ORDER BY` | 排序 |
| `LIMIT` | 限制条数 |

**`?` 占位符**：防止 SQL 注入，不要用字符串拼。

---

## 12. Docker

### 12.1 核心概念

| 概念 | 说明 |
|------|------|
| 镜像 Image | 打包好的环境 |
| 容器 Container | 镜像的运行实例 |
| Dockerfile | 构建镜像的说明书 |

### 12.2 Dockerfile

```dockerfile
FROM node:24

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
```

| 指令 | 作用 |
|------|------|
| `FROM` | 基础镜像 |
| `WORKDIR` | 容器内工作目录 |
| `COPY` | 复制文件 |
| `RUN` | 构建时执行 |
| `EXPOSE` | 声明端口 |
| `CMD` | 启动命令 |

### 12.3 `.dockerignore`

```text
node_modules
blog.db
.git
```

作用：构建时不复制这些文件。

**为什么**：本地 `node_modules` 是 Mac 编译的，进 Linux 容器会崩。

### 12.4 常用命令

| 命令 | 作用 |
|------|------|
| `docker build -t name .` | 构建镜像 |
| `docker run -p 3000:3000 name` | 跑容器（前台） |
| `docker run -d -p 3000:3000 name` | 后台跑 |
| `docker ps` | 正在运行的容器 |
| `docker ps -a` | 所有容器 |
| `docker logs ID` | 看日志 |
| `docker stop ID` | 停止 |
| `docker rm ID` | 删除容器 |
| `docker images` | 镜像列表 |
| `docker rmi name` | 删除镜像 |

### 12.5 踩过的坑

| 坑 | 解决 |
|----|------|
| Docker daemon 没启动 | 打开 Docker Desktop |
| `node_modules` 被复制 | `.dockerignore` 排除 |
| `better-sqlite3` 段错误 | 换 `node:sqlite` |
| 端口被容器占 | `docker stop` |
| `rm` 被 alias 成 `trash` | 用 `/bin/rm -rf` |

---

## 13. React 基础

### 13.1 组件

```javascript
function App() {
  return <h1>hello</h1>;
}
```

**规则**：组件名必须**首字母大写**。

---

### 13.2 JSX

**不是 HTML，是 JS 语法糖**。

```javascript
const name = "小明";
return <h1>你好，{name}</h1>;
```

| HTML | JSX |
|------|-----|
| `class="x"` | `className="x"` |
| `for="x"` | `htmlFor="x"` |
| `<p>` | `<p>`（小写标签） |
| - | `<PostCard>`（大写组件） |

---

### 13.3 useState

```javascript
const [count, setCount] = useState(0);

setCount(count + 1);
setCount(prev => prev + 1);   // 推荐
```

**规则**：改状态只能用 `setXxx`，不能直接改。

---

### 13.4 useEffect

```javascript
useEffect(() => {
  // 副作用
}, [依赖]);
```

| 依赖 | 执行时机 |
|------|----------|
| 不写 | 每次渲染 |
| `[]` | 只第一次 |
| `[id]` | 第一次 + `id` 变化 |

**用途**：发请求、订阅、操作 DOM。

---

### 13.5 受控输入框

```javascript
const [title, setTitle] = useState("");

<input
  value={title}
  onChange={e => setTitle(e.target.value)}
/>
```

值由状态控制，输入触发 `setState`。

---

### 13.6 列表渲染

```javascript
{posts.map(post => (
  <PostCard key={post.id} post={post} />
))}
```

| 要点 | 说明 |
|------|------|
| `map` | 遍历数组 |
| `key` | 唯一标识（用 `id`，不用下标） |

---

### 13.7 事件

| 写法 | 行为 |
|------|------|
| `onClick={fn}` | 点击时执行 |
| `onClick={fn()}` | 渲染时立即执行 ❌ |
| `onClick={() => fn(id)}` | 点击时执行，带参数 ✅ |

---

### 13.8 props

```javascript
<PostCard post={post} onDelete={deletePost} />

function PostCard({ post, onDelete }) {
  // 对象解构
}
```

**props 是对象**，所以用 `{ }` 解构。

**不能改 props**，只能读。

---

### 13.9 条件渲染

```javascript
{posts.length > 0 && <p>有文章</p>}
{name || "陌生人"}
{isLoggedIn ? <User /> : <Login />}
```

---

### 13.10 组件拆分

你拆过：

| 组件 | 职责 |
|------|------|
| `App` | 数据 + 路由 |
| `Layout` | 导航栏 + Outlet |
| `Home` / `Posts` / `PostDetail` | 页面 |
| `PostForm` | 表单 |
| `PostList` | 列表 |
| `PostCard` | 一篇 |

---

## 14. React Router

### 14.1 安装

```bash
npm install react-router-dom
```

### 14.2 基础结构

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/posts" element={<Posts />} />
    <Route path="/posts/:id" element={<Detail />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

### 14.3 Link / NavLink

```javascript
<Link to="/about">关于</Link>

<NavLink
  to="/about"
  className={({ isActive }) => isActive ? "active" : ""}
>
  关于
</NavLink>
```

| 组件 | 区别 |
|------|------|
| `Link` | 普通跳转 |
| `NavLink` | 自动加 active class |

**不要用 `<a href>`**，会整页刷新。

---

### 14.4 useParams

```javascript
const { id } = useParams();
// /posts/21 → id = "21"（字符串）
```

---

### 14.5 useNavigate

```javascript
const navigate = useNavigate();
navigate("/posts");
```

**注意**：路径是 `/posts`（斜杠开头），不是 `.posts`。

---

### 14.6 嵌套路由

```javascript
<Route path="/about" element={<AboutLayout />}>
  <Route index element={<About />} />
  <Route path="team" element={<Team />} />
</Route>
```

`AboutLayout` 里：

```javascript
<Outlet />
```

| 概念 | 说明 |
|------|------|
| 子路由 `path` 不带 `/` | 相对路径 |
| `index` | 父路径本身 |
| `<Outlet />` | 子路由渲染位置 |

---

## 15. React Context

### 15.1 三步

```javascript
// 1. 创建
import { createContext } from "react";
const PostContext = createContext(null);
export default PostContext;

// 2. 提供
<PostContext.Provider value={{ posts, addPost, deletePost }}>
  <Routes>...</Routes>
</PostContext.Provider>

// 3. 使用
import { useContext } from "react";
const { posts, deletePost } = useContext(PostContext);
```

### 15.2 用不用

| 场景 | 用什么 |
|------|--------|
| 父子一层 | props |
| 跨 3 层以上 | Context |
| 很多组件都要用 | Context |

---

## 16. Vite

### 16.1 三个命令

| 命令 | 作用 |
|------|------|
| `npm run dev` | 开发服务器（5173） |
| `npm run build` | 打包到 `dist/` |
| `npm run preview` | 本地预览打包结果 |

### 16.2 为什么快

- 基于 ES Module，按需编译
- HMR：保存只更新改动部分

### 16.3 `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/posts': 'http://localhost:3000'
    }
  }
})
```

---

## 17. 部署

### 17.1 两个方案

**方案 A：前后端分离**

- 前端 Vercel
- 后端 Render
- 要 CORS
- 前端用完整地址

**方案 B：一起部署（你选的）**

- React `npm run build` → `dist/`
- 复制到 `backend/public/`
- Express 同时发前后端
- 前端用相对路径 `/posts`

### 17.2 方案 B 步骤

```bash
# 1. 前端打包
cd my-creat-app
npm run build

# 2. 清空后端 public
trash -r backend/public/*

# 3. 复制
cp -r my-creat-app/dist/* backend/public/

# 4. 提交推送
cd backend
git add .
git commit -m "部署 React 版"
git push

# 5. Render 自动部署
```

### 17.3 后端要改

```javascript
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

// 兜底路由（Express 5）
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
```

### 17.4 前端要改

```javascript
// 之前
fetch("http://localhost:3000/posts");

// 部署后
fetch("/posts");
```

### 17.5 Render 注意

- 免费版 15 分钟无访问休眠
- 重启后 SQLite 数据会重置
- 手动部署：**Manual Deploy → Deploy latest commit**

---

## 18. 常见报错速查

| 报错 | 原因 | 解决 |
|------|------|------|
| `ERR_CONNECTION_REFUSED` | 后端没跑 | 启动后端 |
| `EADDRINUSE` | 端口被占 | `lsof -i :3000` 找进程 |
| `Cannot use import outside a module` | 缺 `"type": "module"` | 加上或改 `require` |
| `require is not defined in ES module` | 有 `"type": "module"` 却用 `require` | 去掉或改 `import` |
| `P is not defined` | HTML 标签写成了大写组件 | 改成小写 |
| `onAdd is not a function` | props 没解构 | 用 `{ onAdd }` |
| `Unexpected token '<'` | 后端返回 HTML，不是 JSON | 检查后端路由 |
| `Access-Control-Allow-Origin multiple values` | 头写两次 | 只写一次 |
| `preflight request doesn't pass` | 没处理 OPTIONS | 加 OPTIONS 处理 |
| `SqliteError near "INSET"` | SQL 拼错 | 改成 `INSERT` |
| `table has no column named date` | 表结构旧 | 删 `.db` 重建 |
| `Missing parameter name at index 1: *` | Express 5 写法变了 | 用 `app.use` 兜底 |
| `Segmentation fault` | native 模块不兼容 | 换 `node:sqlite` |
| `Cannot find module './xxx'` | 路径写错 | 检查路径 |
| 文件名大小写问题 | Mac 不区分，Linux 区分 | 统一大小写 |
| `rm: aliased to trash` | `rm` 被 alias | 用 `/bin/rm` |

---

## 19. 函数速查表

### Node 原生

| 函数 | 作用 |
|------|------|
| `http.createServer(fn)` | 创建服务器 |
| `server.listen(port, fn)` | 监听 |
| `req.on("data", fn)` | 数据到达 |
| `req.on("end", fn)` | 数据结束 |
| `res.setHeader(k, v)` | 设头 |
| `res.end(data)` | 结束 |
| `res.statusCode = n` | 状态码 |

### fs / path

| 函数 | 作用 |
|------|------|
| `fs.readFileSync(p, "utf-8")` | 读 |
| `fs.writeFileSync(p, d)` | 写 |
| `path.join(a, b)` | 拼路径 |
| `__dirname` | 当前目录 |

### JSON

| 函数 | 作用 |
|------|------|
| `JSON.parse(str)` | 字符串 → 对象 |
| `JSON.stringify(obj)` | 对象 → 字符串 |
| `JSON.stringify(obj, null, 2)` | 带缩进 |

### Express

| 函数 | 
