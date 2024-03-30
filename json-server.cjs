// Server code using JSON Server
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();
const PORT = 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser());

// Endpoint for updating individual items within categories
server.put('/menu/:category/:itemName', (req, res, next) => {
  const category = req.params.category;
  const itemName = req.params.itemName;
  const updatedData = req.body;

  // Retrieve the current state of the database
  const currentState = router.db.getState();

  // Check if the specified category exists in the menu
  if (currentState.menu && currentState.menu[category]) {
    // Find the item in the specified category
    const itemToUpdate = currentState.menu[category].find(item => item.name === itemName);

    if (itemToUpdate) {
      // Update the item with the new data
      Object.assign(itemToUpdate, updatedData);

      // Update the database state
      router.db.setState(currentState);
      res.sendStatus(200); // Send a success response status code
    } else {
      res.status(404).send('Item not found'); // Send a 404 status code if the item is not found
    }
  } else {
    res.status(404).send('Category not found'); // Send a 404 status code if the category is not found
  }
});

// Endpoint for deleting a menu item
server.delete('/menu/:category/:itemName', (req, res, next) => {
  const category = req.params.category;
  const itemName = req.params.itemName;

  // Retrieve the current state of the database
  const currentState = router.db.getState();

  // Check if the specified category exists in the menu
  if (currentState.menu && currentState.menu[category]) {
    // Find the index of the item to delete
    const index = currentState.menu[category].findIndex(item => item.name === itemName);

    if (index !== -1) {
      // Remove the item from the category
      currentState.menu[category].splice(index, 1);

      // Update the database state
      router.db.setState(currentState);
      res.sendStatus(204); // Send a success response status code
    } else {
      res.status(404).send('Item not found'); // Send a 404 status code if the item is not found
    }
  } else {
    res.status(404).send('Category not found'); // Send a 404 status code if the category is not found
  }
});

// Endpoint for fetching the entire menu data
server.get('/menu', (req, res, next) => {
  // You can directly use the router provided by JSON Server to handle this endpoint
  router.render(req, res);
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
