// Import fetchData and sendData from server-request.js
import { fetchData, sendData } from '../server-request.js';

// Function to add a new item to the menu
export default async function addItemPage() {
  // Define the HTML content for the Add Item page
  const addItemPageContent = `
        <div id="addItemPage">
            <h2>Add New Item</h2>
            <form id="addItemForm">
                <label for="category">Category:</label>
                <select id="category" name="category">
                    <option value="main_course">Main Course</option>
                    <option value="starter">Starter</option>
                    <option value="dessert">Dessert</option>
                    <option value="drink">Drink</option>
                </select><br><br>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br><br>
                <label for="description">Description:</label><br>
                <textarea id="description" name="description" rows="4" cols="50" required></textarea><br><br>
                <label for="price">Price (SEK):</label>
                <input type="number" id="price" name="price" min="0" required><br><br>
                <button type="submit">Add Item</button>
            </form>
        </div>
    `;

  // Render the Add Item page content
  $('main').html(addItemPageContent);

  // Add event listener for the form submission
  $('#addItemForm').on('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Extract the form data
    const category = $('#category').val();
    const name = $('#name').val();
    const description = $('#description').val();
    const price = $('#price').val();

    // Create a new item object
    const newItem = {
      category: category,
      name: name,
      description: description,
      price: parseInt(price), // Convert price to integer
      sold_out: false // By default, the new item is not sold out
    };

    try {
      // Fetch the current menu data
      let menuData = await fetchData();

      // Check if the category exists in the menu data
      if (menuData.menu.hasOwnProperty(category)) {
        // Add the new item to the specified category
        menuData.menu[category].push(newItem);

        // Send the updated menu data to the server
        await sendData(menuData);

        // Redirect to the admin page after adding the item
        window.location.href = '#admin';
      } else {
        // Display an error message if the category does not exist
        alert('Invalid category');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      // Display an error message to the user
      alert('Error adding item. Please try again later.');
    }
  });
}
