// Create an Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element is in the viewport
            const element = entry.target;
            // Do something with the element, e.g., add content
            element.innerHTML = "Element is in the viewport!";
            console.log('element appeared')
            // Stop observing the element
            // observer.unobserve(element);
        }
    });
});

// Target element to observe
const targetElement = document.createElement("div");
targetElement.classList.add('list-item')
// targetElement.style.height = "200px"; // Add some height for demonstration
document.getElementById("container").appendChild(targetElement);

// Start observing the target element
observer.observe(targetElement);