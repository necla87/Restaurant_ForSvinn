
export default async function adminLoginPage() {
  // HTML content for the admin login page
  const adminLoginPageHTML = `
    <div class="admin-login-container">
      <h1>Admin Login</h1>
      <form id="adminLoginForm">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit" id="loginBtn">Login</button>
      </form>
    </div>
  `;

  // Display the admin login page
  $('main').html(adminLoginPageHTML);

  // Add event listener for login form submission
  $('#adminLoginForm').on('submit', async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get username and password from form inputs
    const username = $('#username').val();
    const password = $('#password').val();

    // Perform login with provided credentials
    const loggedIn = await login(username, password);

    // Redirect to admin page if login successful, otherwise show error message
    if (loggedIn) {
      window.location.href = '#admin'; // Redirect to admin page
    } else {
      alert('Invalid username or password. Please try again.'); // Show error message
    }
  });

  // Function to perform login authentication
  async function login(username, password) {
    // Define the hardcoded credentials
    const storedCredentials = {
      username: 'admin',
      password: 'admin12345'
    };

    // Simulate a delay for authentication (you can remove this in a real scenario)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if provided credentials match the stored credentials
    if (username === storedCredentials.username && password === storedCredentials.password) {
      return true; // Authentication successful
    } else {
      return false; // Authentication failed
    }
  }
}
