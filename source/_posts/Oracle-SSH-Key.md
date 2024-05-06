---
title: Reset Oracle Cloud VM Login SSH Key
date: 2022-11-07 01:51:10
tags: [Oracle]
categories: [Memo]
description: Oracle OCI在忘记SSH秘钥或密码的时候，通过挂载硬盘的方式，重新上传公钥并恢复登录的一次笔记。
---

之前由于 Oracle 的 ARM 机器实在是太难开了，使用了个脚本配合 Oracle API 来创建新机器
大概过了半年我才想起这事情，今天登录账号看一下确实开出了一台24G内存的ARM机器
但是由于换了PC，我把之前的登录key弄丢了，这里记录一下重置的方法

需要把丢了秘钥的机器的引导硬盘分离，挂载到另一台机器上，所以你需要2台机器
需要改秘钥的`机器A`，临时用于挂载硬盘的`机器B`


先在机器的管理面板把`机器A`停止运行，在资源菜单，选择引导卷，把引导卷分离

![](https://i.psray.net/i/2022/11/07/6367ef16baabe.png)

在机器B，资源菜单中，附加的块存储卷，把刚刚分离的机器A的启动卷挂在上
选好要附加的硬盘，其他保持默认即可

![](https://i.psray.net/i/2022/11/07/6367efcc23097.png)

附加成功后，点击`iSCSI 命令和信息`

![](https://i.psray.net/i/2022/11/07/6367f1094f28e.png)

复制连接的命令信息

![](https://i.psray.net/i/2022/11/07/6367eff2b40c6.png)

在控台挂载后，还需要SSH连接到机器B，运行这些连接命令

![](https://i.psray.net/i/2022/11/07/6367f03120841.png)


使用`fdisk`看下挂载的信息，第二块硬盘应该是`sdb`

```
fdisk -l /dev/sdb
```

![](https://i.psray.net/i/2022/11/07/6367f06496094.png)

使用mount命令挂载 (请根据实际情况修改要挂载的分区`sdb1`)

```
sudo mount /dev/sdb1 /mnt
```

挂载好后就可以修改公钥了(请根据实际情况修改用户名`opc`)

```
sudo vi /mnt/home/opc/.ssh/authorized_keys
```

接触挂载，并运行iSCSI的断开连接的命令
```
umount /mnt
```

![](https://i.psray.net/i/2022/11/07/6367f09d1b127.png)

最后按之前的步骤反向操作。分离附加的块存储卷，将引导挂载回去即可
