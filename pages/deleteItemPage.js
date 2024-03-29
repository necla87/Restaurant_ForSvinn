import { removeMenuItem, fetchData } from '../server-request.js';

export default async function deleteItemPage() {
  let deleteItemPageContent = `
    <div id="deleteItemPage">
      <h2>Delete Menu Item</h2>
      <label for="itemName">Select Item:</label>
      <select id="itemName" name="itemName">
        <option value="" disabled selected>Select an item to delete</option>
  `;

  try {
    // Fetch menu data to populate the dropdown list
    const menuData = await fetchData();
    // Iterate over each category in the menu data
    for (const category in menuData.menu) {
      if (menuData.menu.hasOwnProperty(category)) {
        // Iterate over each item in the category
        menuData.menu[category].forEach(item => {
          // Add option for each item to the dropdown list
          deleteItemPageContent += `<option value="${item.name}">${item.name}</option>`;
        });
      }
    }
  } catch (error) {
    console.error('Error fetching menu data:', error);
    deleteItemPageContent += `<option value="" disabled>Error fetching menu data. Please try again.</option>`;
  }

  deleteItemPageContent += `</select><button id="deleteButton">Delete</button></div>`;

  document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for delete button
    document.getElementById('deleteButton').addEventListener('click', async () => {
      const itemName = document.getElementById('itemName').value;
      try {
        // Call the removeMenuItem function to delete the item
        await removeMenuItem(itemName);
        alert('Menu item deleted successfully.');
        // Clear the dropdown selection after deletion
        document.getElementById('itemName').selectedIndex = 0;
      } catch (error) {
        console.error('Error deleting menu item:', error);
        alert('Failed to delete menu item. Please try again.');
      }
    });
  });

  return deleteItemPageContent;
}
