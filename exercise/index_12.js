const btn = document.querySelector(".btn");
const h1 = document.querySelector("h1");
const output = document.querySelector(".output");
const inputVal = document.querySelector(".val");
const page = { json: {}, page: 1, per: 10, arr: [] };
const baseurl = "https://restcountries.com/v2/";
btn.textContent = "Search by Name";
h1.textContent = "Search Country Info";
inputVal.value = "united";
btn.addEventListener("click", (e) => {
  console.log("ready");
  const para = "name/" + inputVal.value;
  const url = baseurl + para;
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      loadPages(data);
    });
});
function makeaPage(data) {
  output.innerHTML = "";
  const main = createNode(output, "div", "");
  main.classList.add("info");
  objOutput(data, main);
}
function objOutput(obj, parent) {
  Object.keys(obj).forEach((key) => {
    console.log(key); //object key
    console.log(obj[key]); //value
    console.log(typeof obj[key]); //data type
    let val = obj[key];
    if (typeof val == "object") {
      val = JSON.stringify(val);
    }
    createNode(parent, "div", val);
  });
}
function loadPages(data) {
  output.innerHTML = "";
  console.log(data);
  data.forEach((el) => {
    pageEl(el);
  });
}
function pageEl(data) {
  console.log(data);
  const main = createNode(output, "div", "");
  main.classList.add("box");
  main.addEventListener("click", (e) => {
    makeaPage(data);
  });
  const title = createNode(main, "div", `<h2>${data.name}</h2>`);
  title.style.color = "red";
  const title2 = createNode(main, "div", `${data.nativeName}`);
  createNode(main, "div", `${data.subregion}`);
  const flag = createNode(main, "img", "");
  flag.setAttribute("src", data.flag);
  let html1 = `<div>Population : ${data.population}</div>`;
  html1 += `<div>Currency : ${data.currencies[0].name} ${data.currencies[0].symbol}</div>`;
  const stats = createNode(main, "div", html1);
}
function createNode(parent, elType, html) {
  const ele = document.createElement(elType);
  parent.append(ele);
  ele.innerHTML = html;
  return ele;
}
