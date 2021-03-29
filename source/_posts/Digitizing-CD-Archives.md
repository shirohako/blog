---
title: 将实体CD转换成档案、规范的使用EAC/XLD
date: 2021-03-25 17:26:46
categories: [Memo]
description: 一个强迫症的音频抓取软件设置指北
---

## 前言

2021年了，Hi-Res配信都早已流行起来。CD作为音乐载体早就不具有优势
但是收藏价值还是有的，当然每次想听的时候把放入光驱也是挺麻烦的
这里介绍一下将实体CD转换到`Lossless`数字档案的方案


这里只推荐EAC/XLD两个抓轨软件，比较可靠，也被各个音乐分享站点公认
EAC (Exact Audio Copy) (https://www.exactaudiocopy.de/)
XLD (X Lossless Decoder) (https://tmkk.undo.jp/xld/)
两个都是免费软件，`EAC`运行环境是`Windows`，`XLD`则是`Mac OS`

两个软件并不是简单到安装完直接可用，你必须正确的设置你的光驱一些特性
写这篇文章的目的也是做个笔记

## EAC

### 安装

打开EAC官网、选择 Download

![](https://ae01.alicdn.com/kf/U27e3911fd4e74c6b9cb4f5306e18920aC.jpg)

安装过程比较简单，Choose Components 这一步建议全部选择
关于这些 Components 后面会使用到

![](https://ae01.alicdn.com/kf/U0fecfce173c54c49bb135a15276ccb22V.jpg)

>安装好后，请务必先配置下EAC，这样才能`正确地`抓出音频

### 设置

第一次启动可能弹出这个 (metadata provider)
选NO和YES都可以

![](https://ae01.alicdn.com/kf/Uce7250e1b0074afd84c098c74936fb3du.jpg)

第一次启动还会弹出设置向导，我们直接到设置里详细设置
直接Cancel就行

![](https://ae01.alicdn.com/kf/Ud749a20f27ea4ffcb6401a43a02945ff3.jpg)

EAC提供了`简体中文`，你可以到设置里切换，方便你对软件更快速上手
按`F9`打开`EAC选项 (EAC options)`,在`常规 (General)`选项卡最下面可以切换语言

![](https://ae01.alicdn.com/kf/U525e62e261aa4cb8a3130afe9645d7f5b.jpg)


接着我们对一些重要选项进行设置

**EAC选项 -> 抓取 (Extraction)**
`不要勾选` 删除头部及尾部静音块 (Delete leading and trailing slient blocks)
`勾选` 用静音填充丢失的偏移采样 (Fill up missing offset samples with silence)

![](https://ae01.alicdn.com/kf/U37d7e575c4164b4cbd9be5409971494de.jpg)


**EAC选项 -> 常规 (General)**

`务必勾选` 总是使用英语创建日志文件(Create log file always in english language)
`可以勾选` 使用备用 CD播放方法 (Use altemate CD play routines)

![](https://ae01.alicdn.com/kf/U2e629bd46644449bade8f79d46790e9cF.jpg)

**EAC选项 -> 工具**

`勾选` 创建CUE文件时寻找 UPC/ISRC代码(Retrieve UPC / ISRC codes in CUE sheet generation)
`勾选` 创建CUE文件时使用 CD-Text信息(Use CD-Text infomation in CUE sheet generation)
`务必勾选` 抓取完毕后自动生成状态报告(Automatically write status report extraction)
`务必勾选` 增加校验至状态报告(Append checksum to status report)
`不要勾选` 激活新手模式，禁用所有高级特性 (Activate beginner mode, disable all advanced features)

![](https://ae01.alicdn.com/kf/Ucc2b039078964ed59b036fb510f0b89ar.jpg)

**EAC选项 -> 标准化 (Nomalize)**

不需要设置、请不要勾选
没提到的其他选项卡并不重要，默认即可

![](https://ae01.alicdn.com/kf/U8f359ddf9c054cc496c5e18f4c84044bV.jpg)

**驱动器选项 (Drive Options)**

按F10可以打开驱动器选项，接下来的设置比较`重要`


***驱动器选项 -> 抓取模式 (Extration Method)***

抓取模式**务必**选择"安全模式" (Secure mode)
>关于[精准流] 、 [缓存音频数据] 、 [C2错误报告能力]  
>**此部分争议比较大，先说结论**
>`精准流`，请点击左边的`检测读取特性`按钮，不同型号光驱不同，**光驱支持即可勾选**
>`缓存音频数据`无论你光驱是否支持，请**勾选**它
>`C2错误报告能力`无论你的光驱是否支持，请**不要勾选**它

![](https://ae01.alicdn.com/kf/Uc7e1a4ead01042b598eb98eb5804ab634.jpg)


**精准流**
>光驱支持的话，可以不必进行 jetter 纠错、根据光驱设置就行

![](https://ae01.alicdn.com/kf/Ua8b1eed78fc347f89376d514d7a4b2a9w.jpg)

![](https://ae01.alicdn.com/kf/U82eb6329a8df4e6486e6aae3c9751e65K.jpg)

**缓存音频数据**
>EAC会多次读取每个扇区，结果一致才会读下一个
>如果光驱有缓存的话、读取缓存会造成结果一定相同
>所以必须勾上这个，勾上后表现为禁用缓存
>即使光驱不支持缓存，勾上理应不会产生问题


![](https://ae01.alicdn.com/kf/U07e84c9418e1454a8aecbca192df92a0F.jpg)


**C2错误报告能力**
>即使光驱支持，也不建议勾选
>(普遍说法是部分光驱C2纠错固件有BUG)

![](https://ae01.alicdn.com/kf/Uf30eeb85fc664d9f97359ba04080fbc9v.jpg)

如果中途让你把特性提交，点是即可

![](https://ae01.alicdn.com/kf/U5b221b718d4f49ce8ee1adb1723b7318c.jpg)


**驱动器选项 -> 驱动器**

`勾选` 抓取之前先转动驱动器 (Spin up drive before extraction)
`勾选` 驱动器支持 CD-Text 读取 (CD-Text Read Capable driver)

![](https://ae01.alicdn.com/kf/U5cbe8a37a8e04610880e6dd0f4a313faT.jpg)

**驱动器选项 -> 偏移 / 速度 (Offset / Speed)**

>请**务必正确设置**使用读取采样偏移矫正的值
>设置方法有3种，推荐第2种

1.手动查询 AccurateRip 数据库 并设置

每个型号光驱都不同，可以参考[AccurateRip 数据库](http://www.accuraterip.com/driveoffsets.htm)
Ctrl+F 搜索你的光驱型号机型，比如我的`hp BD CMB UJ160`是+103

![](https://ae01.alicdn.com/kf/Ue8821cbc77ec4124af980813b3ace0b43.jpg)

2.让EAC自动设置

当然EAC已经支持从`AccurateRip`自动获取`采样偏移矫正值` (Use read sample offset correction) 了
勾上`在驱动器上使用 AccurateRip 数据库` (Use AccurateRip with this drive) 即可，上面的设定会变成灰色并锁定
**推荐勾上这个**

![](https://ae01.alicdn.com/kf/U1dc3137a380a4830866ac03f58e9765fe.jpg)

3.通过CD来计算出

当然你也可以插入一张CD，然后点`检测读取采样偏移矫正`按钮
前提是这张CD数据库里有，当然这种还是**比较麻烦**的
(当然我试了几张手上的CD，CD偏移数据库都没有...)

>至于`检测特性时请不要装入盘片!`(Do not produce load while detecting features !)这个是错误的翻译
>大意为`不要在EAC检测的时候再用其他软件读取光盘`

![](https://ae01.alicdn.com/kf/U4765b7b3a05f426da888d33c4f9ebf74s.jpg)

**驱动器选项 -> 间隙检测**
`间隙/索引寻获方式` (Gap / Index retrieval method)：【A执行最快、B兼容性佳、C较慢】
`检测精确度` ( Detection accuracy)：请设置到`安全` (Secure)

![](https://ae01.alicdn.com/kf/Uebaf9e964f3b4343a8d4f92d5fecfc95Z.jpg)

**元数据选项 -> FreeDB**

请在freedb填写下邮箱

![](https://ae01.alicdn.com/kf/Ua36348dff8a847ffa2fbc274216157a7X.jpg)

如果只抓取`无压缩`的`WAV波形`档案，压缩选项可以忽略

### 补全CD信息

插入一张CD后，CD的信息都没有补全，可能是这样的(没有曲目标题、作者信息等)

![](https://ae01.alicdn.com/kf/U25c7b34bf137456286c4111d61f2c9f0R.jpg)

我们可以从公开的CD数据库获取信息(标题/作曲家等)
可选FreeDB、CUETools DB、MusicBrainz等，这些都是国外知名的免费CD数据库

![](https://ae01.alicdn.com/kf/Uc0e281a8d0f24914994919e3c36a7acaB.jpg)

以CUETools DB为例

![](https://ae01.alicdn.com/kf/U6a0eb8688dc34305bfdb1e28c8780f31v.jpg)


如果找到了，选择一个即可。点击OK，信息就会被自动填充了

![](https://ae01.alicdn.com/kf/U8d38293cfd924aecaa88a435fca52d363.jpg)


### 抓取单文件 wav+cue+log

抓取wav整轨的话、在菜单中选择`抓取镜像并创建CUE目录文件`
完成后连同log文件，应该有3个
分别是 `wav audio`、`cue sheet`、`log file`
其中logfile请不要做改动、cue文件如果是GBK编码、可以转换成`UFT-8 with BOM`


![](https://ae01.alicdn.com/kf/U702fe1f5b02642e0ae723e76b17078d5K.jpg)


### 分割成多个音轨 / 抓取分割好的文件

如果你想创建分割的音频文件，可以抓好整轨后、用工具读取 cue sheet 然后切割就可以
推荐GUI工具：`CUETools`、`Foobar2000`

我不建议切割成`wav分轨`,wav对tag支持不太好。flac也是无损压缩编码，并且设备兼容性较好
同样不推荐有损压缩格式和不开源的无损压缩格式(`ape`/`tta`等)

当然也可以在EAC一步搞定
在这之前、需要先设置一下`EAC压缩选项`

***压缩选项 -> 外部压缩程序***

在附加的命令行选项填入内容

![](https://ae01.alicdn.com/kf/Ua6b3bfc60983465e9c16f81696ea9730f.jpg)

填这些参数的意义无非是：转换成FLAC时，把标题、作曲者封面等写入flac文件的tag内。参数可以自行更改
参数具体意义可以参考 flac documentation (https://xiph.org/flac/documentation_tools_flac.html)

这里给出几个举例

***整轨用***

```
-8 -V -T "ALBUM=%albumtitle%" -T "DATE=%year%" -T "TRACKNUMBER=%tracknr%" -T "GENRE=%genre%" -T "PERFORMER=%albuminterpret%" -T "COMPOSER=%composer%" %haslyrics%--tag-from-file=LYRICS="%lyricsfile%"%haslyrics% -T "ALBUMARTIST=%albumartist%" -T "DISCNUMBER=%cdnumber%" -T "TOTALDISCS=%totalcds%" -T "TOTALTRACKS=%numtracks%" -T "COMMENT=%comment%" %hascover%--picture=||||"%coverfile%"%hascover% --cuesheet="%artist% - %albumtitle%.cue" %source% -o %dest%
```

***多音轨用***

```
-8 -V -T "ARTIST=%artist%" -T "TITLE=%title%" -T "ALBUM=%albumtitle%" -T "DATE=%year%" -T "TRACKNUMBER=%tracknr%" -T "GENRE=%genre%" -T "PERFORMER=%albuminterpret%" -T "COMPOSER=%composer%" %haslyrics%--tag-from-file=LYRICS="%lyricsfile%"%haslyrics% -T "ALBUMARTIST=%albumartist%" -T "DISCNUMBER=%cdnumber%" -T "TOTALDISCS=%totalcds%" -T "TOTALTRACKS=%numtracks%" -T "COMMENT=%comment%" -T "DISCID=%cddbid%" %hascover%--picture=||||"%coverfile%"%hascover% %source% -o %dest%
```

设置好后可以尝试抓取，要抓取flac分割的成品、选择`抓取所选范围音轨`->`已压缩`

![](https://ae01.alicdn.com/kf/U5170b7e009604403821934a719a9cda1c.jpg)

![](https://ae01.alicdn.com/kf/Ue4f2ac80a78449e6ba7720ad619bdfe2S.jpg)

成品大概是这样的

![](https://ae01.alicdn.com/kf/U621b3a3b1f9f44249d6308686e600ce23.jpg)

### 一份较好log示范与校验

抓轨log自动保存，请不要改动删除它
它是你正确使用EAC的最好证据

```text
Exact Audio Copy V1.6 from 23. October 2020

EAC extraction logfile from 7. March 2021, 19:48

凋叶棕 / 宴

Used drive  : hp      BD CMB UJ160   Adapter: 1  ID: 0

Read mode               : Secure
Utilize accurate stream : Yes
Defeat audio cache      : Yes
Make use of C2 pointers : No

Read offset correction                      : 103
Overread into Lead-In and Lead-Out          : No
Fill up missing offset samples with silence : Yes
Delete leading and trailing silent blocks   : No
Null samples used in CRC calculations       : Yes
Used interface                              : Native Win32 interface for Win NT & 2000

Used output format : Internal WAV Routines
Sample format      : 44.100 Hz; 16 Bit; Stereo


TOC of the extracted CD

     Track |   Start  |  Length  | Start sector | End sector 
    ---------------------------------------------------------
        1  |  0:00.00 |  5:42.03 |         0    |    25652   
        2  |  5:42.03 |  6:14.03 |     25653    |    53705   
        3  | 11:56.06 |  5:16.03 |     53706    |    77408   
        4  | 17:12.09 |  5:43.05 |     77409    |   103138   
        5  | 22:55.14 |  4:31.45 |    103139    |   123508   
        6  | 27:26.59 |  4:12.03 |    123509    |   142411   
        7  | 31:38.62 |  4:30.59 |    142412    |   162720   
        8  | 36:09.46 |  5:50.03 |    162721    |   188973   
        9  | 41:59.49 |  4:48.03 |    188974    |   210576   
       10  | 46:47.52 |  5:24.03 |    210577    |   234879   
       11  | 52:11.55 |  3:13.48 |    234880    |   249402   


Range status and errors

Selected range

     Filename F:\CDRip\凋叶棕\宴\RDWL-0001.wav

     Peak level 100.0 %
     Extraction speed 4.2 X
     Range quality 100.0 %
     Copy CRC 8AD7EDF2
     Copy OK

No errors occurred

 
AccurateRip summary
 
Track  1  accurately ripped (confidence 2)  [DD636071]  (AR v2)
Track  2  accurately ripped (confidence 2)  [0C6FA8B9]  (AR v2)
Track  3  accurately ripped (confidence 2)  [ECFE2AF4]  (AR v2)
Track  4  accurately ripped (confidence 2)  [E6F0835D]  (AR v2)
Track  5  accurately ripped (confidence 2)  [A063BF27]  (AR v2)
Track  6  accurately ripped (confidence 2)  [C0EF54E0]  (AR v2)
Track  7  accurately ripped (confidence 2)  [E88F4926]  (AR v2)
Track  8  accurately ripped (confidence 2)  [7AB8EDB3]  (AR v2)
Track  9  accurately ripped (confidence 2)  [898E5AD5]  (AR v2)
Track 10  accurately ripped (confidence 2)  [2B7BF79A]  (AR v2)
Track 11  accurately ripped (confidence 2)  [5A4B14B7]  (AR v2)
 
All tracks accurately ripped

End of status report

---- CUETools DB Plugin V2.1.6

[CTDB TOCID: HBFiB3CptZA6LyLN9Kn1aRh7H.Y-] found
Submit result: HBFiB3CptZA6LyLN9Kn1aRh7H.Y- has been confirmed
Track | CTDB Status
  1   | (65/65) Accurately ripped
  2   | (65/65) Accurately ripped
  3   | (64/65) Accurately ripped
  4   | (64/65) Accurately ripped
  5   | (65/65) Accurately ripped
  6   | (65/65) Accurately ripped
  7   | (65/65) Accurately ripped
  8   | (64/65) Accurately ripped
  9   | (64/65) Accurately ripped
 10   | (64/65) Accurately ripped
 11   | (61/65) Accurately ripped


==== Log checksum C9294F4F0FBEB55D2A34159AC6C2EC5832937D1CB717F83CAC1B25BAF1F0D5A1 ====
```

### 校验log

EAC提供的校验程式在安装目录下，要想校验log必须用到它

按住shift右键，打开任意一个命令行

![](https://ae01.alicdn.com/kf/U88cab106c88646d494293434ba6306c0c.jpg)

后面跟上log文件路径即可校验

>log完好： 1. Log entry is fine!
>log被修改过： 1. Log entry was modified, checksum incorrect!
>log校验码不存在： 1. Log entry has no checksum!


![](https://ae01.alicdn.com/kf/Uf8c80fb6ca7242e192becb111d161bbfv.jpg)

### 将LOG检验程式关联到上下文菜单

### 检测音频文件CRC

校验每次要打开终端比较麻烦，这里介绍一个技巧，可以直接关联到上下文菜单

**效果如下**

![](https://ae01.alicdn.com/kf/U80c6f6e152ae47ab9d00f45cd88df20eQ.jpg)

![](https://ae01.alicdn.com/kf/Ucfc7286613584c1fbb93506a93b35cc2r.jpg)


**实现方法**

直接改注册表比较麻烦，这里推荐一个GUI工具
>BluePointLilac / ContextMenuManager
>https://github.com/BluePointLilac/ContextMenuManager

![](https://ae01.alicdn.com/kf/U6a68f5a20e4f44bbbe9fe75b2c1ef5c3A.jpg)

选择文件类型、自选格式、筛选扩展名:"log"

![](https://ae01.alicdn.com/kf/Uf74450e30f244cae80c2ca946cf4cf95h.jpg)

新建一个项目，菜单类型选择shell

![](https://ae01.alicdn.com/kf/U0bb81491cee8409ea8faacf5d4e6a5bdk.jpg)

菜单文本：`Check This Log File`
菜单参数：`cmd`
命令参数：`"cmd" "/k ""E:\Program Files\Exact Audio Copy\CheckLog.exe" "%1"""`

好了后可以测试下，只有特定后缀名才会有效果

![](https://ae01.alicdn.com/kf/U95d9d57fcd1d4c8c956395b606db4738D.jpg)

**原理**

有兴趣的话可以打开`regedit`看下，原理并不复杂

![](https://ae01.alicdn.com/kf/Ufeaa32a85fe14b0eaa467078433945c6d.jpg)

## XLD

>官网：https://tmkk.undo.jp/xld/index_e.html

找到`Download`，获取编译好的`xld-xxxxxx.dmg`
下面还有个`Log checker plugin`，请一同下载

![](https://ae01.alicdn.com/kf/U67d1bdeaeb344b718ead10f0f36ec2dfD.jpg)

打开`dmg`文件，将XLD拖到桌面或应用程序，即可完成安装

如果无法打开，在`系统设置偏好`->`安全与隐私`->`仍要打开`即可

![](https://ae01.alicdn.com/kf/U39b70ae36671458db202fb3ef187967bT.jpg)

![](https://ae01.alicdn.com/kf/U168e8c4441f14876ab220dc45d35fd167.jpg)

启动XLD，按【`⌘ ,`】（Command + ,）
打开设置页面

**通用**

导出格式可选音频编码/封装格式，建议选择`FLAC`
`Cuesheet 的字符编码`请选择：`Unicode (UTF-8)`
`存储 Cue Sheet 时前置BOM` 请勾上

![](https://ae01.alicdn.com/kf/U0c4ec2e05cc84e7b9d4ca557c1170ccen.jpg)

**抓取 CD**

Ripper Mode (抓取模式)：`XLD Secure Ripper`

读取样本偏离修正值如果是0的话，请对照 [AccurateRip 数据库](http://www.accuraterip.com/driveoffsets.htm) 设置一下
这边勾选了自动设置，XLD已经帮我设置好了(103)
每个光驱都不同欧诺个，你的不一定是103！

`Save Log File`: 总是
`Save Cue Sheet`: 仅单一文件时

`验证可疑选区`：请打勾

![](https://ae01.alicdn.com/kf/U7d356e3f37754cc58c5a9e661ca5416e0.jpg)

**安装 Log checker plugin**

从官网下载插件，得到一个zip压缩包
解压后得到`XLDLogChecker.bundle`

把这个文件移动到`~/Library/Application Support/XLD/PlugIns`
提示一下，这个目录是在`Finder`中隐藏的，你可以在设置显示或使用`Terminal`移动

Library (资源库) 显示方法：

![](https://ae01.alicdn.com/kf/U1045b4960859436ba33f8134c482386eZ.jpg)

![](https://ae01.alicdn.com/kf/U4230ce5757ea4e2c9fcd7c66adf679beR.jpg)

放入重启XLD即可生效，不需要额外设置

![](https://ae01.alicdn.com/kf/U778af5a9b8ce4efd9f2122bc0db4b068N.jpg)

**抓取光盘**

【`⌘ + ⇧ + O `】（Command + Shift + O） 或者在 顶部菜单选择`打开音乐CD`

![](https://ae01.alicdn.com/kf/U307d40496d434905acdfbd087b2d60bbj.jpg)

检查好后，点击右上角的`Get Metadata`，会从数据库获取光盘信息

![](https://ae01.alicdn.com/kf/U7956dcd45614497fa7515990a84e92c2W.jpg)

左上角可以选择`单一文件`(整轨)或分轨导出
我个人推荐`单一文件+cue`，如需分轨之后单独切割也很方便

![](https://ae01.alicdn.com/kf/Ub271ef50845543c1bb4a89f7cf684aa5x.jpg)

点击 Extract 就可以开始抓取了
完成后会弹出抓取日志，如果开了自动保存就不用另存为了
如果你正确安装log插件，日志结尾还有校验码

![](https://ae01.alicdn.com/kf/Ud97b9ef48ebb433b88131e77b5056e700.jpg)

**检查log**

从菜单中打开 `Log Checker`

![](https://ae01.alicdn.com/kf/U6eb2911f228d4858b21105693c938d31o.jpg)

把log文件拖到这个窗口即可

正确的Log： OK
没有校验码：Not signed
改动过的：Malformed

![](https://ae01.alicdn.com/kf/U6c8d0e7a48c64394bb352e7714637b73H.jpg)

**示例log**

```text
X Lossless Decoder version 20210101 (153.1)

XLD extraction logfile from 2021-03-29 16:02:59 +0800

交響アクティブNEETs / 東方フィルハーモニー交響楽団１０ 秘

Used drive : hp BD CMB UJ160 (revision 1.00)
Media type : Pressed CD

Ripper mode             : XLD Secure Ripper
Disable audio cache     : OK for the drive with a cache less than 1375KiB
Make use of C2 pointers : NO
Read offset correction  : 103
Max retry count         : 20
Gap status              : Analyzed, Appended

TOC of the extracted CD
     Track |   Start  |  Length  | Start sector | End sector 
    ---------------------------------------------------------
        1  | 00:00:00 | 04:08:52 |         0    |    18651   
        2  | 04:08:52 | 04:21:47 |     18652    |    38273   
        3  | 08:30:24 | 03:43:27 |     38274    |    55025   
        4  | 12:13:51 | 04:42:10 |     55026    |    76185   
        5  | 16:55:61 | 04:26:30 |     76186    |    96165   
        6  | 21:22:16 | 03:46:08 |     96166    |   113123   
        7  | 25:08:24 | 04:20:68 |    113124    |   132691   

AccurateRip Summary (DiscID: 000816c8-003093c9-3f06e907)
    Track 01 : OK (v2, confidence 8/8)
    Track 02 : OK (v2, confidence 8/8)
    Track 03 : OK (v2, confidence 8/8)
    Track 04 : OK (v2, confidence 8/8)
    Track 05 : OK (v2, confidence 8/8)
    Track 06 : OK (v2, confidence 8/8)
    Track 07 : OK (v2, confidence 8/8)
        ->All tracks accurately ripped.

All Tracks
    Filename : /Users/ame/Documents/neets/東方フィルハーモニー交響楽団１０ 秘.flac
    CRC32 hash               : D3A17DF5
    CRC32 hash (skip zero)   : EDCADE1A
    Statistics
        Read error                           : 0
        Jitter error (maybe fixed)           : 0
        Retry sector count                   : 0
        Damaged sector count                 : 0

Track 01
    Pre-gap length : 00:02:00

    CRC32 hash               : D5FC16D2
    CRC32 hash (skip zero)   : 17CC2160
    AccurateRip v1 signature : 1BD13610
    AccurateRip v2 signature : 42F3317A
        ->Accurately ripped (v2, confidence 8/8)
    Statistics
        Read error                           : 0
        Jitter error (maybe fixed)           : 0
        Retry sector count                   : 0
        Damaged sector count                 : 0

Track 02
    Pre-gap length : 00:03:02

    CRC32 hash               : 8629994C
    CRC32 hash (skip zero)   : 2C5DA75E
    AccurateRip v1 signature : 612E1BCC
    AccurateRip v2 signature : E8CC0263
        ->Accurately ripped (v2, confidence 8/8)
    Statistics
        Read error                           : 0
        Jitter error (maybe fixed)           : 0
        Retry sector count                   : 0
        Damaged sector count                 : 0

Track 03
    Pre-gap length : 00:04:51

    CRC32 hash               : 617394BB
    CRC32 hash (skip zero)   : 64C7835F
    AccurateRip v1 signature : A37A7F63
    AccurateRip v2 signature : FE920DBD
        ->Accurately ripped (v2, confidence 8/8)
    Statistics
        Read error                           : 0
        Jitter error (maybe fixed)           : 0
        Retry sector count                   : 0
        Damaged sector count                 : 0

Track 04
    Pre-gap length : 00:05:56

    CRC32 hash               : 764E61E4
    CRC32 hash (skip zero)   : 7EEB84A9
    AccurateRip v1 signature : CD723063
    AccurateRip v2 signature : D733D5D2
        ->Accurately ripped (v2, confidence 8/8)
    Statistics
        Read error                           : 0
        Jitter error (maybe fixed)           : 0
        Retry sector count                   : 0
        Damaged sector count                 : 0

Track 05
    Pre-gap length : 00:03:22

    CRC32 hash               : A2752115
    CRC32 hash (skip zero)   : 1C037DD2
    AccurateRip v1 signature : 9D224B3F
    AccurateRip v2 signature : F6595FA3
        ->Accurately ripped (v2, confidence 8/8)
    Statistics
        Read error                           : 0
        Jitter error (maybe fixed)           : 0
        Retry sector count                   : 0
        Damaged sector count                 : 0

Track 06
    Pre-gap length : 00:02:24

    CRC32 hash               : 37146110
    CRC32 hash (skip zero)   : 56A450AF
    AccurateRip v1 signature : AB54FDCC
    AccurateRip v2 signature : 028326DE
        ->Accurately ripped (v2, confidence 8/8)
    Statistics
        Read error                           : 0
        Jitter error (maybe fixed)           : 0
        Retry sector count                   : 0
        Damaged sector count                 : 0

Track 07
    Pre-gap length : 00:04:20

    CRC32 hash               : 74CACBE2
    CRC32 hash (skip zero)   : 224429C9
    AccurateRip v1 signature : 88CDDA91
    AccurateRip v2 signature : 5DDFCF6A
        ->Accurately ripped (v2, confidence 8/8)
    Statistics
        Read error                           : 0
        Jitter error (maybe fixed)           : 0
        Retry sector count                   : 0
        Damaged sector count                 : 0

No errors occurred

End of status report

-----BEGIN XLD SIGNATURE-----
Q8VOo.s2P7HP1vzBiQ4MhBXDD_8fgpQNDJsLalN_pS8dXJ8Zj2yVgJdAVXck21Py.zDkFzAbkws3vUwd0L5BI.E_6p06pDeVqtx_B9m
-----END XLD SIGNATURE-----

```