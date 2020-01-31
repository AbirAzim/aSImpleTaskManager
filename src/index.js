import './index.css';

window.onload = function () {
    let inputField = document.getElementById('inputField');
    let enterTaskButton = document.getElementById('enterTask');
    let allTaskParent = document.getElementById('allTask');

    inputField.addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
            createNewTask(allTaskParent, event.target.value);
            this.value = '';
        }
    });
}

function createNewTask(parent, task) {
    let col = create({ 'class': 'col-sm-3' })

    let singleTask = create({ 'class': 'singleTask d-flex' });
    let singleTaskP = create('p', { 'class': 'text' });
    singleTaskP.innerHTML = task;

    singleTask.appendChild(singleTaskP);

    let closeTask = create('span', { 'class': 'ml-auto' });
    closeTask.innerHTML = `<i class="fa fa-times-circle"></i>`;

    closeTask.addEventListener('click', function () {
        parent.removeChild(col);
    })

    singleTask.appendChild(closeTask);

    let singleTaskController = createTaskController(singleTask);
    singleTaskController.style.visibility = 'hidden';
    singleTask.appendChild(singleTaskController);

    singleTask.onmouseenter = function () {
        singleTaskController.style.visibility = 'visible';
    }

    singleTask.onmouseleave = function () {
        singleTaskController.style.visibility = 'hidden';
    }

    col.appendChild(singleTask);


    // console.dir(col);
    // console.dir(parent);
    parent.appendChild(col);
}

function createTaskController(parent) {
    let controlPannel = create({ 'class': 'task-control-pannel d-flex align-items-center' });

    let colorPallet = createColorPallet(parent);
    controlPannel.appendChild(colorPallet);

    let editButton = createEditButton(parent);
    controlPannel.appendChild(editButton);

    return controlPannel;
}



function createEditButton(parent) {
    let span = create('span', { 'class': 'ml-auto mr-2' });
    span.innerHTML = `<i class="fas fa-user-edit"></i>`;
    span.style.color = 'grey';

    span.addEventListener('click', function () {


        span.style.visibility = 'hidden';
        let p = parent.querySelector('p');
        let textArea = create('textArea', { 'class': 'innerTextArea' });
        textArea.style.width = parent.offsetWidth + 'px';
        textArea.style.height = parent.offsetHeight + 'px';
        textArea.value = p.innerHTML;

        textArea.addEventListener('keypress', function (event) {

            // event.stopPropagation();//to stop conflict in event

            if (event.keyCode === 13) {
                p.innerHTML = this.value;
                console.log(this.value);
                parent.removeChild(this);
                span.style.visibility = 'visible';
            }
        })

        parent.appendChild(textArea);

    })


    return span;
}


function createColorPallet(parent) {
    let color = ['palegreen', 'skyblue', 'powderblue', 'salmon', 'red', 'pink', 'yellow'];

    let colorDiv = create({ 'class': 'd-flex' });

    color.forEach((ele) => {
        let div = create({ 'class': 'color-circle ml-1' });
        div.style.background = ele;

        div.addEventListener('click', function () {
            if (ele === 'palegreen' || ele === 'skyblue' || ele === 'powderblue' || ele === 'pink' || ele === 'yellow') {
                parent.style.color = 'black';
                parent.style.background = ele;
            } else {
                parent.style.background = ele;
                parent.style.color = 'white';
            }
        })

        colorDiv.appendChild(div);
    })

    return colorDiv;
}





window.create = function () {

    if (arguments.length === 0) {
        return document.createElement('div');
    }

    if (arguments.length === 1 && typeof arguments[0] != 'object') {
        return document.createElement(arguments[0]);
    }

    var tag = arguments[0];
    var attr = arguments[1] || arguments[0];

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
        tag = 'div';
    }

    var element = document.createElement(tag);

    for (var i in attr) {
        element.setAttribute(i, attr[i]);
    }

    return element;
}

// // Create A TextNode based on Given Data
// window.textNode = function (data) {
//     return document.createTextNode(data);
// }

// // Select Any Html Element Using CSS selector
// window.select = function (selector) {
//     return document.querySelector(selector);
// }

// // Select All Element Using CSS Selector
// window.selectAll = function (selector) {
//     return document.querySelectorAll(selector);
// }

// // Add Content To Any HTML Element, You may use html or text
// HTMLElement.prototype.content = function (data) {
//     this.innerHTML = data
//     return this;
// };

// // Append Child Element
// HTMLElement.prototype.append = function () {
//     for (var i in arguments) {
//         this.appendChild(arguments[i]);
//     }
//     return this;
// }

// // Toggle CSS Class
// HTMLElement.prototype.toggle = function (className) {
//     this.classList.toggle(className);
//     return this;
// }

// // Add Style
// HTMLElement.prototype.css = function (styles) {
//     for (var s in styles) {
//         this.style[s] = styles[s];
//     }
//     return this;
// }

// // Add Attributes
// HTMLElement.prototype.attrs = function (attr) {
//     for (var i in attr) {
//         this.setAttribute(i, attr[i]);
//     }
//     return this;
// }

// // Add Event Liseners
// HTMLElement.prototype.events = function (event) {
//     for (var e in event) {
//         this.addEventListener(e, event[e]);
//     }
//     return this;
// }

// // Find Parent Nodes
// HTMLElement.prototype.parent = function () {
//     return this.parentElement;
// }

// // Find Children of Selected Element
// // You can use selector as well
// HTMLElement.prototype.child = function () {
//     if (arguments.length === 0) {
//         return this.children;
//     }

//     return this.querySelectorAll(arguments[0]);
// }