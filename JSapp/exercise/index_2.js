const url ='https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&origin=*&srsearch=';
const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
const inputVal = document.querySelector('.val');
let attemptCounter = false;
btn.style.backgroundColor = '#eee'
btn.textContent = 'Load JSON data';

btn.addEventListener('click',(e) => {
    let searchTerm = inputVal.value;
    inputVal.value.length !== 0 ? inputVal.style.backgroundColor='#99dc99' : inputVal.style.backgroundColor='#d75151';
    let tempURL = url + searchTerm;

    if(searchTerm.length === 0){
        output.innerHTML += `<div class="alert alert-danger" riole="alert">Your seacrch term is empty: "${searchTerm}"</div>` 
    }else if(btn.classList.contains('active')){
        removejson();
    }else{
        btn.classList.add('active');
        btn.textContent= 'Remove JSON';
        fetch(tempURL)
        .then( ( rep ) => {
             return rep.json()
            }
        )
        .then( ( data ) => {
            console.log(data);
            output.innerHTML =`<div class="alert alert-success" role="alert">Your search is succesfull for word: "${searchTerm}"</div>`
            output.innerHTML += '<div>Results for ' + searchTerm + '</div>';
            output.innerHTML += `Total Results : ${data.query.searchinfo.totalhits}<br>`;
            maker(data.query.search);
        })
    }
})

function maker(data){
    console.log(data);
    data.forEach(el=> {
        console.log(el);
        const div = document.createElement('div');
        div.innerHTML += `<h3><a href="https://en.wikipedia.org/wiki?curid=${el.pageid}"target="_blank">${el.title}</a></h3>`;
        div.innerHTML += `<div>Page ID ${el.pageid} | Size ${el.size} | WordCount ${el.wordcount}</div>`;
        div.classList.add('box');
        div.innerHTML += el.snippet;
        output.append(div);
    });
}

function removejson(){
    if(btn.classList.contains('active')){
        output.innerHTML='';
        btn.classList.remove('active');
        btn.textContent='Load JSON data';
        inputVal.value ='';
        inputVal.style.backgroundColor = '#fff'
    }
}
