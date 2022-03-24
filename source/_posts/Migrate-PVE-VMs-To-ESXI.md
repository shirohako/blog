---
title: 从 Proxmox VE 迁移到 ESXI/VMware Workstation
date: 2022-03-21 19:24:52
tags:
---


## 投奔 ESXI

用了超过4个月PVE 7,还是遇到了诸多问题
一个是PVE毫无规则自动重启,日志上也没有留下什么线索.并且这个故障在两个月后莫名其妙好了..
另一个是有台Windows虚拟机自动断网,只有在控制台重启才能恢复,不定时发生.尚未解决

这次也是准备花点时间,把虚拟机迁移到其他平台


## 使用 qemu-img 转换虚拟机硬盘文件

迁移前还是要备份下虚拟机,PVE内置的备份可以生成 VMA文件 (Proxmox Virtual Machine Archive)
备份在目录`/var/lib/vz/images`下,PVE的web端并没有提供下载,可以ssh进入PVE进行导出操作
备份后的文件,可以通过vma命令转换成raw.如果你备份时候选择了压缩,请先使用`zstd`解压


使用ssh连接到PVE上

```
usage: vma command [command options]

vma list <filename>
vma config <filename> [-c config]
vma create <filename> [-c config] pathname ...
vma extract <filename> [-r <fifo>] <targetdir>
vma verify <filename> [-v]


root@shirobako:vma extract vzdump-qemu-100-2022_03_21-14_00_20.vma extract
```

转换后,你可以得到一个`raw`后缀的磁盘文件.接下来要是用`qemu-img`转换

```
qemu-img convert [--object objectdef] [--image-opts] [--target-image-opts] [--target-is-zero] [--bitmaps] [-U] [-C] [-c] [-p] [-q] [-n] [-f fmt] [-t cache] [-T src_cache] [-O output_fmt] [-B backing_file] [-o options] [-l snapshot_param] [-S sparse_size] [-r rate_limit] [-m num_coroutines] [-W] [--salvage] filename [filename2 [...]] output_filename

## 指定文件,原格式,目标格式,路径即可
## qemu-img convert -f <原格式> -O <目标格式> <原文件路径> <目标文件路径> 

root@shirobako:/var/lib/vz/dump# qemu-img convert -f raw -O vmdk disk-drive-sata0.raw vm100-1.vmdk
```

得到vmdk文件后,你可以导入VMware作为虚拟机的虚拟硬盘了

## 将虚拟磁盘导入 ESXI

要导入 VMware Workstation 的话,在选择磁盘的时候
选择现有磁盘,然后选择转换好的vmdk文件

![](https://ae01.alicdn.com/kf/Hafb05480c7ea4d8d869cdd4a39ffec70w.png)

要导入ESXI的话,需要把vmdk文件上传,在数据存储浏览器里,上传vmdk文件

![](https://ae01.alicdn.com/kf/H865edecce31941c2bc13784d0d55dd131.png)



在ESXI中新建虚拟机,前面三步骤正常选择
在详细配置的时候,删除默认的硬盘,在菜单中添加一个新的硬盘

![](https://i0.hdslb.com/bfs/album/9470821003e96989b2f43df94de0cc460ac56d66.png)


这里还要注意下,我在PVE的 SCSI Controller Type里选择是 VirtIO SCSI
但是导入后我无论选择 SCSI控制器还是SATA控制器都启动不了,只能使用IDE控制器

![](https://i0.hdslb.com/bfs/album/fd42e022b91c1d024e337abf39102ed2d7eb75f5.png)

![](https://i0.hdslb.com/bfs/album/38854fb707f785fcdb6000f80458059368853e33.png)


完成创建后启动试试,如果能正常开启虚拟机就没问题了