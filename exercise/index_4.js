const urls = [
    {
        'url': 'http://localhost:5000/api/exercise_2',
        'arr': 'books',
        'title': 'Books List'
    },
    {
        'url': 'http://localhost:5000/api/exercise_2',
        'arr': 'people',
        'title': 'Friends List'
    },
    {
        'url': 'http://localhost:5000/api/exercise_2',
        'arr': 'crypto',
        'title': 'Crypto Currency'
    }
];

const searchWord= document.querySelector('.search-word');
const output    = document.querySelector('.output');
const btnBook   = document.querySelector('.btn-book');
const btnFriend = document.querySelector('.btn-friend');
const btnCrypto = document.querySelector('.btn-crypto');
const btnSearch = document.querySelector('.btn-search');


const fragment = document.createDocumentFragment();

//[btnBook,btnCrypto,btnFriend].forEach(e => console.log(e.className.includes('btn-crypto')))

btnSearch.addEventListener('click', e => {
    e.preventDefault();
    let values = searchWord.value;
    [btnBook, btnCrypto, btnFriend].map((el) => {
        if( el.className.includes('requested')){
            let requestedUrl = el.id;
            let iterator = urls.values();
            for (const value of iterator) {
                if (value.arr == requestedUrl){
                    searchUrl(value.url, value.arr, values)
                };
            }
        }
    })
});


//TODO PASS WRIGHT ELEMENT FOR MULTI OR SINGLE ELEMENTS element.arr 
const searchUrl = (objectUrl, requestedUrl, value) => {
    // console.log(objectUrl);
    // console.log(requestedUrl);
    // console.log(value);

    fetch(objectUrl)
    .then(res => res.json())
    .then(data => {
        const finalData = data[Number(Object.keys(data))]
        const searchedValue = value;
           console.log(finalData)
        // console.log(requestedUrl)
        // console.log(searchedValue)
        createNode(finalData, requestedUrl, searchedValue);
    }).catch(err => console.log(err));
}

const createNode = (data, objectName, value) => {
    const createParent = (...array) => {
        const parentDiv = document.createElement('div')
        parentDiv.classList.add('parent-list')

        array.forEach(el => {
            parentDiv.append(el);
            fragment.append(parentDiv)
        })
    }    

    //book
    let titleText;
    let authorText;
    let ISBNText;

    //people
    let nameText;
    let lastNameText;
    
    //crypto
    let cryptoNameText;
    let cryptoSymbolText;
    let cryptoDataText;
    console.log(data[objectName])
    data[objectName].forEach(element => {
        //console.log(element)
        const book = element => {
            //book
            const bookTitlecomponent  = document.createElement('div');
            const bookAuthorcomponent = document.createElement('div');
            const bookISBNcomponent   = document.createElement('div');

            titleText  = document.createTextNode(`${element.title }`)
            authorText = document.createTextNode(`${element.author}`)
            ISBNText   = document.createTextNode(`${element.isbn  }`)
            
            //user
            const peopleNamecomponent     = document.createElement('div');
            const peopleLastNamecomponent = document.createElement('div');
            
            nameText = document.createTextNode(`${element.first}`)
            lastNameText = document.createTextNode(`${element.last}`)
           
            //crypto
            const cryptoNameComponent = document.createElement('div');
            const cryptoSymbolComponent = document.createElement('div');
            const cryptoDataComponent = document.createElement('div');
        
            cryptoNameText = document.createTextNode(`${element.name}`);
            cryptoSymbolText = document.createTextNode(`${element.symbol}`);
            cryptoDataText = document.createTextNode(`${element.first_historical_data}`);
        
       
            //add text 
            bookTitlecomponent.appendChild(titleText)
            bookAuthorcomponent.appendChild(authorText)
            bookISBNcomponent.appendChild(ISBNText)
            
            peopleNamecomponent.appendChild(nameText)
            peopleLastNamecomponent.appendChild(lastNameText)

            cryptoNameComponent.appendChild(cryptoNameText)
            cryptoSymbolComponent.appendChild(cryptoSymbolText)
            cryptoDataComponent.appendChild(cryptoDataText)
            
            switch (data[objectName]) {
                case data.books:
                    createParent(bookTitlecomponent, bookAuthorcomponent, bookISBNcomponent)
                    break;
                case data.crypto:
                    createParent(cryptoNameComponent, cryptoSymbolComponent, cryptoDataComponent)
                    break;
                case data.people:
                    createParent(peopleNamecomponent, peopleLastNamecomponent)
                    break;
                default:
                    break;
            }
        }
        book(element);
    })

output.appendChild(fragment)
}

/*
function maker(arr, category) {
    let input_value = searchWord.value;
    console.log(arr[category]);
    arr[category].forEach(el => {
        const div = document.createElement('div');
        let br = document.createElement('br');
        div.classList.add('box');
        output.append(div);
        output.append(br);
        const entries = Object.entries(el);

        if(Object.values(el).includes(input_value)){
            div.innerHTML = 'Properties : ' + entries.length;
            for (const obj of entries) {
                div.innerHTML += `<br> ${obj[0]} : ${obj[1]}`;
            }
            return; 
        }else if(input_value.length === 0){
            for( const obj of Object.keys(el) ){
                const prop = el[obj];
                if(prop){
                    if(obj === 'platform'){
                        div.innerHTML += `<br>${obj} : ${prop.name}`
                        return;
                    } 
                    div.innerHTML += `<br> ${obj} : ${prop}`;
                }
            }
        }else{
            console.log('Not found');
            return;
        }
    });
}
// btn.addEventListener('click', (e) => {
//     e.preventDefault();
//     urls.forEach(item => {myURL(item)})
// })
// urls.forEach((ele) => {
//     const btn1 = document.createElement('button');
//     btn1.classList.add('btn');
//     h1.append(btn1);
//     btn1.textContent = ele.title;
//     btn1.addEventListener('click', (e) => {
//         myURL(ele);
//     })
// })
*/

