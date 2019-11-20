const http = require('http');

const session = {};
http.createServer((req, res) => {
    const sessionKey = 'sid';

    if (req.url === '/favicon.ico') {
        return
    } else {
        const cookie = req.headers.cookie;
        if (cookie && cookie.indexOf(sessionKey) > -1) {
            res.end('Come Back');
            console.log("cookie:", cookie);
            // 简略写法(未必具有通用性)
            const pattern = new RegExp(`${sessionKey}=([^;]+);?\S*`);
            const sid = pattern.exec(cookie)[1];
            console.log('session:', sid, session, session[sid]);
        } else {
            const sid = (Math.random() * 9999999).toFixed();
            res.setHeader('Set-Cookie', `${sessionKey} = ${sid}`);
            session[sid] = { name: 'laowang' };
            res.end('hello cookie');
        }
    }
}).listen(3000);