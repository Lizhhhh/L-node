# 数据持久化 - MySQL
 - 课堂目标
  + 掌握node.js中实现持久化的多种方法
  + 掌握mysql下载、安装和配置
  + 掌握node.js中原生mysql驱动模块的应用

# Get 和 Post区别
 - GET回退无害, POST会再次提交
 - GET产生URL地址收藏,POST不可以
 - GET请求会被浏览器主动缓存
 - GET请求需要URL编码
 - GET请求有长度限制
 - GET参数通过URL传递POST放在Request Body中

# 虚拟机
 带环境安装的一种解决方案,它可以在一种操作系统里面运行另一种操作系统,比如在Windows系统里面运行Linux系统。
 优点:
  - 看上去跟真实系统一模一样
  - 对于底层系统来说:虚拟机就是一个文件,不要了就直接删除,对其他部分毫无影响
 缺点:
  - 占用资源多: 会占用一定资源,它允许的时候,其他程序j就不能使用这些资源了
  - 冗余步骤多: 是完整的操作系统,一些操作系统级别的操作往往无法跳过,比如用户登录
  - 启动慢: 启动操作系统需要多久,启动虚拟机就需要多久。可能要等几分钟,程序才能真正运行

# Linux容器
 - LXC(Linux Containers):不是一个模拟的操作系统,而是对进程进行隔离。在正常进程外面套一个保护层。
 - 对于容器里面的进程来说,它接触到的各种资源都是虚拟的,从而实现与底层系统的隔离
 - 由于容器是进程级别的,相比虚拟机有很多优势:
   + 启动快: 容器里面的应用,直接就是底层系统的一个进程,而不是虚拟机内部的进程。所以,启动容器相当于启动本机的一个进程,而不是启动一个操作系统
   + 资源占用少: 容器只占用需要的资源,不占用那些没有用到的资源;虚拟机由于是完整的操作系统,不可避免占用资源。多个容器可以共享资源,虚拟机都是独享资源
   + 体积小: 容器只要包含用到的组件即可,而虚拟机是整个操作系统的打包,所以容器文件比虚拟机文件要小很多




# Docker
属于Linux容器的一种封装,提供简单易用的容器使用接口。是目前最流行的Linux容器解决方案。
Docker将应用程序与该程序的依赖打包在一个文件里面。运行这个文件,就会生成一个虚拟容器。程序在这个虚拟容器中运行,就好像在真实的物理机上运行一样

用途:
 - 提供一次性的环境: 本地测试他人的环境、持续集成的时候提供单元测试和构建环境
 - 提供弹性的云服务: Docker容器可以随开随关,很适合动态扩容和缩容
 - 组件微服务架构: 通过多个容器,一台机器可以跑多个服务,因此在本机就可以模拟出微服务架构

# image文件
Docker把应用程序及其依赖,打包在image文件里面。image文件可以看作是容器的模板。Docker根据image文件生成容器的实例。同一个image文件,可以生成多个同时运行的容器实例

image是二进制文件。实际开发中,一个image文件往往通过继承另一个image文件,加上一些个性化设置而生成。

# 列出本机的所有image文件
$ docker image ls

# 删除image文件
$ docker image rm [imageName]

# 将image文件从仓库抓取到本地
$ docker image pull library/hello-world

# 运行image文件
$ docker container run hello-world
  - docker container run命令具有自动抓取image文件的功能。如果本地没有指定的image文件,就会从仓库自动抓取

# 安装运行Ubuntu的image,在命令行体验Ubuntu系统
$ docker container run -it ubuntu bash

# 关闭正在运行的容器
$ docker container kill [containID]

# 容器文件
image文件生成的容器实例,本身也是一个文件,称为容器文件。也就是说,一旦容器生成,就会同时存在2个文件:image文件和容器文件。而且关闭容器并不会删除,只是容器停止运行而已。

# 查看正在运行的容器
$ docker container ls

# 列出本机所有容器,包括终止运行的容器
$ docker container ls -all

# 删除容器(真正从硬盘空间上删除)
$ docker container rm [containerID]

# Dockerfile文件
一个文本文件,用来配置image。Docker根据该文件生成二进制image文件

# .dockerignore
不要打包进入image文件
````
.git
node_modules
npm-debug.log
````

# Dockerfile
 - FROM node: 8.4:
 表示该image文件继承官方的node image,版本号是8.4
 - COPY . /app:
 将当前目录下的所有文件(除了.dockerignore排除的路径),都拷贝进入 image文件的/app目录
 - WORKDIR /app:
 指定接下来的工作路径为 /app。
 - RUN npm install:
 在/app目录下,运行npm install命令安装依赖。注意,安装后所有的依赖,都将打包进入image文件
 - EXPOSE 3000:将容器3000端口暴露出来,允许外部连接这个端口。

# 创建image文件(koa-demo)
 - 1.创建Dockerfile
````
FROM node 8.4
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3000
````
 - 2.创建image文件:
  - 注意 .(有个英文的点)
````
$ docker image build -t koa-demo .
````

# 查看正在运行的image文件
````
$ docker image ls
````

# 生成容器
````
$ docker container run -p 8000:3000 -it koa-demo /bin/bash
````
各个参数的含义如下:
 - -p参数:容器的 3000 端口映射到本机的 8000 端口
 - -it参数: 容器的 Shell 映射到当前的 Shell,然后你在本机窗口输入的命令,就会传入容器
 - koa-demo:0.0.1: image 文件的名字(默认是 latest 标签)
 - /bin/bash: 容器启动以后,内部第一个执行的命令。这里是启动 Bash,保证用户可以使用 Shell

# CMD 命令
在Dockerfile里面,添加如下代码: 设置自动启动 demos/01.js
````
CMD node demos/01.js
````

# RUN 命令和 CMD命令的区别
RUN命令在image文件的构建阶段执行,执行结果都会打包进入image文件
CMD命令则是在容器启动后执行

# 发布image
首先登录
````bash
$ docker login
````
为本地的image标注用户名和版本
````bash
$ docker image tag koa-demos:0.0.1 lzhhc/koa-demos:0.0.1
````
将本地的 image 文件发布到远程仓库
````bash
$ docker image push lzhhc/koa-demos:0.0.1
````
