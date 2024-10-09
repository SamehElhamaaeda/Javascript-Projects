let allSpan = document.querySelectorAll(".buttons span");
let theInput = document.getElementById("Theinput");
let results = document.querySelector(".results > span");

allSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.classList.contains("check-item")) {
      checkItem();
    }
    if (e.target.classList.contains("add-item")) {
      addItem();
    }
    if (e.target.classList.contains("delete-item")) {
      deleteItem();
    }
    if (e.target.classList.contains("show-item")) {
      showItems();
    }
  });
});
function ShowDefaultMessage() {
  results.innerHTML = "Input Can't Be Empty";
}
function checkItem() {
  if (theInput.value !== "") {
    if (localStorage.getItem(theInput.value)) {
      results.innerHTML = `Found Local Storage Item Called <span>${theInput.value}</span>`;
    } else {
      results.innerHTML = `No Local Storage Item With The Name<span>${theInput.value}</span>`;
    }
  } else {
    ShowDefaultMessage();
  }
}
function addItem() {
  if (theInput.value !== "") {
    localStorage.setItem(theInput.value, "test");
    results.innerHTML = `Local Storage Item Called <span>${theInput.value}</span> is added Successfully`;
    theInput.value = "";
  } else {
    ShowDefaultMessage();
  }
}
function deleteItem() {
  if (theInput.value !== "") {
    if (localStorage.getItem(theInput.value)) {
      localStorage.removeItem(theInput.value);
      results.innerHTML = `Local Storage Item Called <span>${theInput.value}</span> is deleted Successfully`;
      theInput.value = "";
    } else {
      results.innerHTML = `No Local Storage Item Called <span>${theInput.value}</span> To delete`;
    }
  } else {
    ShowDefaultMessage();
  }
}
function showItems() {
  if (localStorage.length) {
    results.innerHTML = "";
    for (let [k, v] of Object.entries(localStorage)) {
      let s = document.createElement("span");
      let text = document.createTextNode(`${k}`);
      s.appendChild(text);
      results.appendChild(s);
    }
    localStorage.forEach((e) => {});
  } else {
    results.innerHTML = "Local Storage Is Empty";
  }
}
