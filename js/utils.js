

export function _addEventClick(element, func){
    element.addEventListener('click', func);
}

export function _addEventKeyDown(element, func){
    element.addEventListener('keydown', func);
}

export function _addEventEnded(element, func){
    element.addEventListener('ended', func);
}

export function _getSoundByLink(link){
    return new Audio(link);
}

export function _getById(id){
    return document.getElementById(id);
}

export function _find(selector){
    return document.querySelector(selector);
}

export function _createElement(name){
    return document.createElement(name);
}

export function _removeClass(element, className){
    return element.classList.remove(className);
}

export function _addClass(element, className){
    return element.classList.add(className);
}




