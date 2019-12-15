# 指定pm2版本的镜像
FROM keymetrics/pm2:latest-alpine
# 移动当前目录下面的文件(在此用 . 表示)到app目录下
ADD . /usr/src/app
# 进入到app目录下面,类似cd
WORKDIR /usr/src/app
# 安装依赖
RUN npm config set registry https://registry.npm.taobao.org/ && npm i
# 对外暴露的端口
EXPOSE 3000
# 程序启动脚本
CMD ["pm2-runtime", "start", "process.yml"]
