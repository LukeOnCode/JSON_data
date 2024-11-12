const btn = document.querySelector(".btn");
const h1 = document.querySelector("h1");
const output = document.querySelector(".output");
const inputVal = document.querySelector(".val");
const url1 = "https://api.chucknorris.io/jokes/";
btn.textContent = "Search";
buildCats();
btn.addEventListener("click", (e) => {
  console.log("ready");
  const val1 = inputVal.value || "test";
  const tempURL = url1 + "search?query=" + val1;
  getJokes(tempURL, val1);
});
function buildCats() {
  const urlTemp = url1 + "categories";
  console.log(urlTemp);
  fetch(urlTemp)
    .then((rep) => rep.json())
    .then((data) => {
      console.log(data);
      h1.innerHTML = "";
      data.forEach((cat) => {
        const btnTemp = document.createElement("button");
        btnTemp.classList.add("btns");
        btnTemp.textContent = cat;
        h1.append(btnTemp);
        btnTemp.addEventListener("click", (e) => {
          //https://api.chucknorris.io/jokes/random?category={category}
          console.log(cat);
          const tempURL = url1 + "random?category=" + cat;
          fetch(tempURL)
            .then((rep) => rep.json())
            .then((json) => {
              output.innerHTML = "Category : " + cat + "<hr>";
              addJoke(json.value);
            });
        });
      });
    });
}
function getJokes(url, searchTerm) {
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      output.innerHTML = `${searchTerm} found ${data.total}`;
      console.log(data);
      data.result.forEach((joke) => {
        console.log(joke);
        addJoke(joke.value);
      });
    });
}
function getJoke(url) {
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      output.innerHTML = "";
      addJoke(data.value);
    });
}
function addJoke(val) {
  output.innerHTML += val + "<br>";
}
