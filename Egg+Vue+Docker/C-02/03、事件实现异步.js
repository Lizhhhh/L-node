class Evente {
  constructor() {
    this.map = {}
  }
  add(name, fn) {
    if (this.map[name]) {
      this.map[name].push(fn)
      return
    }
    this.map[name] = [fn]
    return
  }
  emit(name, ...args) {
    this.map[name].forEach(fn => {
      fn(...args)
    })
  }
}

let e = new Evente();
e.add("hello", (err, name)=>{
  if(err){
    console.error(err);
    return;
  }
  console.log(name);
});

e.emit('hello','发生错误');
e.emit('hello', null, 'hello nodejs');
