---
title: 自建一个 PSNine 自动签到服务
date: 2021-10-24 22:43:37
tags:
---

## Intro

一些老的中文BBS,仍然保留了签到功能,每天打卡可以换取些论坛货币
之前自己都是写脚本,添加定时任务完成的
最近也是发现了`binux/qiandao`这个基于`HAR`的签到框架,于是决定搭一个公开实例,方便大家使用

当然`binux/qiandao`最近已经没有在维护了,推荐基于这个框架修改和完善项目`qiandao-today/qiandao`
https://github.com/qiandao-today/qiandao


已经搭建完成的站点: https://qd.abyss.moe/


## 部署

可以使用`Docker`运行,或Clone源码后使用`Python`运行
当然使用`Docker`的话,数据库基于`sqlite`,这样就不需要额外数据库配置和安装了
所以下文使用`Docker`安装,比较方便


### 安装Docker

已经安装了的话,可以跳过

```bash
curl -sSL https://get.docker.com | sh

systemctl enable docker --now

## 当然,在大陆并且网络有困难的话,可以使用daocloud.io的国内镜像
## curl -sSL https://get.daocloud.io/docker | sh
```

### 创建容器

$(pwd)为当前目录,可以根据自己需求替换

```
docker run -d --name qiandao -p 8923:80 -v $(pwd)/qiandao/config:/usr/src/app/config a76yyyy/qiandao
```

这时候访问 http://ip:8923 的话,你应该能正常看到`qiandao`的`webui`

![](https://ae01.alicdn.com/kf/H902a6b67e4c04a9e887a321dc3bcc104S.png)

点击登录,然后输入自己邮箱和密码,选择注册.可以进入到后台页

![](https://ae01.alicdn.com/kf/H4d74128d2ea44998af59b6d4fb168024Y.png)

我们需要设置一个管理员,回到你的终端,进入容器

```
docker exec -it qiandao /bin/bash
```

接下来设置管理员 (请把邮箱换成你自己注册的),然后重新登陆下
`config.py`是配置文件,具体配置可以参考项目的`Readme.md`
https://github.com/qiandao-today/qiandao/blob/master/README.md

配置结束后,`exit`退出容器管理

```
bash-5.1# python ./chrole.py ame@abyss.moe admin
role of ame@abyss.moe changed to admin
bash-5.1# exit
exit
```

### 使用 Nginx 反向代理

Nginx的话可以直接通过包管理安装
创建一个新的`server`配置,`location`反向代理8923端口即可

```
location /
{
    proxy_pass http://127.0.0.1:8923;
}
```

## 创建模版

创建签到任务前,首先要编写模版
这里以在`PSNine`签到为例,简单说下如何保存HAR,还有建立模版的过程
需要准备2个帐号,一个现代的浏览器(Chrome, Edge, Firefox etc..)


打开[网站](https://www.psnine.com),按F12打开控制台,切换到`Network`选项卡
勾上`Preserve Log`,以防止页面刷新或跳转后,所有`Request`被清空
点击`Clear`按钮,把之前打开的无用的`Request`清空下

![](https://ae01.alicdn.com/kf/He24081cd7ae149f29307ed6487e6e237Z.png)


点击签到按钮后,后会多出几个请求`log`
右键第一个`Request`,选择`Save all as HAR with content`保存HAR文件

![](https://ae01.alicdn.com/kf/Hc7744d337b8e47e0ba7d3dcbe5f3025fL.png)


回到你的签到站,新建模版,上传HAR文件,用户名和密码不需要填写
点击你的请求,接下来我们要做一些修改

![](https://ae01.alicdn.com/kf/Heb14f724d1c94a939a98a7fc2f73d8ffD.png)

把你自己的`Cookies`删除,`Request Headers`中的`Cookie`对应值改成变量`{{cookie}}`,并且打勾
可以把浏览器自带的一些没用的`Request Headers`清除,改好的如下图

![](https://ae01.alicdn.com/kf/He786b489ce5c4e5aac4e2265f5f52f4eU.png)


想可以在测试选项卡添加变量,填写自己的`cookie`后,点击测试
可以观察下的`html`源码.成功的话,获取的铜币也在html元素里
为方便我们查看日志,我们用正则提取出来,比如这样

```
coin        <b style="color:red;">(\d+)<
day         <b style="color:green;">(\d+)<
```

![](https://ae01.alicdn.com/kf/H1f995c52916a4c1c9288238707228961E.png)

这样`签到的天数`和`铜币数量`就保存在变量`day`和`coin`中了.点击保存一次
接着我们继续插入一个`unicode转换`, 点击保存

![](https://ae01.alicdn.com/kf/H2da01d062cc34bcdbbc9c6388f3eb93a4.png)

在`Query String Parameters`的`content`填写需要转换内容`祈祷得到 {{coin}} 铜币,已经累计祈祷 {{day}} 天了`

![](https://ae01.alicdn.com/kf/H8d5f5b5dd9964087bef7e63ade0e722d5.png)

在预览页面,变量提取的`name`改成`__log__`,正则保持默认的`"转换后": "(.*)"`即可

![](https://ae01.alicdn.com/kf/H0d467965d2e74e63a4abae6c98050e3ck.png)

保存后.可以在我的模版里发布成`公开模版`,然后在我的发布页面里审核通过

## 签到

新建一个签到任务,填上自己的`Cookie`即可
如果装了GetCookie浏览器插件,应该可以直接点击获取

![](https://ae01.alicdn.com/kf/He8d0b855cae04126974b99de2c08f045A.png)

### 如何取得cookie

关于手动获取`Cookie`的方法,先打开想要获取的网站

F12打开控制台,切换到`Console`页面,输入`document.cookie`,去掉前后的`'`就是你的`cookie`
**[更新] 请注意** {% label primary@这样是无法获取带 HTTP Only 的 Cookie %},也就是可能获取不全.所以**请使用下面的方法**

![](https://ae01.alicdn.com/kf/H58a68119479a479cac2e3a79b158a6a1N.png)

或者在`Network`选项卡里面打开任意请求,找到`Request Headers`,把`Cookie`内容复制出来

![](https://ae01.alicdn.com/kf/Hb9833860f5834751b6cf043d49ee9789q.png)
