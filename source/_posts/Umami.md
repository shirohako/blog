---
title: 使用 Umami 自建 Web Analytics 平台
date: 2021-04-09 09:03:16
tags: [web]
categories: [Memo]
description: 自建 Web Analytics 工具的记录
---


## 介绍

Umami 是一个简单的网站统计工具，可以代替 Google Analytics
使用nodejs编写，需要配合 MySQL 或 Postgresql
使用起来很简单，比起 Google Analytics 比较直观，对SPA单页应用也支持不错

{% github /mikecao/umami,https://app.umami.is/share/8rmHaheU/umami.is  %}
Umami is a simple, fast, website analytics alternative to Google Analytics.
{% endgithub %}


### 已经搭好的实例站点

{% btn https://akari.abyss.moe/share/f3LFt4Aj/Blog, My Blog Report, fas fa-home fa-fw %}

{% btn https://akari.abyss.moe/share/TfpYy4OU/Atelier, Atelier Report, fas fa-book fa-fw %}

### 预览图

![](https://ae01.alicdn.com/kf/U5040576c840f408fa33e057ddbf6b640L.jpg)

![](https://ae01.alicdn.com/kf/U741aa8a3aa5c4e16af007ba39c685192f.jpg)


## 从源码安装

也可以直接使用`docker`安装，这里先介绍下用`nodejs`运行源码

### 安装nodejs

> 可以参考
> https://github.com/nodesource/distributions/blob/master/README.md

**CentOS 7**
```shell
yum install nodejs -y
```

**Debian / Ubuntu**
```shell
curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
apt-get install -y nodejs
```


### 从源码安装 Umami

下载源码并使用`npm`安装依赖

```shell
git clone https://github.com/mikecao/umami.git
cd umami
npm install
```

### 创建数据表

表结构在源码的`sql`目录下，导入就行


如果`mysql`导入的时候出现了这样的错误：
 {% label primary@Incorrect table definition; there can be only one TIMESTAMP column with CURRENT_TIMESTAMP in DEFAULT or ON UPDATE clause %}

是因为老版本mysql不能定义多个`DEFAULT CURRENT_TIMESTAMP`，升级到5.6.5以上或者手动修改下吧


For MySQL:
```shell
mysql -u username -p databasename < sql/schema.mysql.sql
```


For Postgresql:
```shell
psql -h hostname -U username -d databasename -f sql/schema.postgresql.sql
```

### 配置 umami
根目录创建一个`.env`文件，填写下面内容
HASH_SALT是随机字符串，DATABASE_URL是连接字符串

```text
DATABASE_URL=(connection url)
HASH_SALT=(any random string)
```

`connection url `的参考格式

```text
postgresql://username:mypassword@localhost:5432/mydb

mysql://username:mypassword@localhost:3306/mydb
```

### 构建 umami

如果以后使用了`git pull`更新了源码，需要再`build`一次

```
npm run build
```

### 运行
```text
npm start
```

会默认运行在`http://localhost:3000`

## Docker 安装

> 可以参考 Github 的说明
> https://umami.is/docs/install

To build the `umami container` and start up a `Postgres database`, run:
```shell
docker-compose up
```

Alternatively, to pull just the `Umami Docker` image with `PostgreSQL` support:
```shell
docker pull ghcr.io/mikecao/umami:postgresql-latest
```

Or with `MySQL` support:
```shell
docker pull ghcr.io/mikecao/umami:mysql-latest
```

## Nginx 反向代理

创建一个`vhost` , `location` 使用 `proxy_pass`即可

```text
location / {
  	    proxy_pass http://localhost:3000;

   	    proxy_set_header Host $host;
   	    proxy_set_header X-Real-IP $remote_addr;
   	    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 	    proxy_set_header X-Forwarded-Proto $scheme;
}

```

这边还是给个完整实例可参考
如果配了域名，记得`DNS记录`也添加下

```text
server
    {
        listen 443 ssl http2;
        #listen [::]:443 ssl http2;
        server_name akari.abyss.moe;
        index index.html index.htm index.php default.html default.htm default.php;
        root  /home/wwwroot/default;

        ssl_certificate /usr/local/nginx/conf/ssl/abyss.moe/fullchain.cer;
        ssl_certificate_key /usr/local/nginx/conf/ssl/abyss.moe/abyss.moe.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers on;
        ssl_ciphers "TLS13-AES-256-GCM-SHA384:TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-128-GCM-SHA256:TLS13-AES-128-CCM-8-SHA256:TLS13-AES-128-CCM-SHA256:EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5";
        ssl_session_cache builtin:1000 shared:SSL:10m;
        # openssl dhparam -out /usr/local/nginx/conf/ssl/dhparam.pem 2048
        ssl_dhparam /usr/local/nginx/conf/ssl/dhparam.pem;

        #error_page   404   /404.html;

        # Deny access to PHP files in specific directory
        #location ~ /(wp-content|uploads|wp-includes|images)/.*\.php$ { deny all; }

        #include enable-php.conf;
	    location / {
            proxy_pass http://localhost:3000;
    
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        access_log off;
    }

```

## 添加网站

上面都没问题的话，在浏览器中打开，就可以看到登录界面
默认的用户名是`admin`，密码是`umami`

![](https://ae01.alicdn.com/kf/Ubd02ba1d99bb4578a76c0e4ec2bc570cX.jpg)

在Setting可以添加网站，添加好后，点`Get tracking code`获得嵌入代码
放到网站的`head`标签内就行了

![](https://ae01.alicdn.com/kf/U3aa67d1eaca74e2bb7f78ced389eae8dg.jpg)

设置里可以打开`share URL`，任何人都可以看到这个报告

![](https://ae01.alicdn.com/kf/U9f0987f77ba34164806a5e282774da7fw.jpg)

## 使用 Systemd 运行

创建`/etc/systemd/system/umami.service`
下面是个参考，需要使用的的话记得改下`ExecStart`路径

```text
[Unit]
Description=Node.js Server

[Service]
WorkingDirectory=/home/wwwroot/umami
Type=simple
ExecStart=/home/wwwroot/umami/node_modules/next/dist/bin/next start
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=node-server

[Install]
WantedBy=multi-user.target
```

编辑好后启动即可，无需干预可以在后台稳定运行了

```shell
systemctl enable umami && systemctl start umami
```