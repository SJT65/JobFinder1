document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".register-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Page reload hone se roko

    // Get input values
    const fullName = form.elements[0].value.trim();
    const email = form.elements[1].value.trim();
    const password = form.elements[2].value;
    const confirmPassword = form.elements[3].value;

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Get existing users
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const alreadyExists = existingUsers.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      alert("User already exists with this email.");
      return;
    }

    // Create new user object
    const newUser = {
      fullName,
      email,
      password,
    };

    // Save to localStorage
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Registration successful! You can now log in.");
    window.location.href = "login.html"; // Redirect to login
  });
});
