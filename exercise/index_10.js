const btn1 = document.querySelector(".btn");
const h1 = document.querySelector("h1");
h1.textContent = "Stackexchange API tester";
const output1 = makeNode(document.body, "div", "");
output1.classList.add("output1");
const output = document.querySelector(".output");
const inputVal = document.querySelector(".val");
inputVal.value = "javascript";
output1.append(h1);
output1.append(inputVal);
output1.append(btn1);
output1.append(output);
const baseURL = "https://api.stackexchange.com/";
window.addEventListener("DOMContentLoaded", (e) => {
  //console.log('DOM ready');
  pageLoad();
});
btn1.addEventListener("click", (e) => {
  //console.log('Click ready');
  const searchTerm = inputVal.value;
  const url =
    baseURL +
    `2.2/search?order=desc&sort=activity&intitle=${searchTerm}&site=stackoverflow`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      outputItems(data.items);
    });
  ///2.2/search?order=desc&sort=activity&intitle=javascript&site=stackoverflow
});
function pageLoad() {
  const url =
    baseURL + "2.2/questions?order=desc&sort=activity&site=stackoverflow";
  //console.log(url);
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      outputItems(data.items);
    })
    .catch((err) => {
      //console.log(err);
    });
}
function outputItems(data) {
  ////console.log(data);
  output.innerHTML = "";
  data.forEach((item) => {
    outputPage(item);
  });
}
function outputPage(data) {
  //console.log(data);
  const main = makeNode(output, "div", "");
  main.classList.add("box");
  const ele = makeNode(main, "div", data.title);
  ele.classList.add("topTitle");
  const ansCount = makeNode(main, "div", `Answers ${data.answer_count}`);
  ansCount.classList.add("ans");
  ele.qid = data.question_id;
  const quesID = makeNode(main, "div", `QID ${ele.qid}`);
  if (data.question_id) {
    main.addEventListener("click", (e) => {
      getByID(data.question_id);
    });
  } else {
    main.style.backgroundColor = "#ddd";
  }
  data.tags.forEach((tag) => {
    const span = makeNode(main, "span", tag);
    span.classList.add("tag");
  });
  //console.log(ele);
}
function makeNode(parent, typeEle, html) {
  const element = document.createElement(typeEle);
  element.innerHTML = html;
  return parent.appendChild(element);
}
function getByID(qid) {
  if (qid) {
    const url1 =
      baseURL +
      "2.2/questions/" +
      qid +
      "?order=desc&sort=activity&site=stackoverflow";
    const url2 =
      baseURL +
      "2.2/questions/" +
      qid +
      "/answers?order=desc&sort=activity&site=stackoverflow";
    let itemInfo = {};
    fetch(url1)
      .then((rep) => rep.json())
      .then((data) => {
        itemInfo = data;
        return fetch(url2);
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(itemInfo.items[0]);
        console.log(data.items);
        buildPageData(itemInfo.items[0], data.items);
      })
      .catch((err) => {
        //console.log(err);
      });
    ////2.2/questions/55986738/answers?order=desc&sort=activity&site=stackoverflow
  } else {
    console.log("No ID");
  }
}
function buildPageData(que, ans) {
  console.log(que);
  console.log(ans);
  output.innerHTML = "";
  const title = makeNode(output, "div", `<h2>${que.title}</h2>`);
  const qid = makeNode(
    output,
    "div",
    `<div>Question ID : ${que.question_id}</div>`
  );
  const link = makeNode(output, "a", `${que.link}`);
  link.setAttribute("href", que.link);
  link.setAttribute("target", "_blank");
  const total = makeNode(
    output,
    "div",
    `<div>Answers : ${que.answer_count}</div>`
  );
  const answerDiv = makeNode(output, "div", "");
  answerDiv.classList.add("info");
  ans.forEach((answer, index) => {
    console.log(answer);
    const rating = answer.owner.accept_rate || "-";
    const html = `
<hr>
Answer # ${index + 1}<br>
Answer ID ${answer.answer_id}<br>
Owner : ${answer.owner.display_name} (${rating})
`;
    const div1 = makeNode(answerDiv, "div", html);
  });
}
