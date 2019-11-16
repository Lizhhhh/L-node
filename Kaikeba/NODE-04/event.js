new Promise(resolve => {
        console.log("resolve")
        resolve()
    })
    .then(() => console.log("promise then..."))

process.nextTick(() => {
    console.log("nextTick1")
})

setImmediate(() => {
    console.log("set immediate...")
})

setTimeout(() => {
    console.log("set Timeout ...");
}, 0);

process.nextTick(() => {
    console.log("nextTick2")
    process.nextTick(() => {
        console.log("nextTick3");
    })
})