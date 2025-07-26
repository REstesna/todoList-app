"use strict"

export const $ = document;

export const difficultyLevelSpans = $.querySelectorAll('.difficulty__level-span');

export const inputTitleLimitSpan = $.querySelector('#input-title__limit');

export const newTodoDescriptionElem = $.querySelector('#new-todo__description');

export const todosContainerElem = $.querySelector('#tosos__container');

export const searchTodosInputElem = $.querySelector('#search-todo__input');

export const enterNameInputElem = $.querySelector('#enter-name-input');

export const editTodoModalInputElem = $.querySelector('#edit-todo__modal-input');

export const difficultyLevelSpansElem = $.querySelectorAll('.difficulty__level-span');

export let localState = getLocalStorage('state');




export let state = {
    theme: getLocalStorage("state") ? getLocalStorage("state").theme :  "light",
    mainColor: getLocalStorage('state') ? getLocalStorage('state').mainColor : "#006aff",
    todos: getLocalStorage('state') ? getLocalStorage('state').todos :  [],
    userName: getLocalStorage('state') ? getLocalStorage('state').userName :  false,
};



export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};

export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

export const newTodoTitleInput = $.querySelector('#add-todo__modal-input');



export function hideAddTodoModalHandler () {
  $.querySelector('#todo__modal').classList.add('hide__modal');
  newTodoDescriptionElem.value = '';

  difficultyLevelSpans.forEach(item => {
      
      item.style.color = 'var(--static-black-color)';
      item.style.backgroundColor = '';
      item.id = ''
    });

    inputTitleLimitSpan.innerHTML = '30'

    newTodoTitleInput.value = '';
    hideSpansError()
}


export function hideSpansError () {
    $.querySelector('#todo-title-error').classList.remove('show-errors-by-span');
    $.querySelector('#todo-difficulty-level-error').classList.remove('show-errors-by-span');
}


export function openBoxHandler (box, event) {
  if (!box.parent.contains(event.target) && box.drop.className.includes('show__drop-down__option-parent')){
      box.drop.classList.remove("show__drop-down__option-parent");
    }
}

// show add todo modal by click on add new todo

export function showAddTodoModalHnadler ( ) {
  $.querySelector('#todo__modal').classList.remove('hide__modal');

}


///////////////////////////////////////////////

