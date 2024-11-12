const url = 'http://localhost:5000/exercise_1';

const buttonGet = document.querySelector('.btn-get');
const buttonUpdate = document.querySelector('.btn-update');
const buttonCreate = document.querySelector('.btn-create');
const buttonRemove = document.querySelector('.btn-remove');
const output = document.querySelector('.output');

let attemptCounter = false;
buttonGet.textContent = 'Get users';

buttonGet.addEventListener('click', e => {
    e.preventDefault()
    handleButtonLogic(getData, makeGetUserSection, e.target, url);
});

buttonUpdate.addEventListener('click', e => {
    e.preventDefault()
    handleButtonLogic(getData, makeUpdateSections, e.target, url)
});

buttonRemove.addEventListener('click', e => {
    e.preventDefault()
    handleButtonLogic(getData, makeRemoveSections, e.target, url)
})

buttonCreate.addEventListener('click', e => {
    e.preventDefault()
    handleButtonLogic(null, makeCreateSection, e.target, url)
})

const makeCreateSection = () => {
    if (outputIsFull(output)) {
        outputRemoveNode(output)
    }

    // Crea un div per contenere il form
    const formSection = document.createElement('div');
    formSection.classList.add('form-container');  // Puoi aggiungere delle classi per lo stile
    
    // Crea il form
    const form = document.createElement('form');
    form.id = 'userForm';

    // Crea e aggiungi il campo "First Name"
    const component_name = document.createElement('div')
    const firstNameLabel = document.createElement('label');
    const firstNameInput = document.createElement('input');
    firstNameInput.type = 'text';
    firstNameInput.name = 'firstName';
    firstNameInput.required = true;
    firstNameInput.placeholder = 'First Name';
    component_name.appendChild(firstNameLabel, firstNameInput)
    component_name.appendChild(firstNameInput)
    form.appendChild(component_name)
    

    // Crea e aggiungi il campo "Last Name"
    const component_last = document.createElement('div')
    const lastNameLabel = document.createElement('label');
    const lastNameInput = document.createElement('input');
    lastNameInput.type = 'text';
    lastNameInput.name = 'lastName';
    lastNameInput.required = true;
    lastNameInput.placeholder = 'Last Name';
    component_last.appendChild(lastNameLabel, lastNameInput)
    component_last.appendChild(lastNameInput)
    form.appendChild(component_last)


    // Crea e aggiungi il campo "Age"
    const component_age = document.createElement('div')
    const ageLabel = document.createElement('label');
    const ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.name = 'age';
    ageInput.required = true;
    ageInput.placeholder = 'Age';
    component_age.appendChild(ageLabel, ageInput)
    component_age.appendChild(ageInput)
    form.appendChild(component_age)

    // Crea e aggiungi il campo "City"
    const component_city = document.createElement('div')
    const cityLabel = document.createElement('label');
    const cityInput = document.createElement('input');
    cityInput.type = 'text';
    cityInput.name = 'city';
    cityInput.required = true;
    cityInput.placeholder = 'City';

    component_city.appendChild(cityLabel, cityInput)
    component_city.appendChild(cityInput)
    form.appendChild(component_city)

    // Crea e aggiungi il campo "Country"
    const component_country = document.createElement('div')
    const countryLabel = document.createElement('label');
    const countryInput = document.createElement('input');
    countryInput.type = 'text';
    countryInput.name = 'country';
    countryInput.required = true;
    countryInput.placeholder = 'Country';
    component_country.appendChild(countryLabel, countryInput)
    component_country.appendChild(countryInput)
    form.appendChild(component_country)

    // Crea il pulsante di submit
    const component_btn = document.createElement('div')
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    component_btn.classList.add('submit')
    component_btn.appendChild(submitButton)
    form.appendChild(component_btn);

    // Aggiungi il form al contenitore
    formSection.appendChild(form);
    output.appendChild(formSection);

    // Gestisci l'invio del form
    form.addEventListener('submit', (event) => {
        event.preventDefault();  // Impedisce il comportamento predefinito (rinfrescare la pagina)

        // Crea l'oggetto con i dati del form
        const userData = {
            name: {
                first: firstNameInput.value,
                last: lastNameInput.value
            },
            age: parseInt(ageInput.value),
            location: {
                city: cityInput.value,
                country: countryInput.value
            },
            id: generateRandomString()
        };

        // Stampa l'oggetto (o invialo a un server, se necessario)
        sendCreateData(userData, url);
    });
};

const generateRandomString = (length = 4) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    
    return result;
}

const makeRemoveSections = data => {
    if (outputIsFull(output)) {
        outputRemoveNode(output)
    }

    data.map(e => {
        return { 
            name: e.name, 
            id: e.id
        }
    }).forEach((elements, index) => {
        const parent_name = createNameSectionComponents(elements.name, index)
        const update_section = updateSectionDelete(elements.id)
        
        // create every component
        const output_child = document.createElement('div')
        output_child.classList.add(`component-${index}`)

        // append to every component
        output_child.append(parent_name, update_section)
        output.append(output_child)
    })

    const updateThisElements = document.querySelectorAll('span.delete')
    updateThisElements.forEach((e) => {
        e.addEventListener('click', (a) => {
            sendRemoveData(a.currentTarget.id, url)
        })
    })
}

const makeUpdateSections = data => {
    if (outputIsFull(output)) {
        outputRemoveNode(output)
    }

    data.map(e => {
        return { 
            name: e.name, 
            id: e.id
        }
    }).forEach((elements, index) => {
        const parent_name = createNameSectionComponents(elements.name, index)
        const update_section = updateSection(elements.id)
        
        // create every component
        const output_child = document.createElement('div')
        output_child.classList.add(`component-${index}`)
        
        // create form
        const form = createForm(elements.id)

        // append to every component
        output_child.append(parent_name, update_section, form)
        output.append(output_child)
    })

    const updateThisElements = document.querySelectorAll('span.update')
    updateThisElements.forEach((e) => {
        e.addEventListener('click', (a) => {
            if(!a.currentTarget.classList.contains('active')){
                a.currentTarget.classList.add('active')
                a.currentTarget.parentNode.parentNode.children[2].classList.add('active')
                a.currentTarget.children[0].style.transform = 'rotate(180deg)';
            } else {
                a.currentTarget.classList.remove('active')
                a.currentTarget.parentNode.parentNode.children[2].classList.remove('active')
                a.currentTarget.children[0].style.transform = 'rotate(0deg)';
            }
        })
    })

    const formsAction = document.querySelectorAll('span.send-update')
    formsAction.forEach((e) => {
        e.addEventListener('click', (a) => {
            const data = {
                first: a.currentTarget.parentNode.name.value, 
                last: a.currentTarget.parentNode.last.value
            }
            sendUpdateData(data, a.currentTarget.parentNode.id, url)
        })
    })

}

const sendRemoveData = (id, req) => {
    fetch(`${req}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const container = document.querySelector('body > div.container > div.output')
    const wait_container = document.createElement('div')
    const spinner = document.createElement('div');
    spinner.classList.add('spinner'); 

    wait_container.appendChild(spinner);
    container.replaceWith(wait_container)

    setTimeout(() => {
        wait_container.replaceWith(container)
        buttonRemove.click();
    }, 1000);
}

const sendUpdateData = (data, id, req) => {
    const innerSend = (data, id, req) => {
        fetch(`${req}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }

    fetch(`${req}/${id}`)
    .then(res => {
        return res.json()
    })
    .then((res) =>{
        console.log(res.name)
        update_res = res
        update_res.name = data
        innerSend(update_res, id, req)
    })
    .catch(err => console.log(err))

    const container = document.querySelector('body > div.container > div.output')
    const wait_container = document.createElement('div')
    const spinner = document.createElement('div');
    spinner.classList.add('spinner'); 

    wait_container.appendChild(spinner);
    container.replaceWith(wait_container)

    setTimeout(() => {
        wait_container.replaceWith(container)
        buttonUpdate.click();
    }, 1000);
    
}

const sendCreateData = (data, req) => {
    fetch(`${req}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}

const updateSection = (id) => {
    // Create a new div element for the update section
    const update_section = document.createElement('div');
    update_section.classList.add('delete-entry')

    // Create a 'yes' button (span element)
    const create_yes_button = document.createElement('span');
    create_yes_button.id = id;
    const icon = document.createElement('i');
    create_yes_button.classList.add('update')
    icon.classList.add('fa-solid', 'fa-arrow-down-long');
    create_yes_button.appendChild(icon);
    update_section.appendChild(create_yes_button);

    return update_section;
}

const updateSectionDelete = (id) => {
    // Create a new div element for the update section
    const update_section = document.createElement('div');
    update_section.classList.add('update-form', 'disactive')

    // Create a 'yes' button (span element)
    const create_yes_button = document.createElement('span');
    create_yes_button.id = id;
    const icon = document.createElement('i');
    create_yes_button.classList.add('delete')
    icon.classList.add('fa-solid', 'fa-trash'); // Using Font Awesome class for a check mark icon
    create_yes_button.appendChild(icon);
    update_section.appendChild(create_yes_button);
    return update_section
}

const createForm = (id) => {
    // Create a form element
    const form = document.createElement('form');
    form.id = id
    // Create input fields for 'nome' (first name) and 'cognome' (last name)
    const name = document.createElement('input');
    name.type = 'text';
    name.name = 'name';
    name.placeholder = 'Name'; // Set placeholder text for the first name field

    const last_name = document.createElement('input');
    last_name.type = 'text';
    last_name.name = 'last';
    last_name.placeholder = 'Last Name'; // Set placeholder text for the last name field

    const button = document.createElement('span')
    const icon = document.createElement('i');
    icon.classList.add('fa-regular', 'fa-paper-plane');
    button.classList.add('send-update')
    button.appendChild(icon)

    form.appendChild(name);
    form.appendChild(last_name);
    form.appendChild(button)
    return form
}

const makeGetUserSection = data => {
    if (outputIsFull(output)) {
        outputRemoveNode(output)
    }

    data.forEach((elements, index)=> {
        const parent_name = createNameSectionComponents(elements.name, index)
        const parent_loc = createLocationSectionComponents(elements.location, index)
        const parent_age = createAgeSectionComponents(elements.age, index)
        
        // create every component
        const output_child = document.createElement('div')
        output_child.classList.add(`component-${index}`)
        
        // append to every component
        output_child.append(parent_name, parent_loc, parent_age)
        output.append(output_child)
    })

}

const handleButtonLogic = (functionActive, makerFunction, self, req) => {
    if (!functionActive){
        makerFunction()
        return
    } 

    if (!self.classList.contains('active')) {
        functionActive(req, makerFunction)
        return
    }
}

// JSON REQUEST
const getData = (urlPath, makerFunction) => {
    fetch(urlPath)
    .then(res => {
        return res.json()
    })
    .then((res) => {
        makerFunction(res);
    })
    .catch(err => {
        if(!attemptCounter) {
            console.log('getData( urlPath );');
        }
    attemptCounter = true;
    console.log(err);
    })
}

// HANDLE OUTPUT CONTENT
const outputIsFull = (output) => {
    if (output && output.children.length > 0) {
        return true
    }
}

const outputRemoveNode = (output) => {
    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }
}

// CREATE DOM SECTIONS FOR LOCAL DATA
const createParentDiv = (string, index) => {
    // create component under .output
    const parent_component = document.createElement('div')
    parent_component.classList.add(`${string}.component-${index}`)
    return parent_component
}

const createChildDiv = (string) => {
    // create child component of createParentDiv
    const child_component = document.createElement('div')
    const child_component_text = document.createTextNode(`${string}:`)
    child_component.classList.add('component-body')
    child_component.appendChild(child_component_text)
    return child_component
}

const createNameSectionComponents = (elements, index) => {
    // create section for json data name,surnames
    const component_body_element_text = document.createTextNode(`${elements.first} ${elements.last}`)
    const parent_component = createParentDiv("user", index)
    const child_component = createChildDiv("Name")
    
    child_component.appendChild(component_body_element_text)
    parent_component.appendChild(child_component)
    return parent_component
}

const createLocationSectionComponents = (elements, index) => {
    // create section for json data city,cap
    const component_body_element_text = document.createTextNode(`${elements.city} ${elements.country}`)
    const parent_component = createParentDiv("user-location", index)
    const child_component = createChildDiv("City")
    
    child_component.appendChild(component_body_element_text)
    parent_component.appendChild(child_component)
    return parent_component
}

const createAgeSectionComponents = (elements, index) => {
    // create section for json age
    const component_body_element_text = document.createTextNode(`${elements}`)
    const parent_component = createParentDiv("age", index)
    const child_component = createChildDiv("Age")
    
    child_component.appendChild(component_body_element_text)
    parent_component.appendChild(child_component)
    return parent_component
}