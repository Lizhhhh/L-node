class ChainEvente {
  constructor() {
    this.map = {};
  }
  add(name, fn) {
    if(this.map[name]) {
      this.map[name].push(fn);
      return this;
    }
    this.map[name] = [fn];
    return this;
  }

  emit(name, ...args) {
    this.map[name].forEach(fn =>{
      fn(...args);
    });
    return this;
  }
}

let e2 = new ChainEvente();
e2
.add('hello', (err, name)=>{
  if(err){
    console.error(err);
    return;
  }
  console.log(name);
})
.emit('hello', '发生了错误')
.emit('hello', null, 'hello nodejs');