---
title: QNAP TS-873A 开箱和简单上手
date: 2021-11-07 19:17:17
tags: [NAS,QNAP]
categories: [Unboxing]
description: 面向中高消费级的 QNAP NAS 设备 TS-873A 的开箱，还有简单的上手体验。QTS系统的上手、配置的流程的简单窥探。
---


>1️⃣ 文中涉及到的商品均为自费购买.不含任何推广行为.如果是免费获的,均会在开头说明
>2️⃣ 非技术向开箱记录,可能用词不专业/思考角度不对见谅..


## Intro

本次开箱的是`QNAP TS-873A` 8G,一台威联通`NAS`
作为2021发布的新品,使用了 AMD Ryzen V1500B 作为 CPU.
同价位8盘位的`Synology DS1821+`也是用了这颗U,但是默认4G内存,而且没有2.5G板载网卡.这次还是选择了`威联通`
这次双十一叠加优惠后到手6000CNY左右

![](https://ae01.alicdn.com/kf/H6e58e1c082b34c0b87f8e7c6ebbb6f39P.jpg)

## Unboxing

外包装纸盒

![](https://ae01.alicdn.com/kf/H480fbf1a039f46cf84f712f8c3f03c989.jpg)

这次买的国行版本,箱内有`NAS本体`,`国内电源线`,`RJ45网线`,`保修卡和说明书`,`硬盘螺丝和硬盘槽钥匙`

![](https://ae01.alicdn.com/kf/H0ee0645acc8c4c7d9d181ab3253a10c6B.jpg)

正面硬盘插槽还有锁扣,可以拿配件里的钥匙🔒(我放家里应该是用不到了)
左上方是一些LED指示灯( STATUS, LAN, M2, USB etc..)

![](https://ae01.alicdn.com/kf/H5645afb19e894d01bdce35f6698b52e6x.jpg)

背面2个12cm大风扇用于硬盘散热.左边4cm小风扇是给主板散热

![](https://ae01.alicdn.com/kf/H8b52dab113ae4c19ab21b3f5a5ad355c4.jpg)

如果要安装M2固态硬盘的话,需要把后面3个螺丝拆掉,打开机箱
机箱内部图

![](https://ae01.alicdn.com/kf/H46e5c4cf8dd04615949057c30804f628J.jpg)

右边是一个250W的台达电源

![](https://ae01.alicdn.com/kf/H7d3b0ed700534f6ea51285f385622746G.jpg)

左侧有2个 PCIE 接口,左边其实就是主板了
![](https://ae01.alicdn.com/kf/H3e7c914fa1f14adfbb183b12767c159c0.jpg)

右边是风扇和硬盘背板的插供电的地方,使用了个20pin供电口

![](https://ae01.alicdn.com/kf/Hbdb3513c2bf84e3288d8b1bf161c4be0A.jpg)

左边是主板,常规的24pin供电,有2个M2接口可以扩展(我把吃灰的`Lexar 500G`装上去了
自带一块`Transcend TS1GSH64V6B 8G 2666`内存 (创见,国内好像很少见到这个牌子)

这个M2插槽卡扣设计的很方便,不用在用螺丝固定了

内存我追加了一块吃灰的`协德 8G内存`的上去,官网建议双通道用同样型号的内存,不过我觉得没什么问题
(For dual-DIMM configurations, you must use a pair of identical DDR4 modules.)
(当然后面我测试后有提到,内存并不能随意添加)

![](https://ae01.alicdn.com/kf/H45a43e640d4444c4b9b7a55eff9579c4s.jpg)

![](https://ae01.alicdn.com/kf/H2ecd37b7f5134e2abc8a64b3fecaa204S.jpg)

好了,盖上机箱接上网线和电源,就可以开机了.

## QuTS hero 上手

使用说明书上要求你下载Qfinder Pro或者扫码来找到你的NAS

![](https://ae01.alicdn.com/kf/H66b4106bb9a544388315761a83c65361m.jpg)

呃太麻烦了,还是打开路由器,直接找下这个设备的ip吧

![](https://ae01.alicdn.com/kf/Hbce1d776f48741b58bbbb0b6a1a7b01eH.png)

用浏览器打开对应ip,即可进入安装界面
这里要特别注意一下,可以选择`QTS`和`QuTS hero`两个系统

![](https://ae01.alicdn.com/kf/Ha47f78b9d24c490e8a4ac68baf2c94b8Q.png)

至于`QuTS hero`,它是基于`ZFS` 文件系统的,功能更多,但是内存需求量更大.而`QTS`是基于`Ext4`的

![](https://ae01.alicdn.com/kf/Hc5b017c693504bfd913964effa5b80c3i.png)

如果想对ZFS了解更多,可以直接参考QNAP的说明页面
https://www.qnap.com.cn/quts-hero/zh-cn/
https://view.publitas.com/qnap-1/quts-hero-whitepaper_final_cn/

至于该选择哪个,具体区别可以参考这个表格,差异一目了然
另外也要注意,`QTS`和`QuTS hero`采用不同的文件系统,切换系统的话,NAS必须重新初始化

![](https://ae01.alicdn.com/kf/Hcfacd51ead0f4d88ac9bfda1367e71b0V.png)

那难得入了企业级NAS,当然要试一下ZFS啦
点下面按钮可以进入到QuTS安装,会自动下载固件,当然官网已经有5.0 beta版本了.可以手动上传

![](https://ae01.alicdn.com/kf/H3331088eb6d84587a7255a933f615d4eJ.png)

安装步骤很简单啦,设置下用户名/密码/IP/时间

![](https://ae01.alicdn.com/kf/Hfc86c6a5f1f6451e837744f23e9c8b85Y.png)

![](https://ae01.alicdn.com/kf/H9c4aa77c84804af997018856c4563b10b.png)

![](https://ae01.alicdn.com/kf/H1d324be34b874c9f8daafd90d5567b064.png)

另外可以启用文件分享协议,我建议全勾上

![](https://ae01.alicdn.com/kf/H5e360014368b4031afc2f7a6cbefa311N.png)

等一会后自动重启,安装过程也挺长的.顺便一提QNAP的系统启动时间,真的非常长...

![](https://ae01.alicdn.com/kf/H40bac3d323c647a1a2c00447eb2dc7eai.png)

能看到登录界面就好了,第一次登录后,有一堆用户协议条款要同意

![](https://ae01.alicdn.com/kf/H3840299d62c442aa8ec1a24f10ddeea7N.png)

进入系统后,你需要至少创建一个存储池,才能让系统部分功能和应用正常工作
在`存储与快照总管`里创建(第一次使用会自动弹出并提示你,具体步骤和`QTS`一样的

![](https://ae01.alicdn.com/kf/H805467c317fa42a787c1689e164b69e9y.png)

创建好后,有些应用会自动被安装在上面..系统还会自动建立共享文件夹(Homes/Public)
和`QTS`不同的是,ZFS有压缩/重复数据删除等一些高级功能

![](https://ae01.alicdn.com/kf/H6047fcc6948e4b1f8908ac81a5294661G.png)

![](https://ae01.alicdn.com/kf/H5d0cc2f9afaa45f0a8c3ec4c45fca5271.png)

自带的`App Center`也和`QTS`基本一样

![](https://ae01.alicdn.com/kf/Hd8cf54cc93264faca55c97053e44e427d.png)

多了个ZFS性能分析工具

![](https://ae01.alicdn.com/kf/H08557be3bfee406cac63a147d0bb91bfc.png)

打开控制台看了下,我虽然追加了一根8G的 SO-DIMM 上去,`但是并不可用` (混插闲置的杂牌内存果然不行啊

![](https://ae01.alicdn.com/kf/Hc7ff08b9a1ee4505ad5faa6c74a25aa9h.png)

数据盘我准备了2块18T的`HC550`,这也是我第一次购入企业级硬盘

![](https://ae01.alicdn.com/kf/H2dc6f85e2b42449591a69908d591c40a4.jpg)

![](https://ae01.alicdn.com/kf/Hb6c4561e5cf74d46a3b52b25332d5ad53.jpg)

QNAP的硬盘架左右两边都有卡扣,插下后装上硬盘和卡扣,不用拧螺丝.这个设计很方便我还是挺喜欢的

![](https://ae01.alicdn.com/kf/H283c2a6f655e43cdbdf1af0a4ddd58f0f.jpg)

插上后应该能在`存储管理`里面看到了

![](https://ae01.alicdn.com/kf/Hfebf04f3b1514c9eb362e4c3120babdc1.png)

创建存储空间,ZFS有些不同的设置,比如`压缩`,`重复数据删除`,`快大小`
当然这块目标是分流VCB-S的作品,为了最大利用空间还是选了单块RAID-0
最后创建出来的可用的大概只有15.6T

![](https://ae01.alicdn.com/kf/H7c7f27134aac444f82b83477bcc69d97V.png)

然后在这个存储池上,建立个共享文件夹就能用了
Windows可以磁盘映射,MacOS和Linux用mount挂载.

![](https://ae01.alicdn.com/kf/H2fb9bb8d48de4e7bb2069f426c39c8e5U.png)

![](https://ae01.alicdn.com/kf/He123f3c5e03441e2b4cbb6827993462bX.png)

要使用Docker的话,使用Container Station,就不多提了

![](https://ae01.alicdn.com/kf/Hda3303ad749644169aa1dd91b1cfdd71M.png)

想跑虚拟机的话,在`App Center`安装`Virtualization Station`
创建之前需要强制登录.垃圾威联通...我本来以为去创建一个QNAP帐号就行了
结果用户名和密码怎么输入都不对,可能我注册的区域的问题 *大陆需要验证手机号
整个界面只有一个登录按钮可以交互

![](https://ae01.alicdn.com/kf/Hfd21bd0087f14d4c8051a38e6859b459t.png)


无奈我只能去QNAP官网自己下载离线的`QVS`安装包
https://www.qnap.com/en/app_center/

把原来安装的移除,上传文件手动安装

![](https://ae01.alicdn.com/kf/H4e55440d4565452d8606d7ff41451a76w.png)

这次没有问题..也不需要登录

![](https://ae01.alicdn.com/kf/Ha4c012a5851e4b1cb06a2ee7fc31c93cd.png)

QVS 的总览长这样

![](https://ae01.alicdn.com/kf/Hc303b01bd25b47baa2e65cbb7d7f28338.png)

添加一个虚拟机试试

![](https://ae01.alicdn.com/kf/H2e8135e96924427ab7ce951a57d61afaX.png)

迁移,克隆,快照,直通功能也有.
这是自带的VNC界面,功能该有的都有了

![](https://ae01.alicdn.com/kf/H2072e7b7278f46a096946d681462df0el.png)

上手体验的话就写到这里了,很遗憾我对ZFS不是很了解.这也是我第一次接触这个文件系统
大概好多实用的高级功能我不知道吧..

## 噪音和功耗

功耗方面表现还是很满意的,我插了一块18T硬盘后在24W功耗左右.
全天开机一个月应该不到20度电

![](https://ae01.alicdn.com/kf/Hb6af1faf408d4ea88d3c5bf6aaf3b9175.jpg)

噪音方面表现也不错..0.5m距离大概20dB左右,顺便一提硬盘炒豆子的声音比机器声音大

![](https://ae01.alicdn.com/kf/H59a3afc75e2c4f1aa0ea7e41f37457712.jpg)

## 总结

![](https://ae01.alicdn.com/kf/H0ad84ee643a34fa78c489368175b706dZ.jpg)

结论: 除了追求`稳定`,`可靠`的企业/工作室团体用户以外,`不推荐`入手这台NAS.

另外,基于ZFS文件系统`QuTS hero`,也非常占用内存,更适合追求更高的企业用户.
这是QNAP官方的内存建议.如果你要插满8个硬盘,建议32G内存,这又是一笔不小的开支.
即使内存不足,NAS仍然可靠,但是IO性能会降低.当然你也可以使用`QTS`,这会对配置要求降低许多.

![](https://ae01.alicdn.com/kf/H9d091fa3b5a34caebfd1902566070c00Y.png)

目前我的NAS设备为 2台 (黑)群晖 + 2台 QNAP,其实2个系统体验差距不是很大.
可玩性都很强.容器,虚拟机,异地备份,挂机下载..基本满足很多人需求了.
但终究我还是讨厌All in One,把NAS单独当作存储工具而已

即使是企业级的成品NAS,也不是什么不可及的东西.
拆机后你会发现:集成主板,内存,电源,硬盘仓,风扇,机箱.
NAS也就是凑齐了这些一台 Mini PC 而已.

也许成品NAS大多数人而言,稳定和售后服务可能更加重要.
如果你有能力也爱折腾的话,完全可以用更低廉的价格,租一台更高配置的出来.
这应该我近期最后一台成品NAS了,下次对存储有需求的话,尝试自己组一台吧.