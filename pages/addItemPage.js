// Import fetchData and sendData from server-request.js
import { fetchData, sendData } from '../server-request.js';

// Function to generate a unique ID for a new item
function generateItemId(menuData) {
  // Extract the menu items from the menuData
  const items = Object.values(menuData.menu).flat();

  // Find the maximum existing ID
  const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);

  // Increment the maximum ID to generate a new unique ID
  return maxId + 1;
}

// Function to add a new item to the menu
export default async function addItemPage() {
  // Define the HTML content for the Add Item page
  const addItemPageContent = `
        <div id="addItemPage">
            <h2>Add New Item</h2>
            <form id="addItemForm">
                <label for="category">Category:</label>
                <select id="category" name="category">
                    <option value="main_course">main_course</option>
                    <option value="starter">starter</option>
                    <option value="dessert">dessert</option>
                    <option value="drink">drink</option>
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

    try {
      // Fetch the current menu data
      let menuData = await fetchData();

      // Generate a new ID for the item
      const id = generateItemId(menuData);

      // Create a new item object with the generated ID
      const newItem = {
        id: id,
        category: category,
        name: name,
        description: description,
        price: parseInt(price), // Convert price to integer
        sold_out: false // By default, the new item is not sold out
      };

      // Add the new item to the specified category
      menuData.menu[category].push(newItem);

      // Send the updated menu data to the server
      await sendData(menuData);

      // Redirect to the admin page after adding the item
      window.location.href = '#admin';
    } catch (error) {
      console.error('Error adding item:', error);
      // Display an error message to the user
      alert('Error adding item. Please try again later.');
    }
  });
}
