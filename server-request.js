// Function to create a new menu item on the server
export async function createMenuItem(newMenuItem) {
  try {
    const response = await fetch('menu', { // Change 'menuItems' to 'menu'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMenuItem)
    });
    if (!response.ok) {
      throw new Error('Failed to create menu item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating menu item:', error);
    throw error;
  }
}

// Function to update an existing menu item on the server
export async function updateMenuItem(category, itemName, updatedData) {
  try {
    const response = await fetch(`menu/${category}/${itemName}`, { // Change 'menuItems' to 'menu'
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    if (!response.ok) {
      throw new Error('Failed to update menu item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
}

// Function to remove a menu item from the local menu data
export function removeItemFromMenu(menuData, category, itemName) {
  if (menuData && menuData.menu && menuData.menu[category]) {
    const categoryItems = menuData.menu[category];
    const index = categoryItems.findIndex(item => item.name === itemName);
    if (index !== -1) {
      categoryItems.splice(index, 1); // Remove the item from the category
    }
  }
}

// Function to remove a menu item from the server
export async function removeMenuItem(category, itemName) {
  try {
    const response = await fetch(`http://localhost:3000/menu/${category}/${itemName}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to remove menu item');
    }
    return await response.json();
  } catch (error) {
    console.error('Error removing menu item:', error);
    throw error;
  }
}

// Function to fetch menu data from the server
export async function fetchData() {
  try {
    const response = await fetch('./db.json'); // Assuming db.json is served from the same origin
    if (!response.ok) {
      throw new Error('Failed to fetch menu data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching menu data:', error);
    throw error;
  }
}

// Function to send updated menu data to the server
export async function sendData(menuData) {
  try {
    const response = await fetch('http://localhost:3000/menu', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(menuData.menu) // Send only the 'menu' object
    });
    if (!response.ok) {
      throw new Error('Failed to send updated data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error sending updated data:', error);
    throw error;
  }
}
