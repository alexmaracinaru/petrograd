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
  createCategories(categories);
  fetchProducts();
}

/*function createNavigation(navItems) {
}*/

function createCategories(categories) {
  console.log(categories);
  const main = document.querySelector("main");
  categories.forEach((categoryName) => {
    const h2 = document.createElement("h2");
    console.dir(h2);
    h2.textContent = categoryName;
    main.appendChild(h2);
    const div = document.createElement("div");
    div.id = categoryName;
    div.classList.add("productlist", categoryName + "-data");
    main.appendChild(div);
  });
}

//fetching data
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

  //console.dir(document.querySelector("#courseTemplate"));
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

  if (course.discount) {
    const multiplier = 1 - course.discount / 100;
    copy.querySelector(".price").textContent =
      Math.floor(course.price * multiplier) + ",-";
    copy.querySelector(".discount").textContent = course.discount + "%";
  } else {
    copy.querySelector(".discount_icon").classList.add("hidden");
    copy.querySelector(".price").textContent = course.price + ",-";
  }

  copy.querySelector("button").addEventListener("click", () => {
    fetch(`https://kea-alt-del.dk/t5/api/product?id=${course.id}`)
      .then((res) => res.json())
      .then(showDetails);
  });
  //Selects whatever has the class of "starter, main,etc" -data and appends our "copy" from above.
  document.querySelector("." + course.category + "-data").appendChild(copy);
  console.log("." + course.category + "-data");
}

function showDetails(course) {
  const modal = document.querySelector(".modal_bg");
  console.log(course);
  modal.querySelector(".modal_image").src =
    "https://kea-alt-del.dk/t5/site/imgs/large/" + course.image + ".jpg";
  modal.querySelector(".modal_heading").textContent = course.name;
  modal.querySelector(".long_desc").textContent = course.longdescription;
  modal.querySelector(".veg_icon").classList.add("hidden");
  modal.querySelector(".meat").classList.add("hidden");
  modal.classList.remove("hide");
  modal.addEventListener("click", () => {
    modal.classList.add("hide");
  });
  if (course.vegetarian) {
    modal.querySelector(".veg_icon").classList.remove("hidden");
  } else {
    modal.querySelector(".meat").classList.remove("hidden");
  }
  if (course.allergens.length > 0) {
    modal.querySelector(".allergens").textContent = course.allergens;
  } else {
    modal.querySelector(".allergens").textContent = "None";
  }
  modal.querySelector(".region").textContent = course.region;
  if (course.price) {
    const multiplier = 1 - course.discount / 100;
    modal.querySelector(".details_price").textContent =
      Math.floor(course.price * multiplier) + ",-";
  } else {
    modal.querySelector(".details_price").textContent = course.price + ",-";
  }
}
