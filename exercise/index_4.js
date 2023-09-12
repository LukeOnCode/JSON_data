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
const btnFriend = document.querySelector('.btn-people');
const btnCrypto = document.querySelector('.btn-crypto');
const btnSearch = document.querySelector('.btn-search');

let searchAll;
//fragment
const fragment = document.createDocumentFragment();

btnBook.addEventListener('click', e =>{
    e.preventDefault();
    e.target.classList.toggle('requested');
})
btnFriend.addEventListener('click', e =>{
    e.preventDefault();
    e.target.classList.toggle('requested');
})
btnCrypto.addEventListener('click', e =>{
    e.preventDefault();
    e.target.classList.toggle('requested');
})

const noKeywordQuery = (keyword, queryAll) => {
    if(keyword.length === 0 && queryAll){
        urls.forEach(el => searchUrl(el.url, el.arr, keyword) )
    }
}

btnSearch.addEventListener('click', e => {
    let keyword = searchWord.value;
    searchAll = true;
    e.preventDefault();
    [btnBook, btnCrypto, btnFriend].map((el) => {
        if(el.className.includes('requested')){
            let requestedUrl = el.id;
            let iterator = urls.values();
            for (const value of iterator) {
                if (value.arr == requestedUrl){
                    searchAll = false;
                    searchUrl(value.url, value.arr, keyword);
                }
            }
        }
    })
    noKeywordQuery(keyword, searchAll);
});


//TODO PASS WRIGHT ELEMENT FOR MULTI OR SINGLE ELEMENTS element.arr 
const searchUrl = (objectUrl, requestedUrl, value) => {
    fetch(objectUrl)
    .then(res => res.json())
    .then(data => {
        const finalData = data[Number(Object.keys(data))]
        const searchedValue = value;
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
    data[objectName].forEach(object => {

        const createChild = element => {

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
                    console.log('NOPE')
                    break;
            }
        }
            if(value.length === 0){
                createChild(object)
            }
            let counter = 0;        
            Object.values(object).forEach(el => {
                if(typeof el == "string" && el.toLowerCase() === value ){ 
                    counter++;
                    counter <= 1 ? createChild(object) : counter = 0;
                }
            })
    })

output.appendChild(fragment);
}