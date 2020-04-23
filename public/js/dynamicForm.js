function removeElementById(elementId) {
  let element = document.getElementById(elementId);
  element.parentElement.removeChild(element);
}

function addIngredient() {
  let uniqueIndex = Math.floor(Math.random()*100);
  let index = ingredientCounter;
  let newIngredient = document.createElement("li");
  newIngredient.setAttribute('id', `ingredient-${index}`);
  let html = `
      <div class="form-row justify-content-center">
      <div class="col-3">
        <input type="text" name="recipe[ingredients][${index}][ingredient]" class="form-control" placeholder="Ingredient">
      </div>
      <div class="col-3">
        <input type="text" name="recipe[ingredients][${index}][quantity]" class="form-control" placeholder="Quantity">
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-sm btn-red" onclick="javascript:removeElementById('ingredient-${index}')">Remove</button>
      </div>
      </div>
  `;
  newIngredient.innerHTML = html;

  let formGroupDiv = document.getElementById('ingredient-inputs-group');
  formGroupDiv.appendChild(newIngredient);
  ingredientCounter += 1;
  console.log('Ingredient Counter: ', ingredientCounter);
}

function addStep() {
  let formGroupDiv = document.getElementById('direction-inputs-group');
  let uniqueIndex = Math.floor(Math.random()*100);
  let index = stepCounter;
  let newStep = document.createElement('li');
  newStep.setAttribute('id', `step-${index}`);
  let html = `
    <div class="form-row">
      <div class="col-10">
        <textarea name="recipe[directions][${index}][action]" class="form-control" placeholder="step"></textarea>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-sm btn-red" onclick="javascript:removeElementById('step-${index}')">Remove</button>
      </div>
    </div>
  `;
  newStep.innerHTML = html;

  formGroupDiv.appendChild(newStep);
  stepCounter += 1;
  console.log('Step Counter: ', stepCounter);
}

let ingredientCounter = 0;
let stepCounter = 0;

console.log('Ingredient Counter: ', ingredientCounter);
console.log('Step Counter : ', stepCounter);

addIngredient();
addStep();



/* async function submitForm() {
  console.log('RUNNING submitForm()');
  let form = document.getElementById('new-recipe-form');

  let data = form.serializeArray();
  console.log('DATA: ', data);
  await fetch('/newRecipe', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
} */
