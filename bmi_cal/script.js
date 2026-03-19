let weightSlider = document.getElementById("myWeight");
let weightOutput = document.getElementById("inputWeight");

let heightSlider = document.getElementById("myHeight");
let heightOutput = document.getElementById("inputHeight");

weightOutput.value = weightSlider.value;
heightOutput.value = heightSlider.value;

weightSlider.oninput = function () {
  weightOutput.value = this.value;
}
heightSlider.oninput = function () {
  heightOutput.value = this.value;
}

function showValWeight(newVal) {
  weightSlider.value = newVal;
};

function showValHeight(newVal) {
  heightSlider.value = newVal;
};

weightSlider.addEventListener("input", updateValueWeight);
heightSlider.addEventListener("input", updateValueHeight);
function updateValueWeight(e) {
  weightOutput.value = e.srcElement.value;
}
function updateValueHeight(e) {
  heightOutput.value = e.srcElement.value;
}

function calculateBmi() {
  let weight = document.bmiForm.realweight.value;
  let height = (document.bmiForm.realheight.value) / 100;
  let realbmi = (weight) / Math.pow(height, 2);
  let realbmiOutput = document.getElementById("yourbmi");
  let messageOutput = document.getElementById("evaluationMessage");
  let resultSection = document.getElementById("resultSection");
  let roundedBmi = realbmi.toFixed(1);
  
  realbmiOutput.textContent = roundedBmi;
  messageOutput.textContent = "";
  
  // Show result section
  resultSection.classList.remove('d-none');

  // Set the message based on BMI
  if (roundedBmi < 18.5) {
    messageOutput.innerHTML = '<span class="badge bg-success">Underweight</span> - Focus on a balanced, nutrient-rich diet to reach a healthier BMI.';
  } else if (roundedBmi >= 18.5 && roundedBmi <= 24.9) {
    messageOutput.innerHTML = '<span class="badge bg-info">Normal Weight</span> - Great work! Keep up with balanced diet and exercise!';
  } else if (roundedBmi >= 25 && roundedBmi <= 29.9) {
    messageOutput.innerHTML = '<span class="badge bg-warning text-dark">Overweight</span> - Increase physical activity to manage weight effectively.';
  } else if (roundedBmi >= 30 && roundedBmi <= 34.9) {
    messageOutput.innerHTML = '<span class="badge bg-danger">Obese</span> - Regular exercise and mindful eating can improve your health.';
  } else if (roundedBmi >= 35) {
    messageOutput.innerHTML = '<span class="badge bg-danger">Severely Obese</span> - Consult a health professional for personalized advice.';
  }
}