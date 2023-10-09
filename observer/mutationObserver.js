let observer1 = new MutationObserver(mutationRecords => {
    console.log(mutationRecords); // console.log(изменения)
});
const elem = document.getElementById('elem')
// наблюдать за всем, кроме атрибутов
observer1.observe(elem, {
    childList: true, // наблюдать за непосредственными детьми
    subtree: true, // и более глубокими потомками
    characterDataOldValue: true // передавать старое значение в колбэк
});

// let demoElem = document.getElementById('highlight-demo');

// динамически вставить содержимое как фрагменты кода
let observer2 = new MutationObserver(mutations => {

    for(let mutation of mutations) {
        // проверим новые узлы, есть ли что-то, что надо подсветить?

        for(let node of mutation.addedNodes) {
            // отслеживаем только узлы-элементы, другие (текстовые) пропускаем
            if (!(node instanceof HTMLElement)) continue;

            // проверить, не является ли вставленный элемент примером кода
            if (node.matches('pre[class*="language-"]')) {
                Prism.highlightElement(node);
            }

            // или, может быть, пример кода есть в его поддереве?
            for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
                Prism.highlightElement(elem);
            }
        }
    }
    console.log(mutations)
});

observer2.observe(demoElem, {childList: true, subtree: true});



