// This is an Array of tips, each string is a tip with related emojies to make it more friendly advice :)
  const tips = [
    "pack light, make a list of the important stuff you need, and check all of the required documents🎒✅",
    "consider your budget for the destination, check the prices and entry fees💰🏯",
    "research the place before the trip to decide what you want to experience🗺️🏰",
    "Capture all of the good memories but don't forget to live in the moment while you are there📸🙌",
    "Pack light food for the road, and research local restaurants in advance🥨🥙🍽️",
    "Keep a small first aid kit for emergencies, including band-aids, pain relievers, and sanitizer🩹💊",
    "Take breaks during your trip to recharge and avoid burnout🍹",
    "Be respectful of the local culture, and dress codes where required🙏🕌.",

];


// I added event listeners to all "Get a Tip" buttons using `document.querySelectorAll.For each button, I attach a click event listener. When a button is clicked, the event triggers a function that generates and displays a random travel tip. 
        function getRandomTip() {
        return tips[Math.floor(Math.random() * tips.length)];
  } 

document.querySelectorAll('.generate-tip').forEach((button) => {
    button.addEventListener('click', () => {
        const tipElement = button.nextElementSibling;

// Generate and display a random tip using conditional statement, The function checks if the tip is currently hidden it generates a random tip, displays it, and removes the `hidden` class to show the tip. If the tip is already visible, it simply replaces the displayed text with a new random tip.
     if (tipElement.classList.contains('hidden')) {
            tipElement.textContent = getRandomTip();
            tipElement.classList.remove('hidden');
      } else {
            tipElement.textContent = getRandomTip();
        }
    });
});


// I used OpenWeather API Key (included in the citations document)
const apiKey = 'ee4c64da3d3a3d7c7a273e84c99a9a58';

// Destination cities I need for my travelogue
const destinations = [
    { id: "Banff", city: "Banff" },
    { id: "Al-Madina", city: "Medina" },
    { id: "Austria", city: "Salzburg" },
    { id: "Vancouver", city: "Vancouver" },
];


// Fetch current weather data for each destination I visited
   destinations.forEach(destination => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${destination.city}&appid=${apiKey}&units=metric`;

       fetch(url)
          .then(response => response.json())
          .then(data => {
            if (!data.main || !data.weather) {
                console.error(`Incomplete data for ${destination.city}:`, data);
                return;
            }

 //I use getElementbyId to Select the right article for each destination.
            const article = document.getElementById(destination.id);

 // Get elements for temperature, condition, and icon frim the API response
            const temperatureEl = article.querySelector('.temperature'); //using queryselector to find the temperature
            const conditionEl = article.querySelector('.condition'); //using queryselector to find the condition 
            const iconEl = article.querySelector('.weather-icon'); //using queryselector to find the weather icon


            const temperature = data.main.temp; 
            const condition = data.weather[0].description; 
            const iconCode = data.weather[0].icon; 

            // Update the DOM elements with the fetched weather data.
            temperatureEl.textContent = `${temperature}°C`; // Add °C symbol.
            conditionEl.textContent = condition.charAt(0).toUpperCase() + condition.slice(1); // Capitalize the first letter.
            iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // Set the weather icon URL.
        })
        .catch(error => {


            console.error(`Failed to fetch weather for ${destination.city}:`, error);
        });
});

