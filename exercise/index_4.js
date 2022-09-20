const btn = document.querySelector('.btn');
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

const h1 = document.querySelector('h1');
h1.innerHTML = '';
const output = document.querySelector('.output');
const inputVal = document.querySelector('.val');
inputVal.value = '';
btn.textContent = 'Search by term';

btn.addEventListener('click', (e) => {
    e.preventDefault();
    urls.forEach(item => {myURL(item)})
    //myURL(urls);
})

urls.forEach((ele) => {
    const btn1 = document.createElement('button');
    btn1.classList.add('btn');
    h1.append(btn1);
    btn1.textContent = ele.title;
    console.log(ele.title)
    console.log(ele);
    btn1.addEventListener('click', (e) => {
        myURL(ele);
    })
})

function myURL(myObj) {
    let url = myObj.url;
    fetch(url)
    .then(rep => rep.json())
    .then( (data) => {
        const json = data[0];
        output.innerHTML = url + myObj.arr + '<br>';
        maker(json, myObj.arr);
    })
}

function maker(arr, category) {
    let input_value = inputVal.value;
    console.log(arr, category);
    arr[category].forEach(el => {
        console.log(el);
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
        }else{
            console.log('Not found');
        }
        /*else{
            div.innerHTML = 'Properties : ' + entries.length;
            for(const obj of Object.keys(el)){
                const prop = el[obj];
                if(prop){
                    if(obj === 'platform'){
                        div.innerHTML += `<br>${obj} : ${prop.name}`
                        return;
                    } 
                    div.innerHTML += `<br> ${obj} : ${prop}`;    
                }
            }
            return;
        } */
/*
        for( const obj of Object.keys(el) ){
            const prop = el[obj];
            
            if(prop && prop.length === 0){
                if(obj === 'platform'){
                    div.innerHTML += `<br>${obj} : ${prop.name}`
                    return;
                } 
                div.innerHTML += `<br> ${obj} : ${prop}`;

            }else if(prop && prop.includes(input_value)){
                div.innerHTML += `<br> ${obj} : ${prop}`
                return;
            }else {
                return;
            }
        } */
    });
}