---
title: 使用 Mailcow 搭建自己的域名邮箱
date: 2022-11-09 00:12:42
tags:
---


## 关于 Mailcow

dockerized - 🐮 + 🐋 = 💕
`Mailcow`是使用Docker部署的邮件服务应用

Github上提供了完整的 Demo, 自行部署前体验一下也是没问题的
Demo Administrator: `admin` / `moohoo`

部署步骤可以参考 Github 上的 Documentation, 由于基于docker, 部署起来也并不复杂

{% github mailcow/mailcow-dockerized,https://demo.mailcow.email/  %}
mailcow: dockerized - 🐮 + 🐋 = 💕
{% endgithub %}


## 事前准备

`Mailcow`还是很吃配置的, 在部署之前, 我们先确认服务器是否符合要求
参考文档：https://docs.mailcow.email/prerequisite/

### Minimum System Resources

首先是服务器硬件,文档给出的推荐内存是`6GB`, 所以推荐在 4G RAM 以上部署
RAM 不够的话只能禁用些组件了,禁用`ClamAV` and `Solr`可以节约使用内存

| Resource    | mailcow: dockerized                         |
|-------------|---------------------------------------------|
| CPU         | 1 GHz                                       |
| RAM         | Minimum 6 GiB + 1 GiB swap (default config) |
| Disk        | 20 GiB (without emails)                     |
| System Type | x86_64                                      |

OpenVZ, Virtuozzo and LXC 虚拟化的VPS是无法部署的

### Supported OS

在主流服务器操作系统上都没问题

✅ Centos 7	
✅ Debian 10, 11	
✅ Ubuntu 18.04, 20.04, 22.04	
⚠️ Alpine 可能有些功能会不兼容

### Firewall & Ports

需要使用的端口有：25|80|110|143|443|465|587|993|995|4190

可以使用下面命令检查, 如果没有输出就是端口处于空闲状态
被占用的话,可以之后改配置文件, 如果已经装了web服务器, 例如`Nginx`, 之后可以反向代理

```
ss -tlpn | grep -E -w '25|80|110|143|443|465|587|993|995|4190'
# or:
netstat -tulpn | grep -E -w '25|80|110|143|443|465|587|993|995|4190'
```

另外有些服务商会封锁 Outbound SMTP (出方向为25端口)的流量
比如`AWS`,`Oracle`,`Azure`,`GCP`,`Vultr`等, 你需要先和服务器运营商联系, 解除限制

检查 Outbound SMTP 是否畅通可以使用`telnet`, 看到`Connected`没问题
需要退出`telnet`请按`CTRL+]`然后输入`quit`

```
$ telnet mx1.qq.com 25

Trying 162.62.116.184...
Connected to mx1.qq.com.
Escape character is '^]'.
220 newxmmxszc3-2.qq.com MX QQ Mail Server.
```

## 配置DNS 信息

在安装前我们先配置DNS, 因为这可能要过一会生效
[官网文档](https://docs.mailcow.email/prerequisite/prerequisite-dns/)也给出了参考配置

${MAILCOW_HOSTNAME}是你的邮件服务器域名, 例如`mail.psray.net`, 最少需要配置4个DNS记录

```
# Name              Type       Value
mail                IN A       1.2.3.4
autodiscover        IN CNAME   mail.example.org. (your ${MAILCOW_HOSTNAME})
autoconfig          IN CNAME   mail.example.org. (your ${MAILCOW_HOSTNAME})
@                   IN MX 10   mail.example.org. (your ${MAILCOW_HOSTNAME})
```

还有域名的`SPF`记录, 注意新增时候请不要选`SPF`类型
```
# Name              Type       Value
@                   IN TXT     v=spf1 mx a -all
```

另外还可以添`DKIM`,`DMARC`,`rDNS`记录, 这里就不配置了

## 安装

### Docker & Docker Compose

首先安装`Docker`和`Docker Compose`, 如果已经安装了可以跳过

```
curl -sSL https://get.docker.com/ | CHANNEL=stable sh
systemctl enable --now docker
```

接着安装`Docker Compose`

```shell
## On Debian/Ubuntu systems:
apt update
apt install docker-compose-plugin

## On Centos 7 systems:
yum update
yum install docker-compose-plugin
```

从`Github`上clone代码, 安装`mailcow`时, 请确认你使用的用户`umask`是`022`

```
$ su
# umask
0022 # <- Verify it is 0022
```

```
cd /opt
git clone https://github.com/mailcow/mailcow-dockerized
cd mailcow-dockerized
```

### 初始化 mailcow
输入 mail servers hostname (FQDN), 例如`mail.psray.net`
设置 Timezone (时区), 例如`Asia/Tokyo`
最后的 Available Branches, 选`1`就行, `nightly branch`是开发版本

```
./generate_config.sh
```

配置 mailcow, 编辑文件`mailcow.conf`, 根据自己的实际情况修改即可
由于我的机器上已经有Web服务器`Nginx`了,所以我把`HTTP_PORT`和`HTTPS_PORT`改了下

```
nano mailcow.conf
```

### 启动 mailcow

如果最后一步报错请根据错误信息排查

```
docker compose pull
docker compose up -d
```

比如我机器上的`exim4`占用了25端口,可以使用`systemctl`禁用它

![](https://i.psray.net/i/2022/11/11/636d44f789e14.png)


用浏览器打开 `https://MAILCOW_HOSTNAME:HTTPS_PORT` (如果你没改配置文件的话, 不用指定额外端口)
你应该能正常看到Web UI才对, 默认的用户名和密码是`admin`,`moohoo`

![](https://i.psray.net/i/2022/11/11/636d44c48efda.png)

默认生成的证书文件在安装目录下的 `data/assets/ssl/`
用已有的替换它或者用acme生成新的证书后, 再重新执行`docker compose up -d`即可
像我打算用`Nginx`反向代理, 上面证书可以不用管了。这边贴出`Nginx`配置文件中比较重要部分

------------

`server_name`记得加上`autoconfig,autodiscover`, `MAILCOW_HOSTNAME`替换成你的邮件服务器域名
记得把`proxy_pass`的端口改成的`mailcow`的`http`端口
[官方文档](https://docs.mailcow.email/post_installation/firststeps-rp/)内还有更多示例和说明, 比如`Apache`,`HAProxy`,`Traefik `,`Caddy`的配置

```
server_name MAILCOW_HOSTNAME autodiscover.* autoconfig.*;
```

```
location / {
    proxy_pass http://127.0.0.1:8080/;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    client_max_body_size 0;
    # The following Proxy Buffers has to be set if you want to use SOGo after the 2022-04 (April 2022) Update
    # Otherwise a Login will fail like this: https://github.com/mailcow/mailcow-dockerized/issues/4537
    proxy_buffer_size 128k;
    proxy_buffers 64 512k;
    proxy_busy_buffers_size 512k;
}
```

接着回到`Web UI`, 配置域名, 在`Configuration`->`Mail Setup`->`Domains`, 添加域名并重启

![](https://i.psray.net/i/2022/11/11/636d4e6fe756e.png)

切换到邮箱选项卡, 添加一个新的邮箱, 比如`admin@psray.net`
`mailcow`使用`SOGo`作为`Webmail UI`, 在右上方菜单, `Apps`->`Webmail`,即可进入`SOGo`

![](https://i.psray.net/i/2022/11/11/636d4e57ab76b.png)


## 默认端口

`mailcow`使用的默认端口如下, 如果需要使用第三方邮件客户端时, `SMTP`和`IMAP`服务器地址都填写`MAILCOW_HOSTNAME`即可
SMTP: `STARTTLS`->`587`, `SSL/TLS`->`465`
IMAP: `STARTTLS`->`143`, `SSL/TLS`->`993` (比起`POP3`, 推荐使用`IMAP`)

| Service             | Protocol | Port   | Container       | Variable                     |
|---------------------|:--------:|--------|-----------------|------------------------------|
| Postfix SMTP        |    TCP   | 25     | postfix-mailcow | ${SMTP_PORT}                 |
| Postfix SMTPS       |    TCP   | 465    | postfix-mailcow | ${SMTPS_PORT}                |
| Postfix Submission  |    TCP   | 587    | postfix-mailcow | ${SUBMISSION_PORT}           |
| Dovecot IMAP        |    TCP   | 143    | dovecot-mailcow | ${IMAP_PORT}                 |
| Dovecot IMAPS       |    TCP   | 993    | dovecot-mailcow | ${IMAPS_PORT}                |
| Dovecot POP3        |    TCP   | 110    | dovecot-mailcow | ${POP_PORT}                  |
| Dovecot POP3S       |    TCP   | 995    | dovecot-mailcow | ${POPS_PORT}                 |
| Dovecot ManageSieve |    TCP   | 4190   | dovecot-mailcow | ${SIEVE_PORT}                |
| HTTP(S)             |    TCP   | 80/443 | nginx-mailcow   | ${HTTP_PORT} / ${HTTPS_PORT} |


## 其他

需要更新 Mailcow 时,运行目录下的更新脚本即可

```
./update.sh
```

卸载

```
docker compose down -v --rmi all --remove-orphans
```

备份或还原数据库, 使用目录下的`helper-scripts`脚本即可

```
helper-scripts/backup_and_restore.sh
```

另外除了`SPF`记录, 还可以创建`DKIM`,`DMARC`的`DNS`记录, 增加你的邮件友好度

```
# Name              Type       Value
dkim._domainkey     IN TXT     "v=DKIM1; k=rsa; t=s; s=email; p=..."

# Name              Type       Value
_dmarc              IN TXT     "v=DMARC1; p=reject; rua=mailto:mailauth-reports@example.org"
```

`SRV`记录(非必须)

```
# Name              Type       Priority Weight Port    Value
_autodiscover._tcp  IN SRV     0        1      443      mail.example.org. (your ${MAILCOW_HOSTNAME})
_caldavs._tcp       IN SRV     0        1      443      mail.example.org. (your ${MAILCOW_HOSTNAME})
_caldavs._tcp       IN TXT                              "path=/SOGo/dav/"
_carddavs._tcp      IN SRV     0        1      443      mail.example.org. (your ${MAILCOW_HOSTNAME})
_carddavs._tcp      IN TXT                              "path=/SOGo/dav/"
_imap._tcp          IN SRV     0        1      143      mail.example.org. (your ${MAILCOW_HOSTNAME})
_imaps._tcp         IN SRV     0        1      993      mail.example.org. (your ${MAILCOW_HOSTNAME})
_pop3._tcp          IN SRV     0        1      110      mail.example.org. (your ${MAILCOW_HOSTNAME})
_pop3s._tcp         IN SRV     0        1      995      mail.example.org. (your ${MAILCOW_HOSTNAME})
_sieve._tcp         IN SRV     0        1      4190     mail.example.org. (your ${MAILCOW_HOSTNAME})
_smtps._tcp         IN SRV     0        1      465      mail.example.org. (your ${MAILCOW_HOSTNAME})
_submission._tcp    IN SRV     0        1      587      mail.example.org. (your ${MAILCOW_HOSTNAME})
```

最后找个`Mail-tester`,`MX Toolbox`之类工具看看配置是否正确, 就可以愉快的使用了