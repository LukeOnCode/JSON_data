//const urlLon = `http://api.wikimapia.org/?key=${chiave}&function=place.getnearest&format=json`;
//const urlId = `http://api.wikimapia.org/?key=${key}&function=place.getbyid&format=json`;

const btnLonLat = document.querySelector('.btn-lonlat');
const btnId = document.querySelector('.btn-id');
const output = document.querySelector('.output');
const inputLon = document.querySelector('.lon');
const inputLat = document.querySelector('.lat');
const inputId = document.querySelector('.id');
const h1 = document.querySelector('h1');

btnLonLat.textContent = 'Search place';
btnId.textContent = 'Search by id';

btnLonLat.addEventListener('click', e => {
    let lon = inputLon.value;
    let lat = inputLat.value;
    fetch('http://localhost:5000/KEY')
    .then((res) => res.json())
    .then((data) => { 
        fetch(`http://api.wikimapia.org/?key=${data.key}&function=place.getnearest&format=json&lat=${lat}&lon=${lon}`)
        .then((res) => res.json())
        .then((data) => { console.log(data); maker(data.places);})
        .catch((err) => {
            console.log(err + " wikimap err");
        })
    }).catch((err) => console.log(err + " localhost err"))
})

btnId.addEventListener('click', e => {
    fetch('http://localhost:5000/KEY')
    .then((res) => res.json())
    .then((data) => { 
        fetch(`http://api.wikimapia.org/?key=${data.key}&function=place.getbyid&format=json&id=${51}`)
        .then((res) => res.json())
        .then((data) => { console.log(data); loopObject(data);})
        .catch((err) => {
            console.log(err + " wikimap err");
        })
    }).catch((err) => console.log(err + " localhost err"))
})

const maker =  data => {
    console.log(Object.keys(data))
    const createDivElem = (output, el) => {
    
    //Parent
    let parentDiv = document.createElement('div');
    parentDiv.classList.add('parent-list');
    
    //TITLE COMPONENT
    let titleComponent = document.createElement('div');
    titleComponent.classList.add('component');

    let titleElem = document.createElement('h2');
    let titleText = document.createTextNode('Title:');
    titleElem.prepend(titleText);
    titleComponent.prepend(titleElem);

    let divTitle = document.createElement('div');
    let divTitleText = document.createTextNode(`${el.title}`);
    divTitle.classList.add('title','content');
    divTitle.appendChild(divTitleText);
    titleComponent.appendChild(divTitle);   

    //URL COMPONENT
    let urlComponent = document.createElement('div');
    urlComponent.classList.add('component');

    urlElem = document.createElement('h2');
    let urlText = document.createTextNode('Coordinates:');
    urlElem.prepend(urlText);
    urlComponent.prepend(urlElem);

    let divUrl = document.createElement('div');
    divUrl.classList.add('url','content');
    let divUrlText = document.createTextNode(`${el.url}`);
    divUrl.appendChild(divUrlText);
    urlComponent.appendChild(divUrl);
    

    output.appendChild(parentDiv);
    parentDiv.appendChild(titleComponent);
    parentDiv.appendChild(urlComponent);
    }
    
    data.forEach(element => {
        createDivElem(output, element);
    });
}

const loopObject = data => {
    console.log(data)
    const div = document.createElement('div');
    div.classList.add('box');
    div.innerHTML = `<div>Title ${data.title}<br>${data.wikipedia}</div>`;
    output.append(div);
}