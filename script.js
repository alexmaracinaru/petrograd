//Initiating the categories
function init() {
  fetch("https://kea-alt-del.dk/t5/api/categories")
    .then((r) => r.json())
    .then(function (data) {
      categoriesRecieved(data);
    });
}
init();

function categoriesRecieved(categories) {
  //createNavigation(categories);
  createSections(categories);
  fetchProducts();
}

function createNavigation(navItems) {
  console.log(navItems);
}

function createSections(sections) {
  const main = document.querySelector("main");
  sections.forEach((section) => {
    const h2 = document.createElement("h2");
    h2.textContent = section;
    main.appendChild(h2);
    const div = document.createElement("div");
    div.classList.add("productList", section + "-data");
    main.appendChild(div);
  });
}

//fetch data
function fetchProducts() {
  fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.forEach(showOneCourse);
    });
}

function showOneCourse(course) {
  const templateContent = document.querySelector("#courseTemplate").content;
  const copy = templateContent.cloneNode(true);

  //just seeing it in the console
  //console.log(course.discount);
  //console.log(course);

  copy.querySelector(".card_heading").textContent = course.name;
  copy.querySelector(".short_desc").textContent = course.shortdescription;
  copy.querySelector("img").src =
    "https://kea-alt-del.dk/t5/site/imgs/small/" + course.image + "-sm.jpg";
  if (course.vegetarian) {
    copy.querySelector(".card_veg").classList.remove("hidden");
  } else {
    copy.querySelector(".card_meat").classList.remove("hidden");
  }
  if (course.soldout) {
    copy.querySelector(".sold_out").classList.remove("hidden");
  }
  copy.querySelector(".price").textContent = course.price + ",-";

  //Selecting the html element "productlist" and we appended our "copy" from above.
  document.querySelector("." + course.category + "-data").appendChild(copy);
}
