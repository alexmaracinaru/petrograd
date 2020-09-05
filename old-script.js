//fetch data
fetch("https://kea-alt-del.dk/t5/api/productlist")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    data.forEach(showOneCourse);
  });

function showOneCourse(course) {
  const templateContent = document.querySelector("#courseTemplate").content;
  const copy = templateContent.cloneNode(true);

  //just seeing it in the console
  console.log(course.discount);
  console.log(course);

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
  document.querySelector("." + course.category + "-data").appendChild(copy);
}
