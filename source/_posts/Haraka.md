---
title: 使用 Haraka 搭建 SMTP 邮件服务
date: 2021-04-02 00:19:21
tags: [Mail]
categories: [Memo]
description: 自建SMTP邮件服务的一次尝试
---

## Prologue

用自己的域名当作邮箱有一段时间了，用了[网易企业邮箱](https://ym.163.com/)作为解决方案
使用门槛还是很低的，[准备一个域名]、[验证域名的MX记录]就行了，适合懒人
当然免费版有发送间隔限制，要商用（发很多邮件的情况下）还是不推荐

当然收发并不需要同一个服务器，所以决定把发件服务(SMTP)分离出去，单独自建
至于可选择的开源方案有很多，这次是随便选了个，做一次尝试和记录
文章也是简答的记录了下 Haraka 配置过程，我个人的话、也并不推荐你使用它

[Haraka](https://github.com/haraka/Haraka) 是一个使用 `Nodejs` 写的高性能 SMTP Server
> 官网文档：https://haraka.github.io/

{% github haraka/Haraka  %}
A fast, highly extensible, and event driven SMTP server
{% endgithub %}


## Preparations

首先先搞懂几个名词**SMTP**、**MX**、**SPF**

### SMTP

当前 Email 通信，还是在使用 SMTP 这个协议。`SMTP` (Simple Mail Transfer Protocol) 即「简单邮件传输协议」
`SMTP`还是比较简陋的，根据 SMTP 的规则，发件人的邮箱地址是`根据发件人任意声明的`

### SPF

所以这边还需要了解一个概念`SPF`（Sender Policy Framework） 即「发件人策略框架」
SPF其实是一条DNS记录

打个比方，邮件服务器收到了一封邮件，发件人主机IP是`111.11.1.0`，声称的发件人为`email@example.com`
想确认发件人是不是伪造的，邮件服务器会去找到`example.com`域名的SPF记录
如果这个域名的SPF记录设置了`111.11.1.0`为白名单，那这封Mail就是可信的
如果不在白名单，那可能会被标记可疑/垃圾Mail

因为不怀好心的人虽然可以「声称」他的邮件来自`example.com`
但是他却无权操作`example.com`的 DNS 记录；同时他也无法伪造自己的 IP 地址
**因此 SPF 是很有效的**
当前基本上所有的邮件服务提供商（例如 Gmail、QQ 邮箱等）都会验证它。

### MX Record

邮件交换记录，本质上也是域名的一条DNS记录。决定了发件人投递的服务器

当你要往`ame@abyss.moe`投递邮件的时候、发件服务器会先查找`abyss.moe`的`MX Record`

![](https://ae01.alicdn.com/kf/U449a3240e4b64dd1802a160463bdcd46m.jpg)

比如我的设置如上图所示，中间的数字是`Priority`，越小越高
所以发件服务器会把Mail先投给`mx.ym.163.com`
但如果没成功，会继续投递给下一条MX解析记录的IP


### Create an SPF TXT record
上面是邮件的基本概念，了解即可
这次我准备搭建的是只是`发件服务`，所以只需设置SPF记录
要设置SPF的话，在域名供应商的DNS解析页面，添加TXT记录即可

> 请注意，DNS Type **不要**选择 SPF，请选择**TXT records**。因为 SPF 记录 已经被 TXT 记录 代替了
> DNS specifications have deprecated the SPF record type in favor of TXT records.

![](https://ae01.alicdn.com/kf/Ud177f328a1ce47dc809fe12c458703863.jpg)

上图意义为：允许当前域名的 mx 记录对应的 IP 地址
具体语法你可以参考网上的文档

```text
### 这边再举几个例子

"v=spf1 ip4:192.168.0.1/16 -all"
只允许在 192.168.0.1 ~ 192.168.255.255 范围内的 IP

"v=spf1 mx mx:deferrals.example.com -all"
允许当前域名和 deferrals.example.com 的 mx 记录对应的 IP 地址。
```

添加好之后，我们可以在服务器上安装`Haraka`了

## Installing Haraka

`Haraka`由`JS`编写，首先要安装`Nodejs`

> 安装 Nodejs 可以参考
> https://github.com/nodesource/distributions/blob/master/README.md

### Debian and Ubuntu based distributions

```shell
curl -fsSL https://deb.nodesource.com/setup_15.x | bash -
apt-get install -y nodejs
```

### Enterprise Linux based distributions

```shell
yum install -y nodejs
```

`npm`是`Nodejs`的包管理器，`npm`也会自动一起安装，接着使用`npm`安装`Haraka`

```shell
npm install -g Haraka
```

如果没有出错的话，执行`haraka`看到下面的返回，就算成功了

![](https://ae01.alicdn.com/kf/Uae220f5dd43646f195d397c829d594b6e.jpg)

##  Configure Haraka


### 创建配置文件

```shell
haraka -i /etc/haraka
```

会自动生成需要的配置文件和目录

```shell
create: /etc/haraka
create: /etc/haraka/plugins
create: /etc/haraka/docs
create: /etc/haraka/config
create: /etc/haraka/config/smtp.ini
create: /etc/haraka/config/log.ini
create: /etc/haraka/config/plugins
create: /etc/haraka/config/dkim
create: /etc/haraka/config/dkim/dkim_key_gen.sh
```

### 启动验证插件

先编辑`config/plugins`，把`auth/flat_file`这一行的注释#去掉，启用这个插件

> flat_file 插件的说明
> https://haraka.github.io/plugins/auth/flat_file/

在`config`目录下新建`auth_flat_file.ini`，填写一下内容
`user1=password1`是用户名和密码，可以自己更换

```ini /etc/haraka/config/auth_flat_file.ini
[core]
methods=PLAIN,LOGIN,CRAM-MD5

[users]
user1=password1
```

### 本地测试

先在终端运行 `Haraka`

```shell
haraka -c /etc/haraka
```

启动另一个终端
接着我们使用`swaks`测试一下，`swaks`是一个SMTP测试工具
下载`swaks`编译好的文件执行即可使用

```shell
## 下载 swaks 二进制包
## http://www.jetmore.org/john/code/swaks/installation.html

curl -O https://jetmore.org/john/code/swaks/files/swaks-20201014.0/swaks
chmod 755 ./swaks
```

来测试一下，下面是示例用法
`-au`和`-ap`后面参数是刚刚配置的用户名密码
`-t`后面是收件人，`-f`后面是发件人

```shell
./swaks -f ame@abyss.moe \
-t to@qq.com  \
-s localhost \
--header "Subject:标题" \
--body "内容" \
-au user1 \
-ap password1 
```

如果返回`250 Message Queued`，即为成功，可以检查下邮箱有没有收到
被拒收了的话，可能是你SPF配置问题

![](https://ae01.alicdn.com/kf/U346ce1f6cbbf4d2eb6697336f38ecc5eO.jpg)

### 配置tls证书

在`本地`通过`Haraka`发送邮件是不需要配置`tls`的
如果你用另一台服务器，则强制需要通过`tls`加密通信

> Outbound Mail with Haraka
> https://haraka.github.io/tutorials/SettingUpOutbound/
> https://haraka.github.io/core/Outbound/

首先申请域名的TLS证书
这里给个实例，具体过程可以参考其他的一些文章
由于我使用了`Cloudflare`，这边直接`Cloudflare API`和`acme.sh`签发

```shell
### 设置 Key
export CF_Key="xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
export CF_Email="xxxxxx@xx.cxom"

### 获取 acme
git clone https://github.com/acmesh-official/acme.sh.git
cd ./acme.sh
./acme.sh --install


### 通过API添加txt记录，然后会自动验证签发
./acme.sh --issue --dns dns_cf -d "abyss.moe" -d "*.abyss.moe"

### 成功的话，结果如下
### fullchain 是证书链，包含了 cert、intermediate CA cert

## Your cert is in  /root/.acme.sh/abyss.moe/abyss.moe.cer 
## Your cert key is in  /root/.acme.sh/abyss.moe/abyss.moe.key 
## The intermediate CA cert is in  /root/.acme.sh/abyss.moe/ca.cer 
## And the full chain certs is there:  /root/.acme.sh/abyss.moe/fullchain.cer
```

### 启用 TLS

在`config/plugins`里把tls前面的#去掉，启用tls插件
编辑`config/tls.ini`

> Haraka TLS plugin
> https://haraka.github.io/plugins/tls/

```ini /etc/haraka/config/tls.ini
key=/usr/local/nginx/conf/ssl/abyss.moe/abyss.moe.key
cert=/usr/local/nginx/conf/ssl/abyss.moe/fullchain.cer
```

### 测试加密通信

然后重启下 `Haraka`
在另一台服务器使用`swaks`试一下
把刚刚的参数加上`-tls`, `-s`后面参数换成你的域名

```shell
./swaks -f ame@abyss.moe \
-t to@163.com  \
-s abyss.moe \
--header "Subject:标题" \
--body "内容" \
-au user1 \
-ap password1 \
-tls
```

成功的话，还是会返回`250 Message Queued`，检查下邮箱应该会收到

![](https://ae01.alicdn.com/kf/U1e686a42111e4a728e6d898a5d4f4dddm.jpg)

## Create a daemon process 

可以使用`Systemd`在后台运行
新建一个文件：`haraka.service`

```ini haraka.service
[Unit]
Description= Haraka Mail Service
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
User=root
Group=root
ExecStart=/usr/bin/haraka -c /etc/haraka
Restart=always
LimitNOFILE=512000

[Install]
WantedBy=multi-user.target
```

启用该服务

```shell
mv haraka.service /etc/systemd/system
systemctl enable haraka && systemctl start haraka
```

> 参考过的一些文章
> SPF 记录：原理、语法及配置方法简介 - [Renfei Song's Blog](https://www.renfei.org/blog/introduction-to-spf.html)
> haraka收发邮件初级教程 - [SHANG Blog](https://blog.xinshangshangxin.com/2018/02/04/haraka-introduction/)