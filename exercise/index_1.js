const url = 'http://localhost:5000/api/exercise_1';

const buttonGet = document.querySelector('.btn-get');
const output = document.querySelector('.output');
const inputVal = document.querySelector('.val');

let attemptCounter = false;
inputVal.style.display = 'none';
buttonGet.textContent = 'Load JSON data';

buttonGet.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(e)
    if(buttonGet.classList.contains('active')){
        removejson();
    }else{
        getData(url);
    }
})

const getData =  urlPath => {
    fetch( urlPath )
    .then( rep => {
        return rep.json()
    })
    .then( ( json ) => {
        maker(json);
    })
    .catch( err => {
        if( !attemptCounter ){
            console.log('getData( localUrl );');
        }
    attemptCounter = true;
    console.log(err);
    })
}

const maker = data => {
    const createDivElem = (output, el) => {
        //parent
        let parentDiv = document.createElement('div');
        parentDiv.classList.add('parent-list');


        //name
        let divOfName = document.createElement('div')
        let divTextName = document.createTextNode(`${el.name.first } ${el.name.last}`);
        divOfName.classList.add('name','content');
        divOfName.appendChild(divTextName);

        //city
        let divOfCity = document.createElement('div')
        let divTextCity = document.createTextNode(`${el.location.city} ${el.location.country}`);
        divOfCity.classList.add('city','content');
        divOfCity.appendChild(divTextCity);

        //age
        let divOfAge = document.createElement('div')
        let divTextAge = document.createTextNode(`${el.age }`);
        divOfAge.classList.add('name','content');
        divOfAge.appendChild(divTextAge);
        
        parentDiv.prepend(divOfName, divOfCity, divOfAge)
        output.prepend(parentDiv);
    }

    //output.innerHTML = '<h1>JSON Data</h1>';
    buttonGet.textContent = 'Remove JSON data'
    buttonGet.classList.add('active');

    data.forEach(( el, index ) => {
        createDivElem(output, el);
    });
}

const removejson = () => {
    if(buttonGet.classList.contains('active')){
        buttonGet.classList.remove('active');
        buttonGet.textContent='Load JSON data';
        output.innerHTML= '';
    }
}