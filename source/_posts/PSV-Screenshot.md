---
title: 使用 TrophyShot 让 PSVita 在获取奖杯时自动截图
date: 2020-10-16 17:19:38
tags: [PSV,PSN]
categories: [Memo]
description: 让手上的PSVita通过插件的方式，像PS5一样，能够在获得奖杯(Trophy)的时候，自动截图并保存。
---

## 闲聊 PSN和奖杯

与`steam`不同的是，PSN获得所有子奖杯后，会自动获得一个白金奖杯(Platinum Trophy)，我觉得这是一个很好的设计，主线剧情通关就是游戏的终点吗，当然不是。比起那些在线游戏，一局又是一次新的开始，我更想要的是一次`有始有终`旅途。制作人(开发组)在设计奖杯(成就)过程中，会涵盖游戏的各个部分的内容。我觉的把白金作为`旅途的终点`实在太合适了。这可能就是我选择PSN的原因之一吧

![](https://ae01.alicdn.com/kf/H71da80a76d314ba991da42a73e960bfe0.jpg)

`PS4`上获得奖杯会自动截图，随着时间的流逝，游戏的内容渐渐在遗忘。翻翻当年的奖杯截图，不难勾起一端一段往事。遗憾的`PSVita`并不会自动截图，但是我们通过`TrophyShot`插件来实现

## 安装和配置

{% github FMudanyali/TrophyShot  %}
Just like in PS4, it takes a screenshot whenever you unlock a trophy.
{% endgithub %}

从release页面下载已经编译好的`suprx`文件

![](https://ae01.alicdn.com/kf/H21f673e364704891a544a95985b924e3Y.jpg)

把下载好的`TrophyShot.suprx`放入`tai`目录下
编辑`tai`目录下的`config.txt`，找到`*main`那行，把插件完整路径写到下面
(如果没有`config.txt`请自己新建一个，下面是个参考)

```text
*main
ur0:tai/TrophyShot.suprx
```

重启后打开任意游戏，获得奖杯会自行截图

![](https://ae01.alicdn.com/kf/Hc6df491f487246e3ab0cb7ffd6f45514G.jpg)

