// Defining global variables

// To get the secions to iterate over later when creating the nav bar
const sections = document.querySelectorAll("section");

// To get the nav bar list where we're going to add the nav list items and their links
const navMenu = document.getElementById("navbar__list");

// To create a fragment that will be added to the nav menu for a better perofrmance
const newFrag = document.createDocumentFragment();

// Building the nav menu
for (const section of sections) {
  // Creating a new nav list item and it's respective link
  newNavItem = document.createElement("li");

  newNavLink = document.createElement("a");

  // Adding the class to the nav list item's link
  newNavLink.className = "menu__link";

  // Adding the text contained in the data-nav to the created link
  newNavLink.textContent = section.getAttribute("data-nav");

  // Adding the link to it's respective nav list item and dding the nav list item to the created fragment
  newNavItem.appendChild(newNavLink);

  newFrag.appendChild(newNavItem);

  // Smooth scrolling to the section when clicking on the nav list item
  newNavLink.addEventListener("click", function () {
    section.scrollIntoView({
      behavior: "smooth",
    });
  });
}

// Adding the fragment (containing the nav list items with their links) to the nav menu
navMenu.appendChild(newFrag);

// Detecting which sections are active in the viewport using intersectionObserver

// Definfing the options that will be passed into the observer underwhich the callback function will be executed
// I found that setting the threshold to 1 executes the same function as the intersectionRatio==1 property

options = {
  //rootMargin: "0px 0px -100px 0px" , //or just 0.7 for ex
  threshold: 0.8 // not set to 1 to get the site to act normally in mobile view
};
// Defining a callback function that will be executed once the section appears in the viewport
function callback(sections) {
  // To add active class to the section if viewed AS A WHOLE in the viewport and removing the class otherwise
  for (section of sections) {
    if (section.isIntersecting) {
      section.target.classList.add("your-active-class");
    } else {
      section.target.classList.remove("your-active-class");
    }
  }

  // To add active class to the nav list items if their respective section is viewed in the viewport, and removing it otherwise
  for (section of sections) {
    let activeDatanav = section.target.getAttribute("data-nav");

    let navItems = document.querySelectorAll("li"),
      i,
      length;

    for (i = 0, length = navItems.length; i < length; i++) {
      if (navItems[i].innerText == activeDatanav) {
        navItems[i].classList.add("your-active-class");
      } else {
        navItems[i].classList.remove("your-active-class");
      }
    }
  }
}

// Defining the intersectionObserver
const observer = new IntersectionObserver(callback, options);

// Iterating through the sections and passing them to the observe
for (section of sections) {
  observer.observe(section);
}
