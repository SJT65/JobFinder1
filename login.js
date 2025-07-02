document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = form.elements[0].value.trim();
    const password = form.elements[1].value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (matchedUser) {
      // Save current logged-in user
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert("Invalid email or password.");
    }
  });
});
