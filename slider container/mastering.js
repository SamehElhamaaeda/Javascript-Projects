//holding images
var sliderImages = Array.from(
  document.querySelectorAll(".slider-container img")
);
var slidesCount = sliderImages.length;
var currentSlide = 1;
//Holding elements
var slideNumberElement = document.getElementById("slide-number");
//Create the main ul element
var paginationUl = document.createElement("ul");
paginationUl.setAttribute("id", "pagination-ul");

for (var i = 1; i <= slidesCount; i++) {
  var paginationItem = document.createElement("li");
  paginationItem.setAttribute("data-index", i);
  paginationItem.appendChild(document.createTextNode(i));
  paginationUl.appendChild(paginationItem);
}
document.getElementById("indicators").appendChild(paginationUl);
var createdPagination = document.getElementById("pagination-ul");

var nextButton = document.getElementById("next");
var prevButton = document.getElementById("prev");
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;
var paginationItems = Array.from(
  document.querySelectorAll("#pagination-ul li")
);
//loop through the pagination items
for (var i = 0; i < slidesCount; i++) {
  paginationItems[i].onclick = function () {
    currentSlide = parseInt(this.getAttribute("data-index"));
    Checker();
  };
}
Checker();

function nextSlide() {
  if (nextButton.classList.contains("disable")) {
    return false;
  } else {
    currentSlide++;
    Checker();
  }
}
function prevSlide() {
  if (prevButton.classList.contains("disable")) {
    return false;
  } else {
    currentSlide--;
    Checker();
  }
}
function Checker() {
  //Remove active class from all
  RemoveActive();
  // setting a value to the slide number element
  slideNumberElement.textContent =
    "Slide # " + currentSlide + " of " + slidesCount;
  //set active class to the currernt image
  sliderImages[currentSlide - 1].classList.add("active");
  //set active class to the pagination items
  createdPagination.children[currentSlide - 1].classList.add("active");
  if (currentSlide == 1) {
    document.getElementById("prev").classList.add("disable");
  } else {
    document.getElementById("prev").classList.remove("disable");
  }
  if (currentSlide == slidesCount) {
    document.getElementById("next").classList.add("disable");
  } else {
    document.getElementById("next").classList.remove("disable");
  }
}
function RemoveActive() {
  sliderImages.forEach(function (img) {
    img.classList.remove("active");
  });
  paginationItems.forEach(function (P) {
    P.classList.remove("active");
  });
}
