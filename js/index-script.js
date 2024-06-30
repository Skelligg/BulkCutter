
const app_id = "e0854d27";
const app_key = "ecc8bdb05ddbd3dbe828f0ee73c8c791"

let result = [];
let addedFoods = [];
let addedFoodID = 0;
let data;
let nutrientData;

let buttons = document.querySelectorAll(".close")
let wrappers = document.querySelectorAll(".wrapper")
const search = document.querySelector(".search-bar")
const resultBox = document.querySelector(".result-box")
const addedFoodsDiv = document.querySelector(".added-foods")

//fetchNutrients();
init()

function init(){
    search.addEventListener("keypress", searchResults)
    document.addEventListener('mousemove', showButton)
    for(let button of buttons){
        button.addEventListener("click",removeWrapper);
    }
    document.querySelector("body").addEventListener("click", () => resultBox.innerHTML = "")
}

function removeWrapper(e){
    let targetWrapperID = e.target.getAttribute("for")
    let targetWrapper = document.querySelector(`#${targetWrapperID}`)
    targetWrapper.remove();
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
        fetchSearchResults(foodItem)

    }
}

async function fetchNutrients(name,index){
    const nutrientURL = "https://api.edamam.com/api/food-database/v2/nutrients?app_id=e0854d27&app_key=ecc8bdb05ddbd3dbe828f0ee73c8c791";

    const parserURL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id}&app_key=${app_key}&ingr=${name}`;
    
    const response = await fetch(parserURL)
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

    data = await response.json();

    let foodID = data.hints[index].food.foodId;
    let measureURI = data.hints[index].measures[0].uri;

    try{
        const response = await fetch(nutrientURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    "ingredients": [
                      {
                        "quantity": 1,
                        "measureURI": `${measureURI}`,
                        "qualifiers": [
                          "https://api.edamam.com/api/food-database/v2/nutrients"
                        ],
                        "foodId": `${foodID}`
                      }
                    ]
                  })
        
        })
        if(!response.ok){
            throw new Error('Network response was not ok ' + response.statusText);
          }

        nutrientData = await response.json();
        console.log(nutrientData)
        addFood(data.hints[index].food.label);
    }
    catch(error){
        console.log(error)
    }
    
    
}

async function fetchSearchResults(foodItem){
    const parserURL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id}&app_key=${app_key}&ingr=${foodItem}`;
    try{
        const response = await fetch(parserURL)

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }

        data = await response.json();
        console.log(data)

        result = [];

        if(foodItem){
            for(let i = 0; i < 10 && i < data.hints.length; i++){
                result[i] = data.hints[i].food.label;
            }
        }

        const content = result.map((list) =>{
            return "<li>" + list + "</li>"
        });
    
        resultBox.innerHTML = "<ul>" + content.join('') + "</ul>"

        let searchResults = document.querySelectorAll("li");
        for(let i = 0; i < searchResults.length; i++){
            searchResults[i].addEventListener("click",function() { fetchNutrients(search.value,i)})
        }
        
    }
    catch(error){
        console.error(error)
    }

}

function addFood(name){

    let weight = nutrientData.totalWeight;
    let caloriesPer100g = (nutrientData.totalNutrients.ENERC_KCAL.quantity.toFixed(2) / weight * 100).toFixed(0);
    let carbsPer100g = (nutrientData.totalNutrients.CHOCDF.quantity.toFixed(2) / weight * 100).toFixed(2);
    let fiberPer100g = (nutrientData.totalNutrients.FIBTG.quantity.toFixed(2) / weight * 100).toFixed(2);
    let totalSugarsPer100g = (nutrientData.totalNutrients.SUGAR.quantity.toFixed(2) / weight * 100).toFixed(2);
    let energyPer100g = (caloriesPer100g * 4.184).toFixed(2);
    let fatPer100g = (nutrientData.totalNutrients.FAT.quantity.toFixed(2) / weight * 100).toFixed(2);
    let proteinPer100g = (nutrientData.totalNutrients.PROCNT.quantity.toFixed(2) / weight * 100).toFixed(2);

    // Create the wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    wrapper.id = `wrapper-${addedFoodID}`;

    // Create the collapsible div
    const collapsible = document.createElement('div');
    collapsible.className = 'collapsible';

    // Create the input checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `food-${addedFoodID}`;
    checkbox.style.display = "none";

    // Create the label
    const label = document.createElement('label');
    label.setAttribute('for', `food-${addedFoodID}`);
    label.innerHTML = `${name} <p>${caloriesPer100g} kCal</p><img src="./resources/arrow.png">`;

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
    amountInput.value = 100;

    const pGrams = document.createElement('p');
    pGrams.innerHTML = "<p>g</p>"

    // Append the h3 and amount input to the weight div
    weightDiv.appendChild(nutritionHeader);
    weightDiv.appendChild(amountInput);
    weightDiv.appendChild(pGrams);

    // Create the nutrition div
    const nutritionDiv = document.createElement('div');
    nutritionDiv.className = 'nutrition';

    // Create the p elements for nutrition facts
    const nutritionFacts = {
        carbs: `Carbs: <strong>${carbsPer100g} g</strong>`,
        fiber: `Fiber: <strong>${fiberPer100g} g</strong>`,
        totalSugars: `Total Sugars: <strong>${totalSugarsPer100g} g</strong>`,
        addedSugars: `Added Sugars: <strong>${totalSugarsPer100g} g</strong>`,
        energy: `Energy: <strong>${energyPer100g} kJ</strong>`,
        fat: `Fat: <strong>${fatPer100g} g</strong>`,
        protein: `Protein: <strong>${proteinPer100g} g</strong>`
    };

    const nutrientElements = {};
    for (const [key, fact] of Object.entries(nutritionFacts)) {
        const p = document.createElement('p');
        p.innerHTML = fact;
        nutritionDiv.appendChild(p);
        nutrientElements[key] = p;
    }

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
    closeButton.innerHTML = 'x';
    closeButton.setAttribute("for", `wrapper-${addedFoodID}`);
    closeButton.addEventListener("click", removeWrapper);

    // Append the collapsible div and close button to the wrapper div
    wrapper.appendChild(collapsible);
    wrapper.appendChild(closeButton);

    // Append the wrapper div to the body or a specific container element
    addedFoodsDiv.appendChild(wrapper);

    // Update nutrients based on the amount input value
    amountInput.addEventListener('input', () => {
        const amount = amountInput.value;
        nutrientElements.carbs.innerHTML = `Carbs: <strong>${(carbsPer100g * amount / 100).toFixed(2)} g</strong>`;
        nutrientElements.fiber.innerHTML = `Fiber: <strong>${(fiberPer100g * amount / 100).toFixed(2)} g</strong>`;
        nutrientElements.totalSugars.innerHTML = `Total Sugars: <strong>${(totalSugarsPer100g * amount / 100).toFixed(2)} g</strong>`;
        nutrientElements.addedSugars.innerHTML = `Added Sugars: <strong>${(totalSugarsPer100g * amount / 100).toFixed(2)} g</strong>`;
        nutrientElements.energy.innerHTML = `Energy: <strong>${(energyPer100g * amount / 100).toFixed(2)} kJ</strong>`;
        nutrientElements.fat.innerHTML = `Fat: <strong>${(fatPer100g * amount / 100).toFixed(2)} g</strong>`;
        nutrientElements.protein.innerHTML = `Protein: <strong>${(proteinPer100g * amount / 100).toFixed(2)} g</strong>`;
        label.innerHTML = `${name} <p>${(caloriesPer100g * amount / 100).toFixed(0)} kCal</p><img src="./resources/arrow.png">`;
    });

    addedFoodID++;
    addedFoods.push(wrapper);
    buttons = document.querySelectorAll(".close");
}

function calculateTotal(){

}

function print(){
    console.log(foodItem)
}