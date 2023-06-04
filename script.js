function getCurrentImageOfTheDay() {
  const apiKey = "9vhNh4jjJRjYEqBBA8FKJYrCUL8QALuNbXbNEbNN";
  const currentDate = new Date().toISOString().slice(0, 10);

  fetch(
    `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Display data in the UI
      const currentImageContainer = document.getElementById(
        "current-image-container"
      );
      currentImageContainer.innerHTML = `
            <h1>NASA Picture of the Day</h1>
            <img src="${data.url}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
        `;
    })
    .catch((error) => console.log(error));
}

// Function to fetch and display the image for the selected date
function getImageOfTheDay(selectedDate) {
  const apiKey = "9vhNh4jjJRjYEqBBA8FKJYrCUL8QALuNbXbNEbNN";

  fetch(
    `https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      // Display data in the UI
      const currentImageContainer = document.getElementById(
        "current-image-container"
      );
      currentImageContainer.innerHTML = `
            <h1>NASA Picture of the Day</h1>
            <img src="${data.url}" alt="${data.title}">
            <h3>${data.title}</h3>
            <p>${data.explanation}</p>
        `;

      // Save the date to local storage and add it to the search history
      saveSearch(selectedDate);
      addSearchToHistory(selectedDate);
    })
    .catch((error) => console.log(error));
}

// Function to save a date to local storage
function saveSearch(date) {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory(date) {
  const searchHistory = document.getElementById("search-history");
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = "javascript:void(0)";
  link.textContent = date;
  link.addEventListener("click", function () {
    // Fetch and display the image for the clicked date
    getImageOfTheDay(date);
  });
  li.appendChild(link);
  searchHistory.appendChild(li);
}

// Event listener for form submission
document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const selectedDate = document.getElementById("search-input").value;
    const currentDate = new Date().toISOString().split("T")[0];

    if (selectedDate > currentDate) {
      // Display an error message or take appropriate action
      alert(
        "Invalid date selection. Please choose a date on or before the current date."
      );
      return;
    }

    getImageOfTheDay(selectedDate);
  });

// Display the image of the current date when the page loads
getCurrentImageOfTheDay();
