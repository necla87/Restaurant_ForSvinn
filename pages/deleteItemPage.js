// Import fetchData and sendData from server-request.js
import { fetchData, sendData } from '../server-request.js';

// Function to create options for select dropdown
function createSelectOptions(items) {
  return items.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
}

// Function to render delete item page
export default async function deleteItemPage() {
  try {
    // Fetch the current menu data
    const menuData = await fetchData();

    // Extract categories from menu data
    const categories = Object.keys(menuData.menu);

    // Create HTML content for delete item page
    const deleteItemPageContent = `
        <div id="deleteItemPage">
            <h2>Delete Item</h2>
            <form id="deleteItemForm">
                <label for="category">Category:</label>
                <select id="category" name="category">
                    ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
                </select><br><br>
                <label for="item">Item:</label>
                <select id="item" name="item">
                    <option value="" disabled selected>Select Item</option>
                </select><br><br>
                <button type="submit">Delete Item</button>
            </form>
        </div>
    `;

    // Render the delete item page content
    $('main').html(deleteItemPageContent);

    // Add event listener for category selection
    $('#category').on('change', function () {
      const selectedCategory = $(this).val();
      const items = menuData.menu[selectedCategory];
      const selectOptions = createSelectOptions(items);
      $('#item').html(selectOptions);
    });

    // Add event listener for form submission
    $('#deleteItemForm').on('submit', async function (event) {
      event.preventDefault(); // Prevent default form submission

      // Extract selected category and item ID
      const category = $('#category').val();
      const itemId = $('#item').val();

      try {
        // Find the selected item in the menu data
        const selectedItemIndex = menuData.menu[category].findIndex(item => item.id == itemId);

        if (selectedItemIndex !== -1) {
          // Remove the selected item from the menu
          menuData.menu[category].splice(selectedItemIndex, 1);

          // Send the updated menu data to the server
          await sendData(menuData);

          // Redirect to the admin page after deleting the item
          window.location.href = '#admin';
        } else {
          // Display an error message if the item is not found
          alert('Item not found');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        // Display an error message to the user
        alert('Error deleting item. Please try again later.');
      }
    });
  } catch (error) {
    console.error('Error fetching menu data:', error);
    // Display an error message to the user
    alert('Error fetching menu data. Please try again later.');
  }
}
