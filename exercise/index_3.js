//const urlLon = `http://api.wikimapia.org/?key=${chiave}&function=place.getnearest&format=json`;
//const urlId = `http://api.wikimapia.org/?key=${key}&function=place.getbyid&format=json`;

const btnLon = document.querySelector('.btn-lonlat');
const btnId = document.querySelector('.btn-id');
const output = document.querySelector('.output');
const inputVal = document.querySelector('.val');
const inputVal2 = document.querySelector('.val2');
const h1 = document.querySelector('h1');

btnLon.textContent = 'Search Map Lon Lat';
btnId.textContent = 'Search by id';

btnLon.addEventListener('click', e => {
    let lon = inputVal2.value;
    let lat = inputVal.value;
    fetch('http://localhost:5000/KEY')
    .then((res) => res.json())
    .then((data) => { 
        fetch(`http://api.wikimapia.org/?key=${data.key}&function=place.getnearest&format=json&lat=${lat}&lon=${lon}`)
        .then((res) => res.json())
        .then((data) => { console.log(data); output.innerHTML=''; loopArray(data.places);})
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
        .then((data) => { console.log(data); output.innerHTML=''; loopObject(data);})
        .catch((err) => {
            console.log(err + " wikimap err");
        })
    }).catch((err) => console.log(err + " localhost err"))
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