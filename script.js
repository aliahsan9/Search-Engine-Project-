const unsplashApiKey = "Enter your own Key"; // Add your valid Unsplash API key here
const searchForm = document.querySelector("#searchForm"),
  searchResult = document.querySelector("#searchResult"),
  searchBox = document.querySelector("#searchBox"),
  showButton = document.querySelector("#showButton");

let page = 1;
let keyword = "";

// Hide "Show More" button initially
showButton.style.display = "none";

// Function to fetch and display images from Unsplash API
async function fetchImages() {
  try {
    keyword = searchBox.value.trim(); // Trim any leading/trailing spaces
    if (keyword === "") {
      alert("Please enter a search term");
      return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${unsplashApiKey}&per_page=12`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error("Error:", response.status, response.statusText);
      return;
    }

    const data = await response.json();
    displayImages(data);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Function to display images in the search result div
function displayImages(data) {
  const results = data.results;

  if (page === 1) {
    searchResult.innerHTML = ""; // Clear previous results if it's a new search
  }

  results.forEach((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description || "Image"; // Add alt text for accessibility

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);

    searchResult.appendChild(imageLink);
  });

  // Show "Show More" button if there are 12 results (indicating there might be more images)
  if (results.length === 12) {
    showButton.style.display = "block";
  } else {
    showButton.style.display = "none";
  }
}

// Event listener for form submission (search button)
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1; // Reset page number for new search
  fetchImages();
});

// Event listener for "Show More" button
showButton.addEventListener("click", () => {
  page++;
  fetchImages();
});
