const btn1 = document.querySelector(".btn");
const h1 = document.querySelector("h1");
const output = document.querySelector(".output");
const inputVal = document.querySelector(".val");
inputVal.style.display = "none";
btn1.style.display = "none";
const mainURL = "http://swapi.dev/api/";
let endPoint = "";
let endTitle = "";
window.addEventListener("DOMContentLoaded", (e) => {
  //console.log('DOM ready');
  fetch(mainURL)
    .then((rep) => {
      return rep.json();
    })
    .then((json) => {
      //console.log(json);
      h1.innerHTML = "";
      for (const prop in json) {
        //console.log(`${prop} : ${json[prop]}`);
        const btn = document.createElement("button");
        btn.classList.add("btnz");
        btn.textContent = prop;
        endTitle = prop;
        h1.append(btn);
        btn.urlz = json[prop];
        btn.addEventListener("click", getData);
      }
    });
});
btn1.addEventListener("click", (e) => {
  console.log("ready");
});
function getData(e) {
  //console.log(e.target);
  const el = e.target;
  getJSON(el.urlz);
}
function getJSON(url) {
  endPoint = url;
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      console.log(data);
      buildPage(data);
    });
}
function buildPage(data) {
  console.log(data);
  output.innerHTML = `<h1 class="myTitle">${endTitle}</h1><small>${endPoint}</small>`;
  data.results.forEach((el) => {
    const div = document.createElement("div");
    div.textContent = el.name || el.title;
    div.classList.add("box");
    div.urlz = el.url;
    div.addEventListener("click", showItem);
    output.append(div);
    console.log(el.name);
  });
  const pages = document.createElement("div");
  pages.classList.add("pages");
  output.append(pages);
  if (data.previous) {
    const btn2 = document.createElement("button");
    btn2.textContent = "Previous";
    pages.append(btn2);
    btn2.urlz = data.previous;
    btn2.addEventListener("click", (e) => {
      console.log(data.previous);
      getJSON(data.previous);
    });
  }
  const total = Math.ceil(data.count / 10);
  for (let i = 0; i < total; i++) {
    const btn2 = document.createElement("button");
    btn2.textContent = i + 1;
    pages.append(btn2);
    let cleanURL = endPoint.split("?");
    console.log(cleanURL);
    let tempURL = cleanURL[0] + "?page=" + (i + 1);
    btn2.urlz = tempURL;
    btn2.addEventListener("click", (e) => {
      console.log(tempURL);
      getJSON(tempURL);
    });
  }
  if (data.next) {
    const btn2 = document.createElement("button");
    btn2.textContent = "Next";
    pages.append(btn2);
    btn2.urlz = data.next;
    btn2.addEventListener("click", (e) => {
      console.log(data.next);
      getJSON(data.next);
    });
  }
}
function showItem(e) {
  const el = e.target;
  console.log(el.urlz);
  output.innerHTML = "";
  fetch(el.urlz)
    .then((rep) => rep.json())
    .then((data) => {
      //console.log(data);
      for (const prop in data) {
        console.log(`${prop}: ${data[prop]}`);
        let html =
          typeof data[prop] == "string"
            ? data[prop]
            : JSON.stringify(data[prop]);
        let propTemp = prop.replace("_", " ");
        output.innerHTML += `<div><span class="bigText">${propTemp}</span>: ${html}</div>`;
      }
    })
    .catch((err) => {
      console.log(err);
      output.innerHTML = "ERROR";
    });
}
