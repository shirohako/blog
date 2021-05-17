---
title: 在 Chromebook 上安装 Windows 10
date: 2021-05-17 03:27:43
categories: [Memo]
description: 一个强迫症的音频抓取软件设置指北
---


## 前言

最近也是受群友~~传教~~影响，对 Arch Linux 产生了一点兴趣
正好也一直想收一台笔电、做应急备用机，整理下我的需求：

- 一块较好屏幕，1080P 以上，高色域
- 1000元以下，价格尽可能的低
- 机器重量低，不能像块砖头一样
- CPU 性能至少能用就行。用于远程桌面，ssh连接等手机上不方便的操作

也是正好看到了李先生的文章：["如何用 1000 元搞一个不错的 Linux 笔记本"](https://plumz.me/archives/12598/)
因为自带的是ChromeOS，而且 Google 被墙了。所以这产品在国内几乎没人知道
查了下国外有大佬做了 Custom UEFI firmware，所以刷个 Windows 或 Linux 都是没问题的
最后决定入手一台 Chromebook 来折腾 Arch Linux


最终选择的型号还是：Dell Chromebook 13 7310
颜值和屏幕都不错，缺点的话没有USB3接口，自带的SSD太小，触控版手感一般，充电需要单独的DC供电
不过价格不错，问了几个卖家都在550元左右包邮
具体参数：

|  Name  |  Results  |
| ---- | ---- |
|  Display  |  270 nits	/ 96 percent sRGB / Delta e = 1.4 |
|  Display Size |  13.30-inch  |
|  Display Resolution |  1920x1080 pixels  |
|  Processor |  Intel Celeron Dual Core 3205U  |
|  Base Clock Speed	 |  1.5 GHz  |
|  RAM |  4 GB  |
|  SSD  |  16GB  |
|  Weight  |  1.469639 kg  |

当然还有高配的版本，不过价格也上去了。这个配置姑且满足了
屏幕素质还是挺满意的，CPU 性能放到今天来用、还是差了点意思
实拍图

![](https://ae01.alicdn.com/kf/H359943483b904851a2c28c9b86b2a28bj.jpg)


至于为什么本文是写的安装 Windows 呢
Chromebook不能直接安装其他系统的，需要刷机。而且 Arch 安装还是相对麻烦的
这边写介绍下如何刷机和制作U盘镜像
至于 Arch 的安装细节，我会单独写篇文章

## 为 ChromeBook 安装 UEFI firmware

### 解锁硬件读写保护

需要拧开后盖，有些机器已经解锁了，买的时候可以先问下卖家
把螺丝去掉之后，轻轻的从屏幕连接处的地方打开后盖即可，无需多大力
拆开后大概是这样

![](https://ae01.alicdn.com/kf/H311d55cf5d5443bc9dfc6d39e4057c7dD.jpg)

找到 WP (Write Protect)，拆下这个螺丝即可，比如我这台 Dell 的他在右上角

![](https://ae01.alicdn.com/kf/H926205a2d3d74f31885220b721c2ae1cn.jpg)

### 启用开发者模式

需要 Enable Developer Mode，开机时按住 Esc + Refresh + Power 
键盘上没有刷新按钮的话，按住 Esc + F3 + Power
过几秒后会进入系统后，会提示： Chrome OS is missing or damaged

![](https://ae01.alicdn.com/kf/Ha8c2a0485a0c462ea7598e9456eb2ff3J.jpg)

按 Crtl + D , 然后按 Enter 以 turn OS verification OFF

![](https://ae01.alicdn.com/kf/H23e1ee08eaee448d8e3cefbfecdf086eM.jpg)

这样系统验证保护就关闭了

![](https://ae01.alicdn.com/kf/H520a81c1ddeb40fb9251e6130a0feb8e8.jpg)

之后每次重启的时候，ChromeOS 都会提示 "OS verification is OFF"
按 Ctrl +D 可以跳过这个画面，第一次进入开发者模式需要很长的时间等待
开发模式准备好后会再次重启，进入 ChromeOS 后，按 Ctrl + Alt + T 打开终端

```
shell 
```

![](https://ae01.alicdn.com/kf/H6cc0348585d54597a46467e7862bb671V.png)

### 进入终端

下载 MrChromebox.tech 的刷机脚本


```shell
##如果你没有科学上网的话，可以使用这个链接代替
##https://storage.abyss.moe/github/MrChromebox/scripts/firmware-util.sh

cd ~
curl -L -O http://mrchromebox.tech/firmware-util.sh
sudo bash firmware-util.sh
```


![](https://i.abyss.moe/images/1c5e5fcaf87b9742014d3f2a121c382c.png)

如果你已经把 `WP (write protect)` 解除，这边的WP应该是绿色的
没解锁的话是红色的

![](https://i.abyss.moe/images/14ad8e8c03a8b31277202c8983b6ca0d.png)

输入2 选择 Install UEFI (Full ROM) Firmware
会提示你会有风险，输入y继续。之后会提示你插入个U盘备份，插入后选1就行了

![](https://i.abyss.moe/images/9eb4b5b205bc66210d19cd49d446dbc8.png)

下载和安装完成后，按 Enter 返回主菜单。按R重启


## 制作 Windows 启动盘

推荐使用 Ventoy ，一个开源的SUB启动盘制作工具

![](https://ae01.alicdn.com/kf/H2deccf50134043f09f546868efba4752x.png)

从 release 下载对应平台编译好的版本

https://github.com/ventoy/Ventoy/releases

插入U盘制作就可以了，之后把ISO直接复制到U盘内就行了，很简单

重启插上U盘，开机时候按ESC可以进入到 Boot Manager
如果进入了 UEFI Shell内，`exit`退出

Boot Menu 可以直接选择从哪个设备启动
Boot Manager 可以更换启动顺序，shift + = 移动，Enter 保存

![](https://ae01.alicdn.com/kf/Hb31ea9f89de444998503eea0bc7cc5edW.jpg)

![](https://ae01.alicdn.com/kf/H0b9518effbd246f897ae432d6b600b76c.jpg)

## 安装 Windows 和 触摸板驱动

改好启动项后应该可以正常进入 Ventoy 了
Windows 安装都是有UI操作的很简单，这里就不再提了
完成后，触控板应该是不能用的
另外ChromeOS的键盘布局也不太方便，比如`DEL`。我们要映射下一些按键

打开 cmd (管理员) 或 PowerShell (管理员)，打开`系统测试模式`

```
bcdedit -set testsigning on
```

设置好网络后用浏览器打开 https://coolstar.org/chromebook/
选择 INSTALL 后，接着选择具体的CPU和型号

![](https://ae01.alicdn.com/kf/Hdbad34e7be124be29ed82d7b25ada651F.png)

安装 `Touchpad Driver` 和 `Keyboard Remap Utility`
点击 Download Link 下载，双击运行即可安装驱动

![](https://ae01.alicdn.com/kf/Hd4e176ddc9e94851979360eb0d8277dc7.png)

具体键盘映射如下

![](https://ae01.alicdn.com/kf/Hddb358e4f4f94949b964f4dd48c890d6N.jpg)

重启一下~ 应该就好了