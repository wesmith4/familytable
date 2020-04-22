function removeElementById(elementId) {
  let element = document.getElementById(elementId);
  element.parentElement.removeChild(element);
}

function addIngredient() {
  let uniqueIndex = Math.floor(Math.random()*100);
  let newIngredient = document.createElement("li");
  newIngredient.setAttribute('id', `ingredient-${uniqueIndex}`);
  let html = `
      <div class="form-row">
      <div class="col-5">
        <input type="text" name="ingredients[][ingredient]" class="form-control" placeholder="Ingredient">
      </div>
      <div class="col-5">
        <input type="text" name="ingredients[][quantity]" class="form-control" placeholder="Quantity">
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-secondary" onclick="javascript:removeElementById('ingredient-${uniqueIndex}')">Remove</button>
      </div>
      </div>
  `;
  newIngredient.innerHTML = html;

  let formGroupDiv = document.getElementById('ingredient-inputs-group');
  formGroupDiv.appendChild(newIngredient);
}

function addStep() {
  let uniqueIndex = Math.floor(Math.random()*100);
  let newStep = document.createElement('li');
  newStep.setAttribute('id', `step-${uniqueIndex}`);
  let html = `
    <div class="form-row">
      <div class="col-10">
        <textarea name="directions[][action]" class="form-control" placeholder="step"></textarea>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-secondary" onclick="javascript:removeElementById('step-${uniqueIndex}')">Remove</button>
      </div>
    </div>
  `;
  newStep.innerHTML = html;
  let formGroupDiv = document.getElementById('direction-inputs-group');
  formGroupDiv.appendChild(newStep);
}

for (let i = 0; i < 3; i++) {
  addIngredient();
  addStep();
}

$( "form" ).submit(function( event ) {
  $( this ).serializeArray();
  event.preventDefault();
  this.onSub
});

$("form").subm
