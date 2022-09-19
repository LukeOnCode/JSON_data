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
        'title': 'BitCoin Currency'
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
    myURL(urls[0]);
})

urls.forEach((ele) => {
    const btn1 = document.createElement('button');
    btn1.classList.add('btn');
    h1.append(btn1);
    btn1.textContent = ele.title;
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
        output.innerHTML = url + '<br>';
        maker(json, myObj.arr);
    })
}

function maker(arr, category) {
    let input_value = inputVal.value;
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
        }

        if(!input_value){
            div.innerHTML = 'Properties : ' + entries.length;
            for (const obj of entries) {
                div.innerHTML += `<br> ${obj[0]} : ${obj[1]}`;
                if(obj[0] === 'platform' && obj[1] !== null){
                    console.log(obj[1]);
                }
                 /*   if(obj[1] != null && obj[1].hasOwnProperty('platform')){
                        var nested_obj = obj[1].platform;
                        console.log(nested_obj)
                        div.innerHTML += `<br> ${nested_obj} : `
                        for(const very of nested_obj){
                            console.log(very[0] + very[1])
                        }
                        console.log(nested_obj)
                        //div.innerHTML += `<br> ${nested_obj} : `
                    } */    
            }            
        }
    });
}