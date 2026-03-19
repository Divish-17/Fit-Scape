/* Move the custom cursor along with the mouse */
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

/* Optionally add a small animation effect when clicking */
document.addEventListener('mousedown', () => {
    const cursor = document.querySelector('.custom-cursor');
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)'; /* Shrink on click */
});
document.addEventListener('mouseup', () => {
    const cursor = document.querySelector('.custom-cursor');
    cursor.style.transform = 'translate(-50%, -50%) scale(1)'; /* Return to normal size */
});



document.getElementById("coach-hire").onclick = function () {
    window.location.href = "trainer-portal/trainer-index.html"; // Change to your desired URL
};

document.getElementById("find-coach-button").onclick = function () {
    window.location.href = "find-coach/find-coach.html"; // Change to your desired URL
};


document.getElementById("home-page-article-button").onclick = function () {
    window.location.href = "articles/nerd.html"; // Change to your desired URL
};


document.getElementById("home-page-sign-in-button").onclick = function () {
    window.location.href = "login-form/login-index.html"; // Change to your desired URL
};

document.getElementById("center-quiz-button").onclick = function () {
    window.location.href = "quiz/quiz.html"; // Change to your desired URL
};

document.getElementById("home-page-gov-button").onclick = function () {
    window.location.href = "schemes/gov.html"; // Change to your desired URL
};

// swipe section  
let currentIndex = 0;
const boxes = document.querySelectorAll('.box');
const totalBoxes = boxes.length;

function showNextBox() {
    const currentBox = boxes[currentIndex];
    const nextIndex = (currentIndex + 1) % totalBoxes;
    const nextBox = boxes[nextIndex];

    currentBox.classList.remove('active');
    currentBox.classList.add('previous');

    nextBox.classList.remove('next');
    nextBox.classList.add('active');

    setTimeout(() => {
        currentBox.classList.remove('active', 'previous');
        nextBox.classList.remove('next');
    }, 1000); // Time matches the CSS transition duration

    currentIndex = nextIndex;
}

// Set the first box to be visible initially
boxes[currentIndex].classList.add('active');

setInterval(() => {
    // Set the next box to be positioned off-screen to the right
    const nextIndex = (currentIndex + 1) % totalBoxes;
    boxes[nextIndex].classList.add('next');
    showNextBox();
}, 5000); // Change div every 5 seconds


//  swipe end 