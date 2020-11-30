---
title: My New Post
date: 2020-10-13 21:32:48
tags:
---

## 花落如缤

最近这段时间闲下来了，正好把`主页`和`Blog`折腾一下
其实之前`Blog`有很多不满意的地方，特别是阅读体验较差
虽说改下CSS就行了，但想改的东西一多了，人就变懒了。有时真是觉得自己无药可救了
干脆"重来吧"的想法也随之产生


## 侧耳倾听

静下来的时候，整理了下自己的想法：`为了谁而写`,`专注于什么内容`,`为什么写`
其实两年弄下来自己也发现，自己原创技术性和科普性的文章需要很多知识
自己大多数写的类似笔记一样的东西，有时候忘了，过来翻一下
大部分并不是能引发讨论或去深入理解某些问题的文章

写给谁看
>写给自己的笔记本

目的是什么
>记录自己走过的路，让来访者少走弯路

这便成为了我目前写作的**方向**

## 静谧地绽放于世的古老魔法

从程序上，有很多选择`wordpress`、`hexo`、`ghost`、`typecho`，甚至还有一些冷门的选择
最后还是选择了`hexo`，自己并不需要后台，也适合折腾

Github : https://github.com/hexojs/hexo
Homepage: https://hexo.io/zh-cn/

安装起来还是很简单的，如果没有`nodejs`的话请先安装它

```bash
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
```

如果在大陆，网络遇到困难的话，可以用代理

```bash
git config --global http.proxy http://proxyuser:proxypwd@proxy.server.com:port
npm config set proxy http://proxy.server.com:port
npm config set https-proxy http://proxy.server.com:port
```


## 回响

在主题上，选用了`nexT`，显然这是一款很成熟的主题了，已经无需要过多的去魔改

## 定制

### 主色

感謝[Nippon Colors](https://nipponcolors.com/)解決了我的配色命名強迫症

主題色選擇了`紫苑(SHION)` `#8F77B5`

其他顏色

- $TSUYUKUSA = #2EA9DF; //露草
- $SAKURA = #FEDFE1; // 桜
- $KOHBAI = #E16B8C; //紅梅

### 标题

2级标题前加上了的"#"
3级标题用"[]"包裹

### 光标

参考了`蝉時雨`的[Aurora](https://github.com/chanshiyucx/aurora)
修改了`默认的`和`指向链接时的`鼠标指针

### 着重文本

这是很**重要的内容**哦

参考了[毎日のんびり日本語教師](https://nihongonosensei.net/)
使用了第二主色作为背景下划线

### 链接

https://github.com/

使用了第三主色作为背景下划线

### 引用块

引用部分使用蓝色背景包裹

>Container-Optimized OS 是适用于 Compute Engine 虚拟机的操作系统映像，专为运行 Docker 容器而优化。借助 Container-Optimized OS，您可以快速、高效、安全地在 Google Cloud Platform 上启动 Docker 容器。Container-Optimized OS 由 Google 维护，基于 Chromium OS 开放源代码项目。

### 回到顶部的NEKO

修改了`utils.js`的`registerScrollPercent`、`widgets.njk`的`line 2`
附加了些css样式


### 列表

参考了[MARKSZのBlog](https://molunerfinn.com/)进行了修改

1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素
    
- ワウワウ
- あははは

1. 行くよ
2. DOWN TO ZERO

### 表格

| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |


### 代码高亮

使用了默认的`highlight.js`，风格是`mac`，附加了`css`

`npm install hexo-cli -g`

```stylus
  figure.highlight {
    background: $SHION;
    border-radius: 5px;

    .table-container {
      background-color: #f0f0f0;
    }

    .copy-btn i {
      color: #fff;
    }
  }
```


### html测试

<p style="color: red">红色文字测试</p>

### Javascript测试
<button class="btn" id="jsTestBtn">点我弹框！</button>

<script>
document.addEventListener('DOMContentLoaded',function(){
    document.querySelector('#jsTestBtn').addEventListener('click',function() {
       alert('喵！');
    });
});
</script>

### 浏览器滚动条

附加了些CSS样式

### 底部版权申明

在`_source/post-body-end.njk`上附加了html内容

### 侧边栏友链按钮

在`_source/sidebar.njk`上附加了html内容


### Github 卡片

利用`Hexo tag`写了个`Github`卡片，像这样

{% github FMudanyali/TrophyShot %}
Just like in PS4, it takes a screenshot whenever you unlock a trophy.
{% endgithub %}

从nexT主题的`button`稍稍改了下，以下是`code`，js放到主题下的`scripts/tags`下就行

```text
#文章内使用

{% github FMudanyali/TrophyShot %}
Just like in PS4, it takes a screenshot whenever you unlock a trophy.
{% endgithub %}
```

## TODO

- 图片占位符，延迟加载
- 更新超过60天后，顶部alert提示`该文章内容可能已经过时`
- 字体优化
- 评论优化
- 文字顶部注音、注释
- 折叠框/折叠代码部分
- 优化代码高亮
- 控制台个性输出
- 更多的动画过渡