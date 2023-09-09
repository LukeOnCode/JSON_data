const url = 'http://localhost:5000/api/exercise_1';

const buttonGet = document.querySelector('.btn-get');
const output = document.querySelector('.output');

let attemptCounter = false;
buttonGet.textContent = 'Get users';


buttonGet.addEventListener('click', e => {
    e.preventDefault();
    if(buttonGet.classList.contains('active')){
        removejson();
    }else{
        getData(url);
    }
})

const getData =  urlPath => {
    fetch(urlPath)
    .then( res => {
        return res.json()
    })
    .then( ( res ) => {
        maker(res);
    })
    .catch( err => {
        if( !attemptCounter ){
            console.log('getData( urlPath );');
        }
    attemptCounter = true;
    console.log(err);
    })
}

const maker = data => {
    const createDivElem = (output, el, index) => {

        //parent
        let parentDiv = document.createElement('div');
        parentDiv.classList.add('parent-list');


        //name
        let nameComponent = document.createElement('div');
        nameComponent.classList.add('component')
        
        let nameElem = document.createElement('h2');
        let nameText = document.createTextNode('Name:')
        nameElem.prepend(nameText);
        nameComponent.prepend(nameElem);

        let divOfName = document.createElement('div')
        let divTextName = document.createTextNode(`${el.name.first } ${el.name.last}`);
        divOfName.classList.add('name','content');
        divOfName.appendChild(divTextName);
        nameComponent.appendChild(divOfName);

        //city
        let cityComponent = document.createElement('div');
        cityComponent.classList.add('component');

        let cityElem = document.createElement('h2');
        let cityText = document.createTextNode('City:');
        cityElem.prepend(cityText); 
        cityComponent.append(cityElem);

        let divOfCity = document.createElement('div')
        let divTextCity = document.createTextNode(`${el.location.city} ${el.location.country}`);
        divOfCity.classList.add('city','content');
        divOfCity.appendChild(divTextCity);        
        cityComponent.appendChild(divOfCity);

        //age
        let ageComponent = document.createElement('div')
        ageComponent.classList.add('component');

        let ageElem = document.createElement('h2');
        let ageText = document.createTextNode('Age:');
        ageElem.prepend(ageText);
        ageComponent.prepend(ageElem);

        let divOfAge = document.createElement('div')
        let divTextAge = document.createTextNode(`${el.age }`);
        divOfAge.classList.add('name','content');
        divOfAge.appendChild(divTextAge);
        ageComponent.appendChild(divOfAge);

        output.appendChild(parentDiv);
        parentDiv.appendChild(nameComponent);
        parentDiv.appendChild(cityComponent);
        parentDiv.appendChild(ageComponent );

    }

    output.textContent = 'Active Users';
    buttonGet.textContent = 'Remove user'
    buttonGet.classList.add('active');

    data.forEach(( el, index ) => {
        createDivElem(output, el, index);
    });
}

const removejson = () => {
    if(buttonGet.classList.contains('active')){
        buttonGet.classList.remove('active');
        buttonGet.textContent='Get user';
        output.innerHTML= '';
    }
}