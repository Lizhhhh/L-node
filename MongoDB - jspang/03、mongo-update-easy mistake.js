const worker1 = {
    name: 'lzhhc',
    age: 18,
    sex: 1,
    job: '大前端',
    skill: ['html+css', 'javascript', 'node.js', 'flutter', 'koa', 'vue'],
    regedTime: new Date()
}

const worker2 = {
    name: 'lzhhhh',
    age: 18,
    sex: 1,
    job: 'Java后端',
    skill: ['html+css', 'j2EE', 'PPT'],
    regedTime: new Date()
}

const worker3 = {
    name: 'lzhhhh1',
    age: 18,
    sex: 2,
    job: 'UI',
    skill: ['photoShop', 'UI', 'ppt'],
    regedTime: new Date()
}

const db = connect('company');
db.worker.insert([worker1,worker2,worker3])

print('[success]:The data was inserted successfully');