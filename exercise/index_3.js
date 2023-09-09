const key= '4104FC03-916F936F-D009592C-6D588948-68EBFF38-74350974-BD66C62A-AD0C275';
const urlLon = `http://api.wikimapia.org/?key=${key}&function=place.getnearest&format=json`;
const urlId = `http://api.wikimapia.org/?key=${key}&function=place.getbyid&format=json`;

const btnLon = document.querySelector('.btn-lonlat');
const btnId = document.querySelector('.btn-id');
const output = document.querySelector('.output');
const inputVal = document.querySelector('.val');
const inputVal2 = document.querySelector('.val2');
const h1 = document.querySelector('h1');

btnLon.textContent = 'Search Map Lon Lat';
btnId.textContent = 'Search by id';

btnLon.addEventListener('click',(e)=>{
    let lon = inputVal2.value;
    let lat = inputVal.value;
    let tempURL = `${urlLon}&lat=${lat}&lon=${lon}`;
    console.log(tempURL);
    fetch(tempURL)
    .then( (res) => res.json())
    .then( (data) => {
        console.log(data);
        output.innerHTML = '';
        loopArray(data.places);
    })
    .catch((err)=>{
        console.log(err);
    })
})

btnId.addEventListener('click',(e)=>{

    let tempURL = `${urlId}&id=${51}`;
    console.log(tempURL);
    fetch(tempURL)
    .then( (res) => res.json())
    .then( (data) => {
        console.log(data);
        output.innerHTML = '';
        loopObject(data)
    })
    .catch((err)=>{
        console.log(err);
    })
})

const loopArray = data => {
    console.log(data)
    data.forEach(el => {
        console.log(el);
        const div = document.createElement('div');
        div.classList.add('box');
        div.innerHTML = `<div>Title ${el.title}<br>${el.url}</div>`;
        output.append(div);
    });
}

const loopObject = data => {
    console.log(data)
    const div = document.createElement('div');
    div.classList.add('box');
    div.innerHTML = `<div>Title ${data.title}<br>${data.wikipedia}</div>`;
    output.append(div);
}