"use strict";

import { $, difficultyLevelSpans, difficultyLevelSpansElem, editTodoModalInputElem, enterNameInputElem, getLocalStorage, hideAddTodoModalHandler, hideSpansError, inputTitleLimitSpan, newTodoTitleInput, searchTodosInputElem, setLocalStorage, showAddTodoModalHnadler, state, todosContainerElem } from "./main.js";


// selectors
const changeThemeBtn = $.querySelector("#change__theme-btn");

const filterBoxElem = $.querySelector("#filter__box");
const filterOptionBoxElem = $.querySelector("#filter__box-option");

const sortBoxElem = $.querySelector("#sort__box");
const sortBoxOptionElem = $.querySelector("#sort__box-option");

const moreOptionsElem = $.querySelector("#more__option");
const moreOptionsOptionElem = $.querySelector("#more__option-option");

const todoMoreOptionElem = $.querySelector("#todo-more__option");
const todoMoreOptionBoxElem = $.querySelector("#todo-more__option-items");

const addTodoModalBtn = $.querySelector('#add-todo__modal');
const hidAddTodoModalBtn = $.querySelector('#cancel__add-todo');



const changeMainColorModalElem = $.querySelector('#change__main-color-modal');
const openChangeColorModalElem = $.querySelector('#open_change-color__modal');
const mainColorInputElem = $.querySelector('#main-color__input');
const completeChangeColorBtn = $.querySelector('#complete_change-color-btn');
const cancelChangeColorBtn = $.querySelector('#cancel__change-color-btn');

const enterNameModalElem = $.querySelector('#enter-name-modal');
const enterNameSpanElem = $.querySelector('#enter-name-limit-span');
const applyEnterNameBtn = $.querySelector('#complete_enter-name');
const topUserNameSpanElem = $.querySelector('#user-name-top-span');
const cancelEnterNameBtn = $.querySelector('#cancel__enter-name');
const headTitleH2Elem = $.querySelector('#head__tite');

const closeAboutModalBtn = $.querySelector('#close_about-modal');
const openAboutModalBtn = $.querySelector('#open_about-modal-btn');

const exprotOptionsSpans = $.querySelectorAll('.export-todo-option');



// Necessary variables

let dropDowns = [
  { parent: filterBoxElem, drop: filterOptionBoxElem },
  { parent: sortBoxElem, drop: sortBoxOptionElem },
  { parent: moreOptionsElem, drop: moreOptionsOptionElem },
];

// set main color

if (getLocalStorage('state')) {
  document.documentElement.style.setProperty('--main-color', getLocalStorage('state').mainColor);
  mainColorInputElem.value = getLocalStorage('state').mainColor;
}
// window loading

window.addEventListener("load", () => {
  changeThemeHandler();
  getUserNameHandler();

  $.querySelector("#loader_container").style.display = 'none';

});

// window keyboard event 
window.addEventListener('keydown', e => {
  
  if ( e.key === 'Enter' || e.key === 'Escape') {
      $.querySelector('#keyboard-error-modal').classList.remove('hide__modal');
      $.querySelector('#keyboard-error-modal').querySelector('h3').innerHTML = `Please use the buttons instead of <span class="underline">${e.key}</span>`;
      setTimeout(() => {
        $.querySelector('#keyboard-error-modal').classList.add('hide__modal');
        
      }, 3000);
  }
  
})

// body event

document.addEventListener("click", (event) => {

  let isDropDown = dropDowns.find((box) => {
    return box.parent.contains(event.target);
  });

  if (!isDropDown) {
    dropDowns.forEach((box) => {
      box.drop.classList.remove("show__drop-down__option-parent");
      if (box.parent.querySelector('.arrow-icon')) {
        box.parent.querySelector('.arrow-icon').classList.add('rotate-180');
      }
    });
  };



});

// change theme...
function changeThemeHandler() {

  const localState = getLocalStorage('state') || state;

  
  

  // console.log(state.theme);

  if (localState.theme === "dark") {
    $.documentElement.style.setProperty("--main-white-color", "#252525");
    $.documentElement.style.setProperty("--main-black-color", "#F7F7F7");
    
    changeThemeBtn.querySelector('button').classList.add('translate-y-[20px]');
    

    localState.theme = "dark";
  setLocalStorage("state", localState);

    return;
  }

  if (localState.theme === "light") {
    $.documentElement.style.setProperty("--main-black-color", "#252525");
    $.documentElement.style.setProperty("--main-white-color", "#F7F7F7");
    changeThemeBtn.querySelector('button').classList.remove('translate-y-[20px]');

    changeThemeBtn.querySelector('button').classList.add('translate-y-[-19px]');


    localState.theme = "light";
  setLocalStorage("state", localState);

    return;
    
  }



}

//

function openBoxe(optionElem, event) {

  dropDowns.forEach(box => {
    if (!box.parent.contains(event.target) && box.drop.className.includes('show__drop-down__option-parent')){
      
      box.drop.classList.remove("show__drop-down__option-parent");

      if (box.parent.querySelector('.arrow-icon')) {
        box.parent.querySelector('.arrow-icon').classList.add('rotate-180');
      }

    }
    
  });

  $.querySelectorAll('#todo-more__option-items').forEach(item => item.classList.remove('show__drop-down__option-parent'));
  
  if (optionElem.parentElement.querySelector('.arrow-icon')) {
    optionElem.parentElement.querySelector('.arrow-icon').classList.remove('rotate-180');

  }

  optionElem.classList.toggle("show__drop-down__option-parent");
}

changeThemeBtn.addEventListener("click", () => {
  const localState = getLocalStorage('state');
  
  localState.theme = getLocalStorage("state").theme === "light" ? "dark" : "light";

  setLocalStorage('state', localState)
  changeThemeHandler();
});

// open boxs handler... like filter, sort,...
dropDowns.forEach((box) => {
  box.parent.addEventListener("click", e => {
    openBoxe(box.drop , e);
  });
});



// 30 limit character for todo title

function todoTitleLimitHandler() {
  inputTitleLimitSpan.innerHTML = 30 - newTodoTitleInput.value.length ;
  hideSpansError();
}

// 
difficultyLevelSpans.forEach(span => {

  
  span.addEventListener('click', () => {

    difficultyLevelSpans.forEach(item => {
      
      item.style.color = 'var(--static-black-color)';
      item.style.backgroundColor = '';
      item.id = ''
    });

    span.style.color = 'var(--static-white-color)';
    span.style.backgroundColor = 'var(--main-color)';
    span.id = 'active__dificulty';

  })
});

// complate change color by click on apply in change color modal handler

function changeMainColorHandler () {
  
  document.documentElement.style.setProperty('--main-color', mainColorInputElem.value);

  state.mainColor = mainColorInputElem.value;
  setLocalStorage('state', state);
  changeMainColorModalElem.classList.add('hide__modal');
}

// open change color modal by click on change color in more option

function openChangeColorModalHandler() {
  changeMainColorModalElem.classList.remove('hide__modal');
  mainColorInputElem.value = getLocalStorage('state').mainColor;
}

// close and set back main color by click on cancel in change color modal

function closeChangeColorModalHandler() {
  changeMainColorModalElem.classList.add('hide__modal');
  document.documentElement.style.setProperty('--main-color', getLocalStorage('state').mainColor);
}

// change main color when input is changing
function liveChangeColorHandler() {
  document.documentElement.style.setProperty('--main-color', mainColorInputElem.value);
}

// new todos drop down handler

// i know it's very bad :)  

document.addEventListener('click', e => {

  function openNewTodoOptionHandler () {

    const mainTarget = e.target.closest('div#todo-more__option');
    
    if (mainTarget) {

      const mainTargetOptions =  mainTarget.querySelector('#todo-more__option-items');

      if ( mainTargetOptions.className.includes('show__drop-down__option-parent') ) {
        mainTargetOptions.classList.remove('show__drop-down__option-parent');
      } else {
        mainTargetOptions.classList.add('show__drop-down__option-parent');
      }

      document.querySelectorAll('#todo-more__option-items').forEach(item => {
          
          if ( item.className.includes('show__drop-down__option-parent') && !item.parentElement.contains(e.target) ) {
              item.classList.remove('show__drop-down__option-parent')
            }
      })

    } else {
      document.querySelectorAll('#todo-more__option-items').forEach(item => item.classList.remove('show__drop-down__option-parent'))
    }

  }

  
  openNewTodoOptionHandler()
  
});

//////////////////////////////////////

        
difficultyLevelSpansElem.forEach( item => item.addEventListener('click', () => $.querySelector('#edit-todo-difficulty-level-error').classList.remove('show-errors-by-span') ) )


/////////////////////////////////////

function getUserNameHandler () {

  const localState = getLocalStorage('state');
  const localUsername = localState.userName;


  if (!localUsername ) {
    enterNameModalElem.classList.remove('hide__modal');
    return;
  }

  if ( typeof localUsername === 'string' ) {

    topUserNameSpanElem.innerHTML = getLocalStorage('state').userName;
  }  else {
    headTitleH2Elem.innerHTML = `<span id="user-name-top-span"
                class="text-[var(--main-color)]">Todo</span>
          list!`;
  }
  
}

///// 

function showInputLimitHandler() {
  enterNameSpanElem.innerHTML = 20 - enterNameInputElem.value.length;
}

////
function applyEnterNameHandler() {

  const localState = getLocalStorage('state');
  localState.userName = enterNameInputElem.value;
  setLocalStorage('state', localState);
  enterNameModalElem.classList.add('hide__modal')
  topUserNameSpanElem.innerHTML = enterNameInputElem.value;
  
}

////

function cancelEnterNameHandler (){

  const localState = getLocalStorage('state');
  localState.userName = true;
  setLocalStorage('state', localState);


  headTitleH2Elem.innerHTML = `<span id="user-name-top-span"
                class="text-[var(--main-color)]">Todo</span>
            list!`;
  enterNameModalElem.classList.add('hide__modal');


}

//////////////////////////////////////


exprotOptionsSpans.forEach(span => {
  span.addEventListener('click', () => {

    $.querySelector('#export-option-error').classList.add('hidden')


    exprotOptionsSpans.forEach(span => {
      span.classList.remove('bg-[var(--main-color)]!');
    span.classList.remove('text-[var(--static-white-color)]!');
    span.id = '';
    });

    span.classList.add('bg-[var(--main-color)]!');
    span.classList.add('text-[var(--static-white-color)]!');
    span.id = 'selected-option-for-export';
  });
  
  
});

/// scroll into view function

function scrollIntoViewHandler( elem ) {
 
  setTimeout(() => {
     elem.scrollIntoView({ behavior: "smooth", block: "center" })
  }, 300);
 
}

////////////////////////////////////

$.querySelectorAll('textarea').forEach(textarea => {
  
  textarea.addEventListener('input', e => {

    if ( e.target.value.length > 38 ) {
      e.target.style.height = '100px';
    } else {
      e.target.style.height = '';
      
  }
  });

  textarea.addEventListener('focus', () => {
    scrollIntoViewHandler(textarea)
  })

})

/////////////////////////////////////


///// set events 
addTodoModalBtn.addEventListener('click', showAddTodoModalHnadler);
hidAddTodoModalBtn.addEventListener('click', hideAddTodoModalHandler);
newTodoTitleInput.addEventListener('input', todoTitleLimitHandler);
completeChangeColorBtn.addEventListener('click', changeMainColorHandler);
openChangeColorModalElem.addEventListener('click', openChangeColorModalHandler);
cancelChangeColorBtn.addEventListener('click', closeChangeColorModalHandler);
mainColorInputElem.addEventListener('input', liveChangeColorHandler);
// searchTodosInputElem.addEventListener('focus', activeSerchInputHandler);
enterNameInputElem.addEventListener('input', showInputLimitHandler);
applyEnterNameBtn.addEventListener('click', applyEnterNameHandler);
cancelEnterNameBtn.addEventListener("click", cancelEnterNameHandler);
newTodoTitleInput.addEventListener('focus', () => {
  scrollIntoViewHandler($.querySelector('#add-todo-modal-box'));
});
///
editTodoModalInputElem.addEventListener('focus', () => {
  scrollIntoViewHandler($.querySelector('#edit__todo-modal'));
});

closeAboutModalBtn.addEventListener('click', () => {

  $.querySelector('#about-modal').classList.add('hide__modal');
  
});

openAboutModalBtn.addEventListener('click', () => {
  $.querySelector('#about-modal').classList.remove('hide__modal');

})