
const app_id = "e0854d27";
const app_key = "ecc8bdb05ddbd3dbe828f0ee73c8c791"

let result = [];
let addedFoods = [];

let buttons = document.querySelectorAll(".close")
let wrappers = document.querySelectorAll(".wrapper")
const search = document.querySelector("input")
const resultBox = document.querySelector(".result-box")
const addedFoodsDiv = document.querySelector(".added-foods")

init()

function init(){
    search.addEventListener("keypress", searchResults)
    document.addEventListener('mousemove', showButton)
    document.querySelector("body").addEventListener("click", () => resultBox.innerHTML = "")
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", () => {
            wrappers[i].remove();
            buttons = document.querySelectorAll(".close")
            wrappers = document.querySelectorAll(".wrapper")
        
            init();
        });
    }
}

function showButton(event){
    for(let button of buttons){
        const rect = button.getBoundingClientRect();
        const proximityThreshold = 45; // Adjust this value as needed
    
        const isInProximity = 
            event.clientX > rect.left - proximityThreshold &&
            event.clientX < rect.right + proximityThreshold &&
            event.clientY > rect.top - proximityThreshold &&
            event.clientY < rect.bottom + proximityThreshold;
    
        if (isInProximity) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    }
}

function searchResults(e){
    if(e.key === "Enter"){
        let foodItem = e.target.value;
        fetchData(foodItem)

    }
}

async function fetchData(foodItem){
    const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id}&app_key=${app_key}&ingr=${foodItem}`;
    try{
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }

        const data = await response.json();
        //console.log(data)

        result = [];

        if(foodItem){
            for(let i = 0; i < 10 && i < data.hints.length; i++){
                result[i] = data.hints[i].food.label;
            }
        }

        const content = result.map((list) =>{
            return "<li>" + list + "</li>"
        });
        //console.log(content)
    
        resultBox.innerHTML = "<ul>" + content.join('') + "</ul>"

        let searchResults = document.querySelectorAll("li");
        for(let li of searchResults){
            li.addEventListener("click",addFood);
        }
        
    }
    catch(error){
        console.error(error)
    }

}

function addFood(e){
    let id = addedFoods.length;
    let name = e.target.innerHTML
    // Create the wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    wrapper.id = 'food1';

    // Create the collapsible div
    const collapsible = document.createElement('div');
    collapsible.className = 'collapsible';

    // Create the input checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'collapsible-head';

    // Create the label
    const label = document.createElement('label');
    label.setAttribute('for', 'collapsible-head');
    label.innerHTML = `${name} <p>89 kcal</p><img src="./resources/arrow.png">`;

    // Create the collapsible-text div
    const collapsibleText = document.createElement('div');
    collapsibleText.className = 'collapsible-text';

    // Create the weight div
    const weightDiv = document.createElement('div');
    weightDiv.className = 'weight';

    // Create the h3 element
    const nutritionHeader = document.createElement('h3');
    nutritionHeader.textContent = 'Nutrition';

    // Create the amount input
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.className = 'amount';
    amountInput.min = '0';
    amountInput.max = '9999';
    amountInput.placeholder = '100g';

    // Append the h3 and amount input to the weight div
    weightDiv.appendChild(nutritionHeader);
    weightDiv.appendChild(amountInput);

    // Create the nutrition div
    const nutritionDiv = document.createElement('div');
    nutritionDiv.className = 'nutrition';

    // Create the p elements for nutrition facts
    const nutritionFacts = ['Carbs:', 'Fiber:', 'Total Sugars:', 'Added Sugars:', 'Energy:', 'Fat:', 'Protein:'];
    nutritionFacts.forEach(fact => {
        const p = document.createElement('p');
        p.textContent = fact;
        nutritionDiv.appendChild(p);
    });

    // Create the cost input
    const costInput = document.createElement('input');
    costInput.type = 'number';
    costInput.className = 'cost';
    costInput.placeholder = 'cost';
    costInput.min = '0';
    costInput.max = '9999';

    // Append the cost input to the nutrition div
    nutritionDiv.appendChild(costInput);

    // Append the weight div and nutrition div to the collapsible-text div
    collapsibleText.appendChild(weightDiv);
    collapsibleText.appendChild(nutritionDiv);

    // Append the input, label, and collapsible-text to the collapsible div
    collapsible.appendChild(checkbox);
    collapsible.appendChild(label);
    collapsible.appendChild(collapsibleText);

    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close';
    closeButton.innerHTML = '<p>x</p>';

    // Append the collapsible div and close button to the wrapper div
    wrapper.appendChild(collapsible);
    wrapper.appendChild(closeButton);

    // Append the wrapper div to the body or a specific container element
    addedFoodsDiv.appendChild(wrapper);
    
}



function print(){
    console.log(foodItem)
}