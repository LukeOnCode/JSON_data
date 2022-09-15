const url = 'http://api.wikimapia.org/?key=example&function=place.getnearest&format=json';
const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
const inputVal = document.querySelector('.val');
const inputVal2 = document.querySelector('.val2');
const h1 = document.querySelector('h1');

btn.textContent = 'Search Map Lon Lat';
btn.addEventListener('click',(e)=>{
    let lon = inputVal2.value;
    let lat = inputVal.value;
    let tempURL = `${url}&lat=${lat}&lon=${lon}`;
    console.log(tempURL);
    fetch(tempURL)
    .then( (res) => res.json())
    .then( (data) => {
        console.log(data);
        output.innerHTML = '';
        maker(data.places);
    })
    .catch((err)=>{
        console.log(err);
    })
})

function maker(data){
    data.forEach(el => {
        console.log(el);
        const div = document.createElement('div');
        div.classList.add('box');
        div.innerHTML = `<div>Title ${el.title}<br>${el.urlhtml}</div>`;
        output.append(div);
    });
}