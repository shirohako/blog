---
title: 用 Docker 搭建 Mastodon 实例
date: 2023-12-02 17:21:12
tags: [Mastodon]
categories: [Memo]
description: 去中心的社交平台的一次体验，自己搭建一个单人 Mastodon(长毛象) 的流程记录。
---

## 转移到 ActivityPub

![](https://i.psray.net/i/2023/12/02/656aff270a5c2.webp)

最近也是不满意 Twitter 的各种变化，决定尝试自建一下 Mastodon 用
Twitter 被收购是各种黄推泛滥，开了蓝标还能置顶。环境是越来越差
之前有想过自己建立类似的社交平台，看到 **Mastodon** 和 **Misskey** 都是不错的选择

当然，如果只是想换到 **ActivityPub** 的分布式开放社交平台
无需自建，网上有很多实例，直接注册使用就能用了
当然，自己管理当然非常麻烦，维护需要时间还有成本，收益几乎没有
但之前有看到 Mastodon 可以在单用户模式下运行，觉得很有意思，想试一下

## 安装 Docker 和 Docker compose

如果已经安装过，请跳过该步骤

docker compose (Plugin) 请使用 `docker compose` 命令
docker-compose (Standalone) 请使用 `docker-compose` 命令


下文都以 插件(Plugin) 的形式为例，首先安装 **Docker**

```
curl -sSL https://get.docker.com/ | CHANNEL=stable sh
# After the installation process is finished, you may need to enable the service and make sure it is started (e.g. CentOS 7)
systemctl enable --now docker
```

安装 **Docker compose**

On Debian/Ubuntu systems:

```
apt update
apt install docker-compose-plugin
```

On Centos 7 systems:

```
yum update
yum install docker-compose-plugin
```



## 获取 Mastodon

获取 Mastodon 仓库，切换到稳定版本

```
git clone https://github.com/tootsuite/mastodon.git
cd mastodon && git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
```


按需求修改 `docker-compose.yml`
需要安装`db`,`redis`,`es`,`web`,`streaming`,`sidekiq`

**db**是`Postgres`数据库
**es**是`Elasticsearch`，全文搜索引擎，这是可选地
**streaming**组件是 Mastodon 的推送服务
**sidekiq**是 Mastodon 的后台任务处理队列

如果需要指定版本号，可以修改image后面的内容，默认都是可靠的稳定版本
如果端口有被占用，可以修改ports，


例如我这边3000端口已被使用，换成了3001，注意只需要改动`第一个:后面的端口`即可

```
    ports:
      - '127.0.0.1:3001:3000'
```

复制env文件

```
cp .env.production.sample .env.production
```

## 配置 Mastodon

使用 docker compos 安装
```
docker compose build
```

可以使用`mastodon:setup`生成一些必要的配置
根据交互提示填写完成后，必要信息会输出到终端中，请再编辑`.env.production`文件
把生成的一些配置修改进去

```
docker compose run --rm web bundle exec rake mastodon:setup
```

如果 enable single user mode 那这个示例就无法注册，首页也会变成你的 `Timeline`
Docker安装时，`PostgreSQL /Redis`的`host`，分别是 `db / redis`


`PostgreSQL`的默认用户名是`postgres`，密码直接回车。第一次配置时候回提示导入数据，选y即可
`SMTP`请根据实际情况填写，可以参考我之前自己SMTP服务器的文章
`Save configuration`请选择 `y`，配置文件不会自动保存
最后会提示创建 Admin 用户，根据提示输入用户和邮箱。之后也可以单独创建

```
# root @ Alice in ~/mastodon on git:v4.2.1 x [16:43:01] 
$ docker compose run --rm web bundle exec rake mastodon:setup
[+] Creating 2/0
 ✔ Container mastodon-db-1     Running                                                                                   0.0s 
 ✔ Container mastodon-redis-1  Running                                                                                   0.0s 
Your instance is identified by its domain name. Changing it afterward will break things.
Domain name: m.abyss.moe

Single user mode disables registrations and redirects the landing page to your public profile.
Do you want to enable single user mode? yes

Are you using Docker to run Mastodon? Yes

PostgreSQL host: db
PostgreSQL port: 5432
Name of PostgreSQL database: postgres
Name of PostgreSQL user: postgres
Password of PostgreSQL user: 
Database configuration works! 🎆

Redis host: redis
Redis port: 6379
Redis password: 
Redis configuration works! 🎆

Do you want to store uploaded files on the cloud? No

Do you want to send e-mails from localhost? No
SMTP server: smtp.mailgun.org
SMTP port: 587
SMTP username: 
SMTP password: 
SMTP authentication: plain
SMTP OpenSSL verify mode: peer
Enable STARTTLS: always
E-mail address to send e-mails "from": Mastodon <notifications@m.abyss.moe>
Send a test e-mail with this configuration right now? no

Do you want Mastodon to periodically check for important updates and notify you? (Recommended) Yes

This configuration will be written to .env.production
Save configuration? Yes
Below is your configuration, save it to an .env.production file outside Docker:
```

示例生成的配置，仅供参考
配置文件不会自动保存，请手动编辑`.env.production`写入配置

```
# Generated with mastodon:setup on 2023-12-02 08:43:45 UTC

# Some variables in this file will be interpreted differently whether you are
# using docker compose or not.

LOCAL_DOMAIN=m.abyss.moe
SINGLE_USER_MODE=true
SECRET_KEY_BASE=25ecdbe5ea7b142e3fd3fb7433a3dbe5b3bb3dab88d73181b6afbccce54238f2072f8a8a3e439279881d47c7b02d67ac259d5dcd9667c5b8e13ba5bcd291dd3c
OTP_SECRET=39b8b295a98b0c04a332554246891ebf813555ea7e8a5448581ffe2435db2f4354e05d270a428f075006bf23efb3574f720437e177a8d49ec39bb234ae069ce4
VAPID_PRIVATE_KEY=nDZtWvht7dlh5E5WI7RgjpXjakqpX4cWOysbu4Lv0js=
VAPID_PUBLIC_KEY=BM8R9sO6nijQKEoW2XSmMoBdCNnb4wuuPuTZqVazZR5ThhVjpTzMS4ll4_HbrBSsqnfeJ2VDO9E88ffTqj0Q8U4=
DB_HOST=db
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASS=
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
SMTP_SERVER=smtp.mailgun.org
SMTP_PORT=587
SMTP_LOGIN=
SMTP_PASSWORD=
SMTP_AUTH_METHOD=plain
SMTP_OPENSSL_VERIFY_MODE=peer
SMTP_ENABLE_STARTTLS=always
SMTP_FROM_ADDRESS=Mastodon <notifications@m.abyss.moe>
```

将容器跑起来

```
docker compose up -d
```

## 配置 Nginx

如果没有Nginx，使用包管理安装一下，例如 Ubuntu

```
apt install nginx -y
```

复制配置到Nginx的sites-available内

```
cp dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
```

然后编辑它，以下内容比较重要

```
# 两个 server_name 都要修改
server_name example.com;  

# 请换成 mastodon 目录的 public 路径
root /home/mastodon/live/public; 

# 稍后会生成 SSL 证书，生成后需要替换证书路径
ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

# 如果安装时，你的 mastodon web/streaming 端口改了，清把下面端口也替换
location @proxy {
  proxy_pass http://127.0.0.1:4000;
}
```

证书生成方式有很多种，这里以 acme.sh + dnsapi + cloudflare 举例
使用 acme.sh 生成SSL证书，DNS APi 可以参考 acme.sh [wiki](https://github.com/acmesh-official/acme.sh/wiki/dnsapi)

获取 acme.sh

```
curl https://get.acme.sh | sh -s email=my@example.com
```

得到证书

```
export CF_Key="763eac4f1bcebd8b5c95e9fc50d010b4"
export CF_Email="alice@example.com"

acme.sh --issue --dns dns_cf -d abyss.moe -d '*.abyss.moe'
```

成功的话，把 cert key 和 full chain 的路径配置到 Nginx 中

```
[Wed Nov  9 18:39:24 CST 2022] Your cert is in  /usr/local/nginx/conf/ssl/abyss.moe/abyss.moe.cer 
[Wed Nov  9 18:39:24 CST 2022] Your cert key is in  /usr/local/nginx/conf/ssl/abyss.moe/abyss.moe.key 
[Wed Nov  9 18:39:24 CST 2022] The intermediate CA cert is in  /usr/local/nginx/conf/ssl/abyss.moe/ca.cer 
[Wed Nov  9 18:39:24 CST 2022] And the full chain certs is there:  /usr/local/nginx/conf/ssl/abyss.moe/fullchain.cer 
```

需要给`public`目录写入/读取权限，不然无法上传图片等，最后重新载入Nginx

```
sudo chown -R 991:991 public/system
nginx -s reload
```

配置好DNS解析后，访问你配置的域名，应该能看主页
如果出现错误，请确认 docker containers logs，根据web容器的错误排查
一般是你的配置文件有误导致的，修改`.env.production`后，再使用`docker compose up -d`重建


## 其他

上面步骤应该能完成全部配置，这里另外给出一些命令参考

### 创建管理员账号

```
docker compose exec web bash
tootctl accounts create --role Admin --email EMAIL --confirmed USERNAME
```

### 指定管理员

```
docker compose exec web bash
tootctl accounts modify USERNAME --role Admin
```

### 登录、创建数据库
```
docker compose up -d db 
docker compose exec db bash
```

```
psql -U postgres
postgres=# CREATE USER mastodon_user;
CREATE ROLE
postgres=# alter role mastodon_user with password 'password';
ALTER ROLE
postgres=# create database mastodon_db with owner=mastodon_user;
CREATE DATABASE
```
 
### 初始化数据库和表
```
docker compose run --rm web bundle exec rake db:migrate
```

### 参考资料 (Reference)

> ##### MastodonをDockerでsetupする: 
> https://zenn.dev/pluie/articles/20230212-mastodon-setup
> ##### Mastodon Docker Setup: 
> https://gist.github.com/TrillCyborg/84939cd4013ace9960031b803a0590c4