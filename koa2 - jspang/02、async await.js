function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('long_time_value')
        }, 1 * 1000);
    })
}

async function test() {
    const v = await takeLongTime();
    console.log(v);
}
test();