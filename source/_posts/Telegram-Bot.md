---
title: 使用 Telegram Bot 为新进入群组的成员提供验证码
date: 2020-10-19 21:55:55
categories: [Memo]
---

## 越来越多的SPAM
群组大了之后管理起来也变的麻烦了，广告和垃圾机器人也越来越多。显然人工处理是个费力也不明智的选择
可以把`Group type`设置为`Private Group`，然后使用群组的邀请链接作为唯一入口。但这样也限制一些功能，比如无法被搜索，历史聊天不会被公开
使用`Telegram bot`来为新成员提供一个随机的问题，来拦截spam也是一个不错的选择，目前很多群组都采用了这种策略，如果不方便改成私有群组的话，这是一个不错过滤方案


## 使用 Telegram Bot

参考[官方](https://core.telegram.org/bots)的介绍

>Bots are third-party applications that run inside Telegram. Users can interact with bots by sending them messages, commands and inline requests. You control your bots using HTTPS requests to our Bot API.

说白了就是一个使用了TG API的第三方程序，首先需要向  BotFather 去创建，然后通过TG官方提供的[API接口](https://core.telegram.org/bots/api)来控制和交互行为
当然对于大多数用户来说，没有必要去自己创建一个bot去运行，因为一个`bot`可以和多个用户或群组(频道)进行交换，你可以使用别人已经创建好的实例，把它添加进自己的群组，就可以了

当然目前开源的机器人很多，功能也很多。文章就以比较简单的`Telegram-CAPTCHA-bot`来说明

{% github Tooruchan/Telegram-CAPTCHA-Bot  %}
A bot running on Telegram which will send CAPTCHA to verify if the new member is a human.
{% endgithub %}

## 引入别人运行的实例来使用

首先将官方提供的机器人[@toorucaptchabot](https://t.me/toorucaptchabot)拉入群组，点击`Add Members`，搜索`@toorucaptchabot`

![](https://img1.abyss.moe/2020/10/19/4ceeb52488739.jpg)

拉进来后，bot会自动在群组里发一条消息，接着你需要给它权限来管理

![](https://img1.abyss.moe/2020/10/19/21d1236459cc7.jpg)

给与管理权限
点击`Manage Group` => `Administrators` => `Add Administrator` 然后选择刚刚添加的机器人
默认的权限就已经够了，记得点`Save`保存

![](https://img1.abyss.moe/2020/10/19/f255b0d3f9934.jpg)

然后拉个新人进来试试，出现验证码就对啦

![](https://img1.abyss.moe/2020/10/19/e5a39765e2047.jpg)


## 创建自己的实例来使用

上面的方案你不需要运行任何程序，也不需要任何服务器
当然你也可以自己运行一个实例，需要准备一台服务器，自己运行源码并配置BOT信息

### 创建 BOT

首先向[@BotFather](https://t.me/botfather)申请创建一个新的`bot`，输入`/newbot`

然后为bot取个`昵称`和`用户名`，用户名必须以`bot`结尾

![](https://img1.abyss.moe/2020/10/19/52e650b13862e.jpg)


创建后你会得到一个像这样的信息，其中包含了 HTTP API，等等用到它

![](https://img1.abyss.moe/2020/10/19/f977b744de7b9.jpg)


### 申请 APP KEY

在 `Obtaining Telegram API ID` [申请](https://core.telegram.org/api/obtaining_api_id) API ID 与 API Hash
填好基本信息后就可以得到它们，ID是一串数字，api hash是一串字符

### 部署在自己服务器上

接着我们下载源码，并运行`Telegram-CAPTCHA-bot`

>下文的运行环境： Ubuntu 18.04.4 LTS

- 先安装`python3-pip`，如果没有`python3`请先安装它，并且需要3.6以上版本

```bash
apt install python3-pip
```

- 通过pip3安装`pyrogram`、`tgcrypto`

```bash
pip3 install -U https://github.com/Tooruchan/Telegram-CAPTCHA-bot/raw/master/pyrogram-asyncio.zip
pip3 install --upgrade tgcrypto configparser
```

- 从`github`下载源码

```bash
cd ~ && git clone https://github.com/Tooruchan/Telegram-CAPTCHA-bot 
cd Telegram-CAPTCHA-bot
```

- 配置`auth.ini`
 - `token`是你在`BotFather`获取的`API Token`，`api_hash` 和 `api_id`是刚刚获取申请的内容
 - `channel`是 Bot 日志记录频道，readme中说不填写无法工作，当然我试了下不填没问题
 - `admin`是管理用户，不填写则/leave和/reload指令无效，这里我没用到这个功能

配置完成后，运行代码试一下

```bash
python3 main.py
```

把`bot`拉入群组，并给与管理员权限，拉个人进来测试下是否正常工作
没问题的话我们使用`systemd`来运行bot，这样就不要开着终端，可以在后台运行了

- 使用`systemd`

项目中有个`example.service`文件，这是一个`service`的实例，稍稍改一下就能用了

- 拷贝一份并编辑它

```bash
cp example.service tg-bot.service
vim tg-bot.service
```


- 第2行`Description`是描述，随写一点东西就行
- 第8行`WorkingDirectory`填写所在目录，比如`/root/Telegram-CAPTCHA-bot`
- 第9行`ExecStart`填写运行命令，比如`/usr/bin/python3 /root/Telegram-CAPTCHA-bot/main.py`

好了后把他移动到`/etc/systemd/system/`并激活它

```bash
mv tg-bot.service /etc/systemd/system/
systemctl enable tg-bot
systemctl start tg-bot
```

这样就好了~

## 其他一些提供入群验证的机器人

当然`Telegram-CAPTCHA-bot`功能还是有限的，这里再介绍2个同样可以实现的`bot`

### Policr Mini

{% github Hentioe/policr-mini  %}
A bot running on Telegram which will send CAPTCHA to verify if the new member is a human.
{% endgithub %}

![](https://ae01.alicdn.com/kf/Ucc06ccff250547c2a676be3ccb2babb8T.jpg)
![](https://ae01.alicdn.com/kf/Ue1aef38db7f44c02aa374dd3f439e4d5V.jpg)


### fengdoorbot

{% github /fengnz/fengdoorbot  %}
A bot running on Telegram which will send CAPTCHA to verify if the new member is a human.
{% endgithub %}

![](https://ae01.alicdn.com/kf/Ubd725428a88a4d18b665736da0db7175P.jpg)
