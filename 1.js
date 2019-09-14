var letterCombinations = function(digits) {
  let map = new Map();
  map.set('2',['a','b','c']);
  map.set('3',['d','e','f']);
  map.set('4',['g','h','i']);
  map.set('5',['j','k','l']);
  map.set('6',['m','n','o']);
  map.set('7',['p','q','r','s']);
  map.set('8',['t','u','v']);
  map.set('9',['w','x','y','z']);
  digits = digits.replace(/1/g,'');
  let arr = [];
  for(let s of digits){
      arr.push(map.get(s))
  }
  let retArr = [];
  for(let i =0; i< arr.length; i++){

  }
  console.log(arr);
};

letterCombinations('223');