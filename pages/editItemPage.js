import { fetchData, updateMenuItem } from '../server-request.js';

export default async function editItemPage() {
  const editItemPageContainer = $("<div>");

  try {
    // Fetch menu data
    const menuData = await fetchData();

    // Display form for editing menu items
    editItemPageContainer.append("<h2>Edit Menu Item</h2>");
    const selectCategory = $("<select>").attr("id", "editCategory");
    Object.keys(menuData.menu).forEach(category => {
      selectCategory.append($("<option>").text(category));
    });
    editItemPageContainer.append(selectCategory);

    const selectItem = $("<select>").attr("id", "editItem");
    editItemPageContainer.append(selectItem);

    // Function to update item selection dropdown based on selected category
    function updateItemSelection(category) {
      selectItem.empty(); // Clear existing options
      menuData.menu[category].forEach(item => {
        selectItem.append($("<option>").text(item.name));
      });
    }

    // Initial update of item selection dropdown based on default selected category
    const defaultCategory = selectCategory.val();
    updateItemSelection(defaultCategory);

    const editForm = $("<form>").attr("id", "editForm");
    editForm.append("<label for='editName'>Name:</label>");
    editForm.append("<input type='text' id='editName' required>");
    editForm.append("<label for='editDescription'>Description:</label>");
    editForm.append("<textarea id='editDescription' required></textarea>");
    editForm.append("<label for='editPrice'>Price:</label>");
    editForm.append("<input type='number' id='editPrice' required>");
    editForm.append("<label for='editSoldOut'>Sold Out:</label>");
    editForm.append("<input type='checkbox' id='editSoldOut'>");
    editForm.append("<button type='submit'>Save Changes</button>");
    editItemPageContainer.append(editForm);

    // Event listener for category selection change
    selectCategory.on("change", function () {
      const selectedCategory = $(this).val();
      updateItemSelection(selectedCategory);
    });

    // Event listener for form submission
    editForm.on("submit", async function (event) {
      event.preventDefault();

      const selectedCategory = $("#editCategory").val();
      const selectedItemName = $("#editItem").val();
      const editedItem = {
        name: $("#editName").val(),
        description: $("#editDescription").val(),
        price: parseFloat($("#editPrice").val()),
        sold_out: $("#editSoldOut").prop("checked")
      };

      try {
        // Update the menu item on the server
        await updateMenuItem(selectedCategory, selectedItemName, editedItem);
        alert("Menu item updated successfully!");
      } catch (error) {
        console.error("Error updating menu item:", error);
        alert("Failed to update menu item. Please try again.");
      }
    });
  } catch (error) {
    console.error("Error fetching menu data:", error);
    // Handle the error, such as displaying an error message to the user
    editItemPageContainer.append("<p>Error fetching menu data. Please try again later.</p>");
  }

  return editItemPageContainer;
}
