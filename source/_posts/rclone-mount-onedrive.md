---
title: Ubuntu 使用 rclone 挂载 Onedrive
date: 2026-05-12 03:40:00
tags: [onedrive,rclone]
categories: []
description: 在 Linux 挂载网盘来备份数据的一次实践
---


## 安装 rclone

近期打算用onedrive做服务器的数据库的异地备份，文章记录了一下如何正常配置和挂载onedrive个人版本。
除了需要挂载的服务器，还需要另一台能互动的PC来登录获取token。

```
sudo apt install rclone
```

## 配置

```
$ rclone config
2026/05/12 03:07:56 NOTICE: Config file "/root/.config/rclone/rclone.conf" not found - using defaults
No remotes found, make a new one?
n) New remote
s) Set configuration password
q) Quit config
n/s/q>
```

选择n (remote)

```
Enter name for new remote.
name>
```

输入配置名字，比如onedrive

```
Option Storage.
Type of storage to configure.
Choose a number from below, or type in your own value.
 1 / 1Fichier
   \ (fichier)
 2 / Akamai NetStorage
   \ (netstorage)
 3 / Alias for an existing remote
   \ (alias)
 4 / Amazon Drive
   \ (amazon cloud drive)
 5 / Amazon S3 Compliant Storage Providers including AWS, Alibaba, Ceph, China Mobile, Cloudflare, ArvanCloud, Digital Ocean, Dreamhost, Huawei OBS, IBM COS, IDrive e2, IONOS Cloud, Lyve Cloud, Minio, Netease, RackCorp, Scaleway, SeaweedFS, StackPath, Storj, Tencent COS, Qiniu and Wasabi
   \ (s3)
 6 / Backblaze B2
   \ (b2)
 7 / Better checksums for other remotes
   \ (hasher)
 8 / Box
   \ (box)
 9 / Cache a remote
   \ (cache)
10 / Citrix Sharefile
   \ (sharefile)
11 / Combine several remotes into one
   \ (combine)
12 / Compress a remote
   \ (compress)
13 / Dropbox
   \ (dropbox)
14 / Encrypt/Decrypt a remote
   \ (crypt)
15 / Enterprise File Fabric
   \ (filefabric)
16 / FTP
   \ (ftp)
17 / Google Cloud Storage (this is not Google Drive)
   \ (google cloud storage)
18 / Google Drive
   \ (drive)
19 / Google Photos
   \ (google photos)
20 / HTTP
   \ (http)
21 / Hadoop distributed file system
   \ (hdfs)
22 / HiDrive
   \ (hidrive)
23 / In memory object storage system.
   \ (memory)
24 / Internet Archive
   \ (internetarchive)
25 / Jottacloud
   \ (jottacloud)
26 / Koofr, Digi Storage and other Koofr-compatible storage providers
   \ (koofr)
27 / Local Disk
   \ (local)
28 / Mail.ru Cloud
   \ (mailru)
29 / Microsoft Azure Blob Storage
   \ (azureblob)
30 / Microsoft OneDrive
   \ (onedrive)
31 / OpenDrive
   \ (opendrive)
32 / OpenStack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ (swift)
33 / Pcloud
   \ (pcloud)
34 / Put.io
   \ (putio)
35 / SMB / CIFS
   \ (smb)
36 / SSH/SFTP
   \ (sftp)
37 / Sia Decentralized Cloud
   \ (sia)
38 / Sugarsync
   \ (sugarsync)
39 / Transparently chunk/split large files
   \ (chunker)
40 / Union merges the contents of several upstream fs
   \ (union)
41 / Uptobox
   \ (uptobox)
42 / WebDAV
   \ (webdav)
43 / Yandex Disk
   \ (yandex)
44 / Zoho
   \ (zoho)
45 / premiumize.me
   \ (premiumizeme)
46 / seafile
   \ (seafile)
Storage>
```

这里的序号可能会随着rclone版本更新变更，以实际的为准。我这里选择30

```
Option client_id.
OAuth Client Id.
Leave blank normally.
Enter a value. Press Enter to leave empty.
client_id>

Option client_secret.
OAuth Client Secret.
Leave blank normally.
Enter a value. Press Enter to leave empty.
client_secret>

Option region.
Choose national cloud region for OneDrive.
Choose a number from below, or type in your own string value.
Press Enter for the default (global).
 1 / Microsoft Cloud Global
   \ (global)
 2 / Microsoft Cloud for US Government
   \ (us)
 3 / Microsoft Cloud Germany
   \ (de)
 4 / Azure and Office 365 operated by Vnet Group in China
   \ (cn)
region> 1
```

client_id 和 client_id 留空。region 选择 1


```
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine

y) Yes (default)
n) No
y/n>
```

这里选择n，因为服务器上没办法完成这步骤授权


## 获取 access_token

```
Option config_token.
For this to work, you will need rclone available on a machine that has
a web browser available.
For more help and alternate methods see: https://rclone.org/remote_setup/
Execute the following on the machine with the web browser (same rclone
version recommended):
	rclone authorize "onedrive"
Then paste the result.
Enter a value.
config_token>
```

auto config 选择 no 后，服务器交互会停止在让你输入 config_token 的步骤。
请找一个能打开浏览器能互动的PC，再次下次rclone。比如我在用Windows，就下载rclone的exe版本。
也需要打开终端，运行`rclone authorize "onedrive"`。


浏览器会自动被打开，然后会弹出微软的Oauth的登录界面，登录你的MS账户。

```
PS C:\Users\ame\Desktop\rclone-v1.72.0-windows-amd64> ./rclone authorize "onedrive"
2026/05/12 03:18:12 NOTICE: Config file "C:\\Users\\ame\\AppData\\Roaming\\rclone\\rclone.conf" not found - using defaults
2026/05/12 03:18:12 NOTICE: Make sure your Redirect URL is set to "http://localhost:53682/" in your custom config.
2026/05/12 03:18:12 NOTICE: If your browser doesn't open automatically go to the following link: http://127.0.0.1:53682/auth?state=ABCD-TEST-2333
2026/05/12 03:18:12 NOTICE: Log in and authorize rclone for access
2026/05/12 03:18:12 NOTICE: Waiting for code...
2026/05/12 03:19:17 NOTICE: Got code
Paste the following into your remote machine --->
{"access_token":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","expiry":"2026-05-12T04:19:17.8699885+08:00","expires_in":3599}
<---End paste
```


成功后终端会有你的token，上面是举例。把 `{"access_token": .. }` 这段复制后，复制到你的服务器上
也就是`config_token`填写这些json信息。因为你在服务器命令行交互下没办法弹出浏览器配置，并本地回到拿到token。


```
Option config_type.
Type of connection
Choose a number from below, or type in an existing string value.
Press Enter for the default (onedrive).
 1 / OneDrive Personal or Business
   \ (onedrive)
 2 / Root Sharepoint site
   \ (sharepoint)
   / Sharepoint site name or URL
 3 | E.g. mysite or https://contoso.sharepoint.com/sites/mysite
   \ (url)
 4 / Search for a Sharepoint site
   \ (search)
 5 / Type in driveID (advanced)
   \ (driveid)
 6 / Type in SiteID (advanced)
   \ (siteid)
   / Sharepoint server-relative path (advanced)
 7 | E.g. /teams/hr
   \ (path)
config_type>
```

选择`config_type`，我这里选择1

```
Select drive you want to use
Choose a number from below, or type in your own string value.
Press Enter for the default (b!dMIrcdg7R0aKl4ZLqlcvdFEjzBS_SqNJod05zHQSsZ7QnBRAAAAAAA.
 1 / AAAAAAA-CFF8-4E2A-89C6-03841FF83500 (personal)
   \ (b!dMIrcdg7R0aKl4ZLqlcvdFEjzBS_SqNJod05zHQSsZ7QnBRIkcAAAAAAA)
 2 / AAAAAAA-d5e3-4e02-ab10-ae3d0d18680d (personal)
   \ (b!dMIrcdg7R0aKl4ZLqlcvdFEjzBS_SqNJod05zHQSsZ47DFLSyAAAAAAA)
 3 / ODCMetadataArchive (personal)
   \ (b!dMIrcdg7R0aKl4ZLqlcvdFEjzBS_SqNJod05zHQSsZ5pnriJhAAAAAAA)
 4 / Bundles_AAAAAAAAAAAAAAAAAAAAAAAAAAAA (personal)
   \ (AAAAAAAC93F75)
 5 / AAAAAAA-AAAAAAA-45F9-BF47-A403283F090E (personal)
   \ (b!dMIrcdg7R0aKl4ZLqlcvdFEjzBS_SqNJod05zHQSsZ5tm5VAAAAAAA)
 6 / OneDrive (personal)
   \ (AAAAAAAC93F75)
config_driveid>
```

最后一步，这里可以一个一个试过去，选错配置不会完成，会回到上一步
比如我选了1没成功，一直到4才成功。


```
Drive OK?

Found drive "root" of type "personal"
URL: https://onedrive.live.com?cid=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

y) Yes (default)
n) No
y/n>
```

最后是确认步骤，到步骤你基本已经成功了，`y`,`y`,`q`即可


## 测试和自动挂载

```
rclone lsd onedrive:

-1 2025-12-02 00:00:00 1 Documents
-1 2025-12-02 00:00:00 2 Pictures
-1 2025-12-02 00:00:00 3 Videos
```

如果能看到文件夹被列出就OK

```
sudo mkdir -p /mnt/onedrive
sudo chown -R $(whoami):$(whoami) /mnt/onedrive
```

```
sudo nano /etc/systemd/system/rclone-onedrive.service

# 写入下面内容保存
# User=YOUR_USERNAME 换成用户名
# --config=/home/YOUR_USERNAME/.config/rclone/rclone.conf 换成自己的

[Unit]
Description=Rclone Mount OneDrive (low memory, backup use)
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=YOUR_USERNAME
ExecStart=/usr/bin/rclone mount onedrive:/ /mnt/onedrive \
    --config=/home/YOUR_USERNAME/.config/rclone/rclone.conf \
    --vfs-cache-mode=writes \
    --vfs-cache-max-size=2G \
    --vfs-cache-max-age=6h \
    --dir-cache-time=12h \
    --poll-interval=0 \
    --buffer-size=4M \
    --vfs-read-ahead=8M \
    --low-level-retries=5 \
    --retries=3 \
    --umask=002 \
    --allow-other \
    --log-level=INFO \
    --log-file=/var/log/rclone-onedrive.log
ExecStop=/bin/fusermount -uz /mnt/onedrive
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启用服务

```
sudo systemctl daemon-reload
sudo systemctl restart rclone-onedrive
systemctl status rclone-onedrive
```

挂载点是`/mnt/onedrive`，systemd开机自动挂载，已经完成了哦~