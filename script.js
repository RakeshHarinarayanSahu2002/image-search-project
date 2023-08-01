const accessKey = "vWKQcHyGhLpjMTkdY7Zxu5EaKtOSwQtOolp7bxA7EtU";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResult = document.querySelector(".search-results");

const showmore = document.getElementById("show-more-button");

let inputDAta = "";
let page = 1;

async function searchImages() {
  inputDAta = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputDAta}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = "";
  }
  results.map((result) => {
    const imagewrapper = document.createElement("div");
    imagewrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imagelink = document.createElement("a");
    imagelink.href = result.links.html;
    imagelink.target = "_blank";
    imagelink.textContent = result.alt_description;
    imagewrapper.appendChild(image);
    imagewrapper.appendChild(imagelink);
    searchResult.appendChild(imagewrapper);
  });

  ++page;
  if (page > 1) {
    showmore.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showmore.addEventListener("click", () => {
  searchImages();
});
