const username = 'lzhhc';
const timeStamp = Date.parse(new Date());
const jsonDatabase = { "name": username, "time": timeStamp };
const db = connect('log'); // use log;

db.login.insert(jsonDatabase);

print('[demo]:log print susccess');