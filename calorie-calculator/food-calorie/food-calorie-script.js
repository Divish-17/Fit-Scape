const foodCalories = {
    // Fruits
    apple: { per100g: 52, perItem: 95 },
    banana: { per100g: 89, perItem: 105 },
    orange: { per100g: 47, perItem: 62 },
    mango: { per100g: 60, perItem: 150 },
    grapes: { per100g: 67 },
    watermelon: { per100g: 30 },
    pineapple: { per100g: 50 },
    pomegranate: { per100g: 83 },
    papaya: { per100g: 43 },
    strawberry: { per100g: 32 },
    kiwi: { per100g: 61 },

    // Vegetables
    potato: { per100g: 77 },
    onion: { per100g: 40 },
    tomato: { per100g: 18 },
    spinach: { per100g: 23 },
    carrot: { per100g: 41 },
    broccoli: { per100g: 34 },
    cucumber: { per100g: 16 },
    peas: { per100g: 81 },
    cauliflower: { per100g: 25 },
    bell_pepper: { per100g: 20 },

    // Indian Food Items
    chapati: { per100g: 297, perItem: 68 },
    dal: { per100g: 116 },
    dosa: { per100g: 168, perItem: 133 },
    idli: { per100g: 58, perItem: 39 },
    poha: { per100g: 130 },
    paratha: { per100g: 266, perItem: 150 },
    paneer: { per100g: 265 },
    samosa: { per100g: 262, perItem: 150 },
    aloo_puri: { per100g: 240 },
    upma: { per100g: 120 },
    biryani: { per100g: 151 },
    khichdi: { per100g: 120 },
    pakora: { per100g: 265 },
    tandoori_chicken: { per100g: 250 },
    rajma: { per100g: 140 },
    chole: { per100g: 150 },
    kheer: { per100g: 160 },
    gulab_jamun: { per100g: 150, perItem: 180 },
    jalebi: { per100g: 400 },
    laddu: { per100g: 550, perItem: 186 },
    pav_bhaji: { per100g: 180 },
    masala_dosa: { per100g: 165, perItem: 175 },
    bhindi: { per100g: 33 },
    butter_chicken: { per100g: 240 },
    curd: { per100g: 98 },
    halwa: { per100g: 320 },
    roti: { per100g: 297, perItem: 71 },
    sugar: { per100g: 387, perTeaspoon: 16 },
    coffee: { per100g: 2 },  // Black coffee
    chai_with_milk_and_sugar: { per100g: 54 },
    bread: {per100g :265 , perItem: 70 },

    // Dairy Products
    milk: { per100g: 42 },
    yogurt: { per100g: 59 },
    ghee: { per100g: 900 },
    butter: { per100g: 717 },
    cheese: { per100g: 402 },
    buttermilk: { per100g: 40 },

    // Fast Food Items
    french_fries: { per100g: 312 },
    burger: { per100g: 295, perItem: 354 },
    pizza: { per100g: 266, perItem: 285 },
    sandwich: { per100g: 250 },
    donut: { per100g: 452, perItem: 240 },
    ice_cream: { per100g: 207 },
    soft_drink: { per100g: 42 },
    chocolate: { per100g: 546, perItem: 137 },
    hot_dog: { per100g: 290, perItem: 150 },
    taco: { per100g: 226, perItem: 170 },
    nuggets: { per100g: 296 },
    popcorn: { per100g: 375 },
    chips: { per100g: 536 },

    // Junk Food from Popular Brands
    mcdonalds_big_mac: { per100g: 257, perItem: 563 },
    mcdonalds_fries: { per100g: 323, perItem: 224 },
    burger_king_whopper: { per100g: 251, perItem: 657 },
    dominos_cheese_pizza: { per100g: 266, perSlice: 210 },
    pizza_hut_pepperoni_pizza: { per100g: 298, perSlice: 298 },
    subway_veggie_delite: { per100g: 230, per6Inch: 360 },
    subway_chicken_tikka: { per100g: 237, per6Inch: 400 },
    kfc_fried_chicken: { per100g: 279, perPiece: 300 },
    kfc_zinger_burger: { per100g: 268, perItem: 610 },
    spring_roll: { per100g: 154},

    // Sweets and Desserts
    ice_cream_cone: { per100g: 207, perItem: 130 },
    brownies: { per100g: 466, perItem: 243 },
    cheesecake: { per100g: 321 },
    rasgulla: { per100g: 186, perItem: 125 },

    // Additional Snacks
    biscuits: { per100g: 480, perPiece: 30 },
    namkeen: { per100g: 550 },
    sev: { per100g: 600 },
    bhujiya: { per100g: 545 },
    papad: { per100g: 270 },

    // Beverages
    tea_with_sugar: { per100g: 40 },
    coffee_black: { per100g: 2 },
    cold_drinks: { per100g: 42 },
    beer: { per100g: 43 },
    whiskey: { per100g: 250 },
    wine: { per100g: 82 }
};


// Store meal items and total calories
let meal = [];
let totalCalories = 0;

// Show suggestions as user types
function showSuggestions() {
    const input = document.getElementById('foodItem').value.trim().toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    
    // Clear previous suggestions
    suggestionsDiv.innerHTML = '';

    if (input.length === 0) return;  // Do nothing if the input is empty

    // Find matching food items
    const matches = Object.keys(foodCalories).filter(food => food.includes(input));

    // Display matching food items
    if (matches.length > 0) {
        matches.forEach(food => {
            const div = document.createElement('div');
            div.textContent = food.charAt(0).toUpperCase() + food.slice(1);  // Capitalize the first letter
            div.classList.add('suggestion-item');
            div.onclick = () => selectSuggestion(food);
            suggestionsDiv.appendChild(div);
        });
    } else {
        // No matches found
        const noMatchDiv = document.createElement('div');
        noMatchDiv.textContent = 'No food item found';
        noMatchDiv.classList.add('suggestion-item');
        suggestionsDiv.appendChild(noMatchDiv);
    }
}

// Select a suggestion from the dropdown
function selectSuggestion(food) {
    document.getElementById('foodItem').value = food.charAt(0).toUpperCase() + food.slice(1);  // Capitalize the selected food
    document.getElementById('suggestions').innerHTML = '';  // Clear suggestions
}

// Toggle between grams and quantity input
function toggleInputType() {
    const inputType = document.getElementById('inputType').value;
    const quantityInput = document.getElementById('quantityInput');
    const countInput = document.getElementById('countInput');

    if (inputType === 'grams') {
        quantityInput.style.display = 'block';
        countInput.style.display = 'none';
    } else {
        quantityInput.style.display = 'none';
        countInput.style.display = 'block';
    }
}

// Add food to meal list and calculate calories
function addFood() {
    const foodItemInput = document.getElementById('foodItem').value.trim().toLowerCase();
    const inputType = document.getElementById('inputType').value;

    let foodCaloriesForQuantity = 0;

    // Check if input type is grams
    if (inputType === 'grams') {
        const quantity = parseInt(document.getElementById('quantity').value);
        if (quantity <= 0 || !foodCalories[foodItemInput] || !foodCalories[foodItemInput].per100g) {
            alert('Please enter a valid food item and quantity.');
            return;
        }
        const caloriePer100g = foodCalories[foodItemInput].per100g;
        foodCaloriesForQuantity = (caloriePer100g / 100) * quantity;
    } else {
        // Input type is quantity (count)
        const count = parseInt(document.getElementById('count').value);
        if (count <= 0 || !foodCalories[foodItemInput] || !foodCalories[foodItemInput].perItem) {
            alert('Please enter a valid food item and count.');
            return;
        }
        const caloriePerItem = foodCalories[foodItemInput].perItem;
        foodCaloriesForQuantity = caloriePerItem * count;
    }

    // Add to meal array
    meal.push({
        food: foodItemInput,
        calories: foodCaloriesForQuantity
    });

    // Update total calories
    totalCalories += foodCaloriesForQuantity;

    // Clear input fields
    document.getElementById('foodItem').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('count').value = '';

    // Update meal list and total calories display
    updateMealList();
}

// Update the meal list display
function updateMealList() {
    const mealItemsDiv = document.getElementById('mealItems');
    mealItemsDiv.innerHTML = '';

    meal.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('meal-item');
        div.innerHTML = `
            <span>${item.food.charAt(0).toUpperCase() + item.food.slice(1)}</span>
            <span>${item.calories.toFixed(2)} kcal</span>
            <button onclick="removeFood(${index})">Remove</button>
        `;
        mealItemsDiv.appendChild(div);
    });

    document.getElementById('totalCalories').textContent = totalCalories.toFixed(2);
}

// Remove food from the meal list and update total calories
function removeFood(index) {
    totalCalories -= meal[index].calories;
    meal.splice(index, 1);  // Remove the item from the meal

    updateMealList();  // Update the display
}
