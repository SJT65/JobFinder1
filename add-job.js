document.getElementById("jobForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const company = document.getElementById("company").value.trim();
  const location = document.getElementById("location").value.trim();
  const salary = document.getElementById("salary").value.trim();
  const category = document.getElementById("category").value.trim();
  const skills = document
    .getElementById("skills")
    .value.split(",")
    .map((s) => s.trim());
  const image = document.getElementById("image").value.trim();

  const newJob = {
    title,
    company,
    location,
    salary,
    category,
    skills,
    image,
  };

  // Get old jobs or initialize
  const oldJobs = JSON.parse(localStorage.getItem("userJobs")) || [];

  // Add new job
  oldJobs.push(newJob);

  // Save back to localStorage
  localStorage.setItem("userJobs", JSON.stringify(oldJobs));

  // Redirect back to index page
  alert("Job added successfully!");
  window.location.href = "index.html";
});
