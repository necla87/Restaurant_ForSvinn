import { fetchData } from './server-request.js';

// Exporting the displayMenu function
export async function displayMenu() {
  try {
    const menuData = await fetchData(); // Fetch menu data
    $("#app").empty(); // Clear previous content

    if (!menuData || !menuData.menu) {
      $("#app").append("<p>No menu items available.</p>");
      return;
    }

    const menu = menuData.menu;

    // Iterate through each category of menu items
    Object.keys(menu).forEach(category => {
      const categoryItems = menu[category];
      $("#app").append(`<h2>${category}</h2>`);

      // Check if categoryItems is an array
      if (Array.isArray(categoryItems)) {
        // Iterate through each menu item in the category
        categoryItems.forEach(item => {
          const itemHtml = `
            <div class="menu-item">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <p>Price: ${item.price} SEK</p>
            </div>
          `;
          $("#app").append(itemHtml);
        });
      } else {
        console.error(`Error: ${category} items is not an array.`);
      }
    });
  } catch (error) {
    console.error('Error fetching and displaying menu data:', error);
    // Handle the error, such as displaying an error message to the user
  }
}

// Call the displayMenu function when the page loads
$(function () {
  displayMenu();
});
