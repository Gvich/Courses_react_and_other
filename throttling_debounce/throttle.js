function throttle(f, t) {
    return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall === undefined // function is being called for the first time
            || (this.lastCall - previousCall) > t) { // throttle time has elapsed
            f(args);
        }
    }
}

let logger = (args) => console.log(`My args are ${args}`);
// throttle: call the logger at most once every two seconds
let throttledLogger = throttle(logger, 2000);

throttledLogger([1, 2, 3]);
throttledLogger([1, 2, 3]);
throttledLogger([1, 2, 3]);
throttledLogger([1, 2, 3]);
throttledLogger([1, 2, 3]);
throttledLogger([1, 2, 3]);
throttledLogger([1, 2, 3]);
throttledLogger([1, 2, 3]);
throttledLogger([1, 2, 3]);
throttledLogger([1, 2, 3]);

// "My args are 1, 2, 3" - logged only once