// selecting elements
const list = document.getElementById("list");
const clear = document.querySelector(".clear");
const input = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); // load the list to the user interface
  var element = document.getElementById("placeholder");
  element.classList.add("gone")
} else {
  // if data isn't empty
  LIST = [];
  id = 0;
}


// load items to the user's interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// To show the current date
const options = {
  weekday: "long",
  month: "short",
  day: "numeric"
};
const today = new Date();

document.getElementById("demo").innerHTML = today.toLocaleDateString("en-US", options);

// todo function
function addToDo(toDo, id, done, trash) {

  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `
      <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
      </li>   
      `;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);

}

// add an item to the list user the enter key
document.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    // if the input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });

      // add item to localstorage ( this code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
    var element = document.getElementById("placeholder");
    element.classList.add("gone")
  }
});

// Adding item with a click
document.getElementById("plus").addEventListener("click", function () {
  const toDo = input.value;

  // if the input isn't empty
  if (toDo) {
    addToDo(toDo, id, false, false);

    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false
    });

    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));

    id++;
  }
  input.value = "";
  var element = document.getElementById("placeholder");
  element.classList.add("gone")

});

//  Function to complete
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Removing a toDo
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
  if (LIST && LIST.length) {

  } else {
    var element1 = document.getElementById("placeholder");
    element1.classList.remove("gone");
  }
}


// Targeting the right sections
list.addEventListener("click", function (event) {
  const element = event.target; // Return the clicked element inside the list
  const elementJob = element.attributes.job.value; // either 'complete' or 'delete'

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
  // add to storage (This code must be put everywhere the array 'LIST' is update)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});