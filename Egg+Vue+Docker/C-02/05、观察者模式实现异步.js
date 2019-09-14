function create(fn) {
    let ret = false;
    return ({ next, complete, errpr }) => {
        function newxFn(...args) {
            if (ret) {
                return;
            }
            next(...args);
        }

        function completeFn(...args) {
            complete(...args);
            ret = true;
        }

        function errorFn(...args) {
            error(...args);
        }
        fn({
            next: nextFn,
            complete: completeFn,
            error: errorFn
        });
        return () => { ret = true };
    };
}
let observerable = create(observer => {
    setTimeout(() => {
        observer.next(1);
    }, 1 * 1000);
})
const subject = {
    next: value => {
        console.log(value);
    },
    complete: console.log,
    error: console.log
};
let unsubscribe = observerable(subject);