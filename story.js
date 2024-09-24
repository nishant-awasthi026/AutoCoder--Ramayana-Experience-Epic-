document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('fire-sound');
    backgroundMusic.play();
});

// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

const papers = [];
for (let i = 1; i <= 8; i++) {
    papers.push(document.querySelector(`#p${i}`));
}

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Event Listener for Scroll Wheel
document.addEventListener("wheel", handleScrollWheel, { passive: true });

// Business Logic
let currentLocation = 1;
const numOfPapers = 8;
const maxLocation = numOfPapers + 1;

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if (currentLocation < maxLocation) {
        if (currentLocation === 1) openBook();
        papers[currentLocation - 1].classList.add("flipped");
        papers[currentLocation - 1].style.zIndex = currentLocation;
        if (currentLocation === numOfPapers) closeBook(false);
        currentLocation++;
    }
}

function goPrevPage() {
    if (currentLocation > 1) {
        if (currentLocation === 2) closeBook(true);
        papers[currentLocation - 2].classList.remove("flipped");
        papers[currentLocation - 2].style.zIndex = numOfPapers - currentLocation + 2;
        if (currentLocation === maxLocation) openBook();
        currentLocation--;
    }
}

function handleScrollWheel(event) {
    if (event.deltaY > 0) {
        // Scrolling down
        goNextPage();
    } else {
        // Scrolling up
        goPrevPage();
    }
}
