const btn = document.querySelector('.btn');
const h1 = document.querySelector('h1');
const output = document.querySelector('.output');
const inputVal = document.querySelector('.val');
const url = 'https://randomuser.me/api';

inputVal.setAttribute('type','number');
inputVal.value = 5;
btn.textContent = 'Click Me';

btn.addEventListener('click', (e) => {
    console.log('ready');
    let val = `?results=${inputVal.value}`;
    let search_url = url+val; 
    adder(search_url);
})

function adder(url){
    console.log(url);
    fetch(url)
    .then(rep => rep.json())
    .then((data) => {
        console.log(data);
        output.innerHTML = `
        <h3>
            Seed : ${data.info.seed}<br>
            Results: ${data.info.results}
        </h3>
        `
        maker(data.results);
    })
    .catch(err => console.log(err))
}

function maker(data){
    console.log(data);
    data.forEach(element => {
        console.log(element);
        const content = `
            ${element.name.title}
            ${element.name.first}
            ${element.name.last}
            ${element.email}
        `;
        const content_1 = `<img src='${element.picture.large}'/>`;
        eleMaker('div',output,content);
        eleMaker('div',output,content_1);
    });
}

function eleMaker(tag, parent, content){
    const elem = document.createElement(tag);
    parent.append(elem);
    elem.innerHTML = content;
}