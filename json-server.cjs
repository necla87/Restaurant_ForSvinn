const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

const PORT = 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser()); // Add bodyParser middleware to parse JSON request bodies

// Custom route handler for handling PUT requests to /menu
server.put('/menu', (req, res) => {
  const updatedMenuData = req.body; // Get the updated menu data from the request body
  router.db.setState(updatedMenuData); // Update the in-memory database state
  res.sendStatus(200); // Send a success response status code
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
