---
title: 内网穿透工具FRP
date: 2019-06-03 18:27:35
tags: 开发工具
---

> 当进行微信开发，小程序开发，外网访问内网服务时通常会遇到访问不到内网资源的问题，现在广泛使用的成熟方案可能有花生壳，Ngrok等，不过花生壳虽好可惜要money，自定义域名也是万万不可的，money很多另当别论啦。

[GITHUB 传送门](https://github.com/fatedier/frp)

Frp使用go lang开发，速度上有保证，官网的介绍
> FRP服务可以分配给你一个域名让你本地的web项目提供给外网访问，特别适合向别人展示你本机的web demo 以及调试一些远程的API (比如微信公众号，企业号的开发)

### 配置文件详解
服务端配置文件`frps.ini`:
```
[common]       # 通用配置
bind_port = 7000  # 绑定监听端口，用来监听客户端的连接（授权）
vhost_http_port = 8081  # http服务端口
#vhost_https_port = 443 # https服务端口
dashboard_port = 7500   # 控制台端口号
log_file = /root/frp/frps.log   # 日志文件地址
log_level = info    # 日志级别
log_max_days = 3    # 日志保留时长
max_pool_count = 50 # 最大连接池

# 可使用自定义的配置
[web]
type = http # 连接类型
custom_domains = test1.kskxs.com,test2.kskxs.com # 监听域名
auth_token = 123    #token

[mstsc]
listen_port = 100   # 端口
auth_token = 123    # 授权token
```

客户端配置文件 `frpc.ini`
```
[common]
server_addr = diannaobos.com    # 服务器frps的地址
server_port = 7000      # 服务器端口
log_file = ./frpc.log   # 日志
log_level = info    # 日志界别
log_max_days = 3    # 同上
auth_token = 123    # 授权token

[web]
type = http # 转发协议类型
local_ip = 127.0.0.1    # 本地ip
local_port = 8081   # 本地端口
pool_count = 10

[mstsc]
type = tcp
local_ip = 127.0.0.1
local_port = 3389
use_gzip = true
use_encryption = true
pool_count = 2

```
### 食用方式
1. 下载frp二进制文件或源码编译，地址如下:
[here](http://diannaobos.iok.la:81/frp/)，根据系统选择不同版本的哦。
2. 上传frps文件到服务器，修改配置文件`frps.ini`,参数解释如上，可以自行配置。
3. 本地编辑配置文件`frpc.ini`,运行frpc文件，在Windows上使用命令
```
./frpc.exe -c ./frpc.ini
```
使用批处理文件运行使用如下命令:
```
start ./frpc.exe -c ./frpc.ini
```
其他平台同理.

### 如何配置域名
最简单的方法是将域名解析到对应frp服务器，使用配置的监听端口进行使用。

但是会有一个问题在造成端口占用，如果监听了80端口，其他服务将无法正常使用，如apache，nginx等使用默认80端口的http服务软件。

但是我们可以使用nginx作为代理呀，使用一个ip或者域名只提供连接到frps，再转发请求不就好了吗。

修改nginx配置文件(怎么配置自行Google)，我自己的配置文件如下：
```
server{
    listen 80;
    server_name dev.robotsme.com;
    location / {
       proxy_pass http://ddns.robotsme.com:8081;
    }
}

server{
    listen 443 default ssl;
    ssl on;
    ssl_certificate /tools/ssl_dev/server.crt;
    ssl_certificate_key /tools/ssl_dev/server.key;
    server_name dev.robotsme.com;
    location / {
        proxy_pass http://ddns.robotsme.com:8081;
    }
}

```
某些情况下必须使用https，so，证书什么的配置下，大功告成了。上面的配置是将来自dev.robotsme.com的请求代理到ddns.robotsme.com上完成转发，ssl也可以的。

### 其他文档
[看这里](https://diannaobos.com/post/826.html)
