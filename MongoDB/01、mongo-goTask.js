const username = 'lzhhc';
const timeStamp = Date.parse(new Date());
const jsonDatabase = { "name": username, "time": timeStamp };
const db = connect('log')
