---
title: 为 PVE 安装 RTL8125B 2.5G网卡驱动
date: 2021-10-16 11:29:16
tags:
---

## Prologue

年末对自己`分流设备`做了一次配置升级
`CPU`把原先的`AMD Ryzen 3 2200G`,更换为了`ADM R5 5600G`
主板从`B450M-A`换成了`MSI MAG B550M MORTAR WIFI`

![](https://ae01.alicdn.com/kf/H9f3740a02b1f4b408b67df3e7c1cdae7r.jpg)


`B550M`这块主板自带了`2.5G LAN`口,正好配合我的交换机和NAS使用
宿主机器系统换成了`PVE`,Linux kernels 5.4+的已自带`R8169`驱动,支持`Realtek 8169/8168/8101/8125`
这里记录下之前装驱动的瞎折腾过程

## Get Ethernet Driver

在MSI官网找下这块板子的参数,使用的是 `Realtek® RTL8125B 2.5G LAN`
https://us.msi.com/Motherboard/MAG-B550M-MORTAR-WIFI/Specification


到 Realtek®官网找到即可linux驱动即可下载
选择`2.5G Ethernet LINUX driver r8125 for kernel up to 5.6`并下载
https://www.realtek.com/ja/component/zoo/category/network-interface-controllers-10-100-1000m-gigabit-ethernet-pci-express-software

## Install Dependence / Compile

由于官方源还是挺慢的,这里还是换成`清华大学的开源镜像源`
https://mirrors.tuna.tsinghua.edu.cn/help/debian/

Debian 的软件源配置文件是 `/etc/apt/sources.list`
```
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster-updates main contrib non-free

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster-backports main contrib non-free

deb https://mirrors.tuna.tsinghua.edu.cn/debian-security buster/updates main contrib non-free
```

然后添加非商业源,编辑 `/etc/apt/sources.list.d/pve-no-subscription.list`
```
deb https://mirrors.tuna.tsinghua.edu.cn/proxmox/debian bullseye pve-no-subscription
```

删除企业源
```
rm /etc/apt/sources.list.d/pve-enterprise.list
```

更新源,并安装编译必要的依赖
```bash
apt update -y

apt -y install dkms make gcc

### PVE7的话,已经安装了`libc6`和`libelf`,下面就不需要执行了
apt -y install build-essential
apt -y install libelf-dev
```

当然,要编译还需要安装 `Linux Kernel Header`
使用`uname -r`看下内核版本,比如我的是`5.11.22-4-pve`,然后`apt search`找下并安装即可
如果没有搜索到,请按上面步骤添加`pve-no-subscription`

```shell
root@shirobako:~# uname -r
5.11.22-4-pve

root@shirobako:~# apt search 5.11.22-4
Sorting... Done
Full Text Search... Done
pve-headers-5.11.22-4-pve/stable 5.11.22-9 amd64
  The Proxmox PVE Kernel Headers

pve-kernel-5.11.22-4-pve/stable 5.11.22-9 amd64 [upgradable from: 5.11.22-8]
  The Proxmox PVE Kernel Image

root@shirobako:~# apt install pve-headers-5.11.22-4-pve
```

编译安装网卡驱动
```bash
### 把下载好的驱动解压
tar vjxf r8125*

### 运行 autorun.sh
chmod a+x autorun.sh
./autorun.sh
```

## Do Some Tests

测试一下网卡驱动是否成功,`lsmod | grep r8125`有返回就表示驱动打上了
看下网卡状态
```bash
### 安装一些网络工具
root@shirobako: apt -y install net-tools ethtool

### 使用 ifconfig 看下网卡名字,比如我的是enp42s0
### 用 ethtool 看下状态, Speed: 2500Mb/s 就对了
root@shirobako: ethtool enp42s0
Settings for enp42s0:
        Supported ports: [ TP MII ]
        Supported link modes:   10baseT/Half 10baseT/Full 
                                100baseT/Half 100baseT/Full 
                                1000baseT/Full 
                                2500baseT/Full 
        Supported pause frame use: Symmetric Receive-only
        Supports auto-negotiation: Yes
        Supported FEC modes: Not reported
        Advertised link modes:  10baseT/Half 10baseT/Full 
                                100baseT/Half 100baseT/Full 
                                1000baseT/Full 
                                2500baseT/Full 
        Advertised pause frame use: Symmetric Receive-only
        Advertised auto-negotiation: Yes
        Advertised FEC modes: Not reported
        Link partner advertised link modes:  10baseT/Half 10baseT/Full 
                                             100baseT/Half 100baseT/Full 
                                             1000baseT/Full 
                                             2500baseT/Full 
        Link partner advertised pause frame use: Symmetric Receive-only
        Link partner advertised auto-negotiation: Yes
        Link partner advertised FEC modes: Not reported
        Speed: 2500Mb/s
        Duplex: Full
        Port: Twisted Pair
        PHYAD: 0
        Transceiver: internal
        Auto-negotiation: on
        MDI-X: Unknown
        Supports Wake-on: pumbg
        Wake-on: d
        Link detected: yes
```

可以用`iperf3`和另一台主机试一下

```
root@shirobako: iperf3 -c 192.168.50.111
Connecting to host 192.168.50.111, port 5201
[  5] local 192.168.50.150 port 58048 connected to 192.168.50.111 port 5201
[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00   sec   285 MBytes  2.39 Gbits/sec    0    649 KBytes       
[  5]   1.00-2.00   sec   284 MBytes  2.38 Gbits/sec    0    649 KBytes       
[  5]   2.00-3.00   sec   282 MBytes  2.37 Gbits/sec    0    771 KBytes       
[  5]   3.00-4.00   sec   282 MBytes  2.37 Gbits/sec    0    771 KBytes       
[  5]   4.00-5.00   sec   284 MBytes  2.38 Gbits/sec    0    771 KBytes       
[  5]   5.00-6.00   sec   281 MBytes  2.36 Gbits/sec    0    807 KBytes       
[  5]   6.00-7.00   sec   284 MBytes  2.38 Gbits/sec    0    807 KBytes       
[  5]   7.00-8.00   sec   282 MBytes  2.37 Gbits/sec    0    807 KBytes       
[  5]   8.00-9.00   sec   281 MBytes  2.36 Gbits/sec    0    807 KBytes       
[  5]   9.00-10.00  sec   282 MBytes  2.37 Gbits/sec    0    807 KBytes       
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.00  sec  2.76 GBytes  2.37 Gbits/sec    0             sender
[  5]   0.00-10.00  sec  2.76 GBytes  2.37 Gbits/sec                  receiver

iperf Done.
```

看起来一切在正常