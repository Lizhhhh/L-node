const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

// 读取目录和路径
const load = async (dir, cb) => {
    // 获取绝对路径
    const url = path.resolve(__dirname, dir);
    // 读取目录
    const files = fs.readdirSync(url);
    files.forEach((filename) => {
        // 去掉扩展名
        filename = filename.replace('.js', '');
        const resources = require(url + '/' + filename);
        cb(filename, resources);
    })
}


// 加载路由
// app.get('/', ctx => {})
const initRouter = (app) => {
    const router = new Router();
    console.log(app);
    load('routes', (filename, routes) => {
        const prefix = filename === 'index' ? '' : `/${filename}`;
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ');
            console.log(`正在映射地址: ${method.toLocaleUpperCase()}${prefix}${path}`);
            // 注册路由
            router[method](prefix + path, routes[key]);
        })
    })
    return router;
}

// 加载Controller层
// app.controller.home.index
const initController = (app) => {
    let controller = {};
    load('controller', (filename, ctrls) => {
        if (typeof ctrls === 'function') {
            controller[filename] = ctrls();
        } else {
            controller[filename] = ctrls;
        }
    })
    return controller;
}

// 加载Service层
// app.service.user.getName();
const initService = () => {
    let services = {};
    load('service', (filename, service) => {
        services[filename] = service;
    })
    return services;
}



module.exports = { initRouter, initController, initService }

// load('routes', filename => console.log('routes: ', filename));