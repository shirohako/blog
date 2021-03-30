---
title: QNAP-TS453D 开箱和简单上手
date: 2021-01-16 20:27:49
tags: [NAS,QNAP]
categories: [Unboxing]
---

## 前言

>[说明]
>如果有免费获取的产品会额外说明，其余均为自费。文章不含任何"恰饭"和"推广"
>这不是一篇技术性评测/教程，只是简单记录了自己的上手体验

这次开箱的是[TS-453D](https://www.qnap.com.cn/zh-cn/product/ts-453d)，一台QNAP(威联通)的`NAS`
目前京东售价`5000`元左右，亚马逊中国大概`4000`元左右(含税和运费)
最便宜应该是去年`Adorama`的`$400`价格，转运回来大概大约3000元左右
当然我也没赶上那次促销，于是咸鱼上收了一台美版

![](https://img1.abyss.moe/2021/01/16/304e93e06fb6e.jpg)


## 开箱

箱子挺大的，不过机器体积比我预期的要小的多

![](https://img1.abyss.moe/2021/01/16/a3257934a8f02.jpg)

包装包含了2根网线、螺丝、电源适配器、纸质说明书

![](https://ae01.alicdn.com/kf/U48711706f29a4a76a54d1e0bda0f7b0dg.jpg)


需要注意的，电源线是Type-B，适用于美/日/台等地区
大陆的插座是Type A/C/I，可能无法直接插。准备个转换器就行了

![](https://img1.abyss.moe/2021/01/16/7b055fa9bb813.jpg)

> 插座比较可以参考[World Power Plugs](https://world-power-plugs.com/)

![](https://img1.abyss.moe/2021/01/16/f7d0a88dc6d54.jpg)

电源开关在机器正面，接上电源后按一下就能开机了

![](https://ae01.alicdn.com/kf/Ucdeb723067d94e9c9fc06a2b9db8d665i.jpg)

## 安装系统和硬盘

机器里没有硬盘，所以也没有预装系统
第一次使用的话，需要安装QTS (QPAP的系统)，需要接下键盘和显示器
背板提供了USB接口和HDMI接口

![](https://img1.abyss.moe/2021/01/17/063b516a7d8f3.jpg)

安装系统至少要插入一块硬盘
所以我们先安装硬盘
这次我准备了4块日立3T硬盘
从淘宝入手，全部都是翻新盘，所以很便宜，单块价格在200元左右

![](https://ae01.alicdn.com/kf/U1537ee2b5e2e4f27a1a9ea50c2b740d4P.jpg)

安装说明书

![](https://img1.abyss.moe/2021/01/17/269edda880831.jpg)

先把正面塑料挡板拿下，左边有个按钮，往下推即可
正面4个硬盘支架，轻轻按一下即可取出

![](https://img1.abyss.moe/2021/01/17/dbfa2999b6fbe.jpg)

这个硬盘支架安装还是非常方便的
先把左右两侧的挡板拆下后，把硬盘放入，再把挡板装上，这样左右就不需要螺丝了！


![](https://img1.abyss.moe/2021/01/17/1501a69b76d75.jpg)

接着把支架下面的螺丝拧好就行

![](https://ae01.alicdn.com/kf/Uc0e7c997e62c46ca978a60e1d5d753b7C.jpg)


这是机器内部的硬盘背板

![](https://img1.abyss.moe/2021/01/17/64ff32868d52a.jpg)

装好硬盘后重新开机~ 会有欢迎界面
我直接选择了`Smart Installation` (快捷安装)

![](https://img1.abyss.moe/2021/01/17/2fd0ad17ac36e.jpg)


(为了方便我把语言设置成了中文)

这个快捷安装可以说是超级简单了
因为你根本不需要填写任何东西，只有下一步和返回可选
不过第一步还是需要记录一下，包含了之后要用的登录密码

![](https://img1.abyss.moe/2021/01/17/0855d368301b1.jpg)

![](https://img1.abyss.moe/2021/01/17/17dd82a61cedb.jpg)


安装过程大概3分钟左右，之后会看到安装成功界面

![](https://img1.abyss.moe/2021/01/17/a7fb9088b9710.jpg)

在PC中用浏览器打开NAS的IP地址就行，会要求登录
默认的用户名是`admin`，密码在安装过程中有告诉你
忘记了密码也没关系，就是机器MAC1的地址

![](https://img1.abyss.moe/2021/01/17/41c4bfdebde85.jpg)


同意隐私政策后，有一些基础引导。跳过后就可以开始使用QTS了

![](https://img1.abyss.moe/2021/01/17/5cc21d9e5e670.jpg)

![](https://img1.abyss.moe/2021/01/17/33e4c35017358.jpg)

## 硬盘分配和共享

语言的话右上角就可以改，为了方便先改成中文了
先把默认密码改了，右上方设置选项

![](https://img1.abyss.moe/2021/01/17/fdb0180705d90.jpg)

桌布(背景图片)也可以顺便改下，让自己看的舒服一些 (id=74851219)

![](https://img1.abyss.moe/2021/01/17/99b7ed3492260.jpg)

首先先打开`存储与快照总管`，这个就是内置管理存储的工具
新建一个存储池

![](https://img1.abyss.moe/2021/01/17/9c03a95846644.jpg)

这个Qiter (自动分层存储) 是为不同类型的驱动器 (SATA/SAS/SSD)设计的
我的4块硬盘都是SATA，所以没启用。直接下一步

![](https://img1.abyss.moe/2021/01/17/a817346905e67.jpg)

选择磁盘，4块都勾选，左下角可以选择RAID类型
这次目的是：搭建一个可以容错的存储池，RAID5、RAID10比较合适
`RAID5`的话需要3块以上的硬盘，可用空间牺牲1块
`RAID10`的话需要4块硬盘，可用空间牺牲一半

这里我就直接选RAID5了

![](https://img1.abyss.moe/2021/01/17/b857e98a4d7a6.jpg)

选择磁盘的时候可以勾选`创建 SED 安全存储池`
关于那个SED(自动加密硬盘)的介绍
有意思还配了张图来说明

![](https://img1.abyss.moe/2021/01/17/71fdab7caf287.jpg)

配置页面，没什么要选的

![](https://img1.abyss.moe/2021/01/17/036fbe9f54c3c.jpg)

最后一步是总结，点击创建就可以开始了

![](https://img1.abyss.moe/2021/01/17/50b2a04eaf851.jpg)

等待30秒左右就好了~

![](https://img1.abyss.moe/2021/01/17/da83ad2bf9730.jpg)

然后要在`存储池`(Storage Pool)中创建新的`卷`(Volume)

![](https://img1.abyss.moe/2021/01/17/070cfac3483b3.jpg)

有3种类型可选，具体区别3张图有各自的描述，QNAP官网也有说明
这里我选择了精简卷，也就是说`不预分配空间`、`没有快照功能`

>[What is the difference between Static Volume, Thin Volume, and Thick Volume?](https://www.qnap.com.cn/zh-cn/how-to/knowledge-base/article/what-is-the-difference-between-static-volume-thin-volume-and-thick-volume)


静态卷 (Static Volume) 的描述
![](https://img1.abyss.moe/2021/01/17/a4b22beb7bf37.jpg)

厚卷 (Thick Volume) 的描述
![](https://img1.abyss.moe/2021/01/17/d124c62a6c631.jpg)

精简卷 (Thin Volume) 的描述
![](https://img1.abyss.moe/2021/01/17/0ce6a9f07188c.jpg)

下一步是分配空间，填写下容量，其他默认就好

![](https://img1.abyss.moe/2021/01/17/0ce6a9f07188c.jpg)

最后一步是总结，确定即可

![](https://img1.abyss.moe/2021/01/17/0ce6a9f07188c.jpg)

大约1分钟就可以完成，之后后台会自动开始优化这个新卷

![](https://img1.abyss.moe/2021/01/17/44b32cdc27856.jpg)

打开QTS的`File Station 文件总管`，可以看到刚刚新建的`DataVol1`
默认建立了`Public`和`Web`两个共享文件夹，不可以删除

![](https://img1.abyss.moe/2021/01/17/0e6e80c517e9f.jpg)

我们来尝试访问下，QTS默认已经打开了微软和苹果的文件共享协议
找一台局域网里的`Windows设备`，打开`Windows 资源管理器`，访问 `\\192.168.50.111` (要替换成你NAS的IP)
会要求你输入用户名和密码，成功后就可以像本地硬盘一样操作了~

![](https://img1.abyss.moe/2021/01/17/5a0f39570a73d.jpg)

在`File Station`可以新建一个共享文件夹
并可以定制访问权限，和其他的一些高级设置
嘛起个名字就行了，其他的默认就好了~

![](https://img1.abyss.moe/2021/01/17/d9052172569b3.jpg)

访问权限的设定
![](https://img1.abyss.moe/2021/01/17/cbe8cd9087387.jpg)

其他高级设定
![](https://img1.abyss.moe/2021/01/17/d7013a1a3959b.jpg)

回到另一台电脑的`Windows 资源管理器`，刷新就有了
右键可以`映射网络驱动器`

![](https://img1.abyss.moe/2021/01/17/80f468ec7a74e.jpg)

分配个盘符，确定即可

![](https://img1.abyss.moe/2021/01/17/0cad8a4e33879.jpg)

然后在`我的电脑`里就能看见啦

![](https://img1.abyss.moe/2021/01/17/2f6f55371e13b.jpg)


MacOS也差不多，打开你的`Finder` (访达)，在网络中应该能发现NAS设备

![](https://img1.abyss.moe/2021/01/17/cd319d3b43705.jpg)

双击连接，需要进行认证

![](https://img1.abyss.moe/2021/01/17/103a1215dd883.jpg)

没出意外的话，就可以访问啦

![](https://img1.abyss.moe/2021/01/17/e5314caad0f65.jpg)

## QTS系统简单体验

上面的操作完成后，已经可以对NAS的硬盘进行上 `存储/读取` 了
接着看下这个威联通系统的全貌

零距离噪音大概50分贝左右，还挺大的
![](https://img1.abyss.moe/2021/01/17/287d1ff71f2cd.jpg)

内置的`控制台`

![](https://img1.abyss.moe/2021/01/17/4dada80060ee5.jpg)

常规设置里，可以更改设备名称，默认web端口号，时区和时间同步，也可以对登录画面定制
区域里可选`中国`呵`全球`，众所周知大陆在火星
选大陆会对系统和应用进行本地化（比如更新系统会快一点

![](https://img1.abyss.moe/2021/01/17/dffd1946cd650.jpg)

安全页面可以设置允许访问的ip等

![](https://img1.abyss.moe/2021/01/17/ab158cd4b600b.jpg)

硬件设置页面

![](https://img1.abyss.moe/2021/01/17/4530a9cd8ce15.jpg)

整个控制台可以更改的设置还是挺多的，其他的就不每个截图给大家看了
`网络&文件服务`里可以让对应平台设备发现这台NAS

![](https://img1.abyss.moe/2021/01/17/c33023146ace8.jpg)

应用服务里都是些高级应用，可以把NAS作为数据库、或web服务器等

![](https://img1.abyss.moe/2021/01/17/c4501425185f3.jpg)

`网络与虚拟交换机`可以确认网卡和网络配置

![](https://img1.abyss.moe/2021/01/17/956b09c134edd.jpg)

iSCSI与光纤通道

![](https://img1.abyss.moe/2021/01/17/68e33bc56d05d.jpg)

值得关注的是这个`APP Center` (应用中心)
里面有很多企业应用和第三方应用可以让你的NAS实现各种用途

比如建立虚拟机、作为下载机、HTPC
也可以装上php、nodejs、python、ruby等，执行应用或建站

![](https://img1.abyss.moe/2021/01/17/458da7ed37bfc.jpg)

这个`Container Station`，整合了Docker

![](https://img1.abyss.moe/2021/01/17/bc2c30b777480.jpg)

比如装个iperf3的容器、就能跑测速啦
很可惜目前还没有万兆交换机，这个2.5G网络接口，我还没有设备能用上

![](https://img1.abyss.moe/2021/01/17/724278266f5b3.jpg)

![](https://img1.abyss.moe/2021/01/17/7504cf60b921b.jpg)

嘛NAS其实就是一台定制化的电脑，怎么折腾还是由你决定