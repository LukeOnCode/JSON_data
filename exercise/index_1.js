console.log('this is a log');
const url = 'http://localhost:5000/api/exercise_1';

const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
const inputVal = document.querySelector('.val');

let attemptCounter = false;
inputVal.style.display = 'none';
btn.style.backgroundColor = '#eee'
btn.textContent = 'Load JSON data';

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(e)
    if(btn.classList.contains('active')){
        removejson();
    }else{
        getData(url);
    }
})

function getData( urlPath ) {
    fetch( urlPath )
    .then( rep => {
        return rep.json()
    })
    .then( ( json ) => {
        maker(json);
    })
    .catch( err => {
        if( !attemptCounter ){
            getData( localUrl );
        }
    attemptCounter = true;
    console.log(err);
    })
}

function maker(data){
    output.innerHTML = '<h1>JSON Data</h1>';
    btn.textContent = 'Remove JSON data'
    btn.classList.add('active');
    
    data.forEach(( el, index ) => {
        const bg = index % 2 == 0 ? '#eee' : '#fff';
        const div = document.createElement('div');
        div.style.backgroundColor = bg;
        div.innerHTML += `<div>${el.name.first} ${el.name.last}</div>`;
        div.innerHTML += `<div>${el.location.city} ${el.location.country}</div>`;
        div.innerHTML += `<div>${el.age} </div>`;
        output.append(div);
    });
}

function removejson(){
    if(btn.classList.contains('active')){
        output.innerHTML='';
        btn.classList.remove('active');
        btn.textContent='Load JSON data'
    }
}