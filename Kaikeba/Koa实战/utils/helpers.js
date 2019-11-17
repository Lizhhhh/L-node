const hbs = require("koa-hbs");
const moment = require("moment");


// 传入 1999-03-01T16:00:00.000Z YYYY/MM/DD
// 输出 1999/03/02
hbs.registerHelper("date", (date, pattern) => {
    try {
        return moment(date).format(pattern);
    } catch (err) {
        return ""
    }
});