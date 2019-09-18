// async function func() {
//     return 2;
// }

// // func().then(console.log);

// const getPosts = () =>
//     new Promise((resolve, reject) => {
//         resolve([{
//                 name: "a"
//             },
//             {
//                 name: "b"
//             },
//             {
//                 name: "c"
//             }
//         ]);
//     });

// async function func2() {
//     try {
//         const number = await func();
//         const posts = await getPosts();
//         console.log(number);
//         console.log(posts);
//     } catch (e) {
//         console.log(e);
//     }
// }

// func2();

async function func() {
    setTimeout(() => {
        return 2
    }, 1 * 1000);
}

// const number = await func();
// console.log(number);

async function func2() {
    const number = await func();
    console.log(number);
}
func2();