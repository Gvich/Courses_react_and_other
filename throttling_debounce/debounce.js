function debounce(f, t) {
    return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall && ((this.lastCall - previousCall) <= t)) {
            clearTimeout(this.lastCallTimer);
        }
        this.lastCallTimer = setTimeout(() => f(args), t);
    }
}


let logger = (args) => console.log(`My args are ${args}`);
// debounce: call the logger when two seconds have elapsed since the last call
let debouncedLogger = debounce(logger, 2000);

debouncedLogger([1, 2, 3]);
debouncedLogger([4, 5, 6]);
debouncedLogger([7, 8, 9]);

// "My args are 7, 8, 9" - logged after two seconds