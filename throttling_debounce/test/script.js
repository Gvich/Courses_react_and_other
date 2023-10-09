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

function throttle(f, t) {
    return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall === undefined || (this.lastCall - previousCall) > t) {
            f(args);
        }
    }
}

// Example usage of debounce and throttle
const debouncedResizeHandler = debounce(onWindowResize, 2000); // Debounce with a 300ms delay
const throttledScrollHandler = throttle(onScroll, 200); // Throttle with a 200ms interval

function onWindowResize(event) {
    // Handle window resize event here
    console.log('Window resized:', event);
}

function onScroll(event) {
    // Handle scroll event here
    console.log('Scrolled:', event);
}

// Attach event listeners to window for testing
window.addEventListener('resize', debouncedResizeHandler);
window.addEventListener('scroll', throttledScrollHandler);
