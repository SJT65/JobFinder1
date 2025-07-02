// ✅ Static Job Data
const staticJobs = [
  {
    title: "Frontend Developer",
    location: "Delhi",
    salary: "₹50,000",
    skills: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    company: "TechSoft",
    image: "images/l1.png",
  },
  {
    title: "Backend Developer",
    location: "Mumbai",
    salary: "₹35,000",
    skills: ["Node.js", "MongoDB"],
    category: "Backend",
    company: "DevWorks",
    image: "images/l2.png",
  },
  {
    title: "Fullstack Engineer",
    location: "Bangalore",
    salary: "₹60,000",
    skills: ["React", "Node.js", "MongoDB"],
    category: "Fullstack",
    company: "StackTech",
    image: "images/l3.png",
  },
  {
    title: "DevOps Engineer",
    location: "Hyderabad",
    salary: "₹45,000",
    skills: ["AWS", "Docker"],
    category: "DevOps",
    company: "CloudOps",
    image: "images/l4.png",
  },
];

let allJobs = []; // static + user-added

// ✅ Display Job Cards
function displayJobs(data) {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  if (data.length === 0) {
    jobList.innerHTML = "<p>No matching jobs found.</p>";
    return;
  }

  data.forEach((job, index) => {
    const isUserAdded = job.fromUser === true;

    const card = `
      <div class="job-card">
        <div class="job-header">
          <img src="${job.image}" alt="${job.company} Logo" />
          <div>
            <h3>${job.title}</h3>
            <p>📍 ${job.location}</p>
          </div>
        </div>
        <div class="job-tags">
          ${job.skills.map((skill) => `<span>${skill}</span>`).join("")}
        </div>
        <div class="job-footer">
          <span>${job.category}</span>
          <span>${job.salary}</span>
          <span>Office</span>
          <span>Full Time</span>
          <a href="job-details.html" class="btn" onclick='viewDetails(${index})'>View details</a>
          ${
            isUserAdded
              ? `<button class="btn btn-remove" onclick="removeJob(${index})">Remove</button>`
              : ""
          }
        </div>
      </div>
    `;
    jobList.innerHTML += card;
  });
}

// ✅ View Details
function viewDetails(index) {
  const job = allJobs[index];
  localStorage.setItem("selectedJob", JSON.stringify(job));
  window.location.href = "job-details.html";
}

// ✅ Remove User-Added Job
function removeJob(index) {
  const userJobs = JSON.parse(localStorage.getItem("userJobs")) || [];
  userJobs.splice(index - staticJobs.length, 1);
  localStorage.setItem("userJobs", JSON.stringify(userJobs));
  allJobs = [...staticJobs, ...userJobs.map((j) => ({ ...j, fromUser: true }))];
  displayJobs(allJobs);
}

// ✅ Filter Jobs
function applyFilter() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const selectedCategory =
    document.getElementById("categorySelect")?.value?.toLowerCase() || "";

  const filtered = allJobs.filter((job) => {
    const titleMatch = job.title.toLowerCase().includes(input);
    const skillMatch = job.skills.some((skill) =>
      skill.toLowerCase().includes(input)
    );
    const categoryMatch =
      selectedCategory === "" ||
      job.category.toLowerCase() === selectedCategory;

    return (titleMatch || skillMatch) && categoryMatch;
  });

  displayJobs(filtered);
}

// ✅ Clear Filter
function clearFilter() {
  document.getElementById("searchInput").value = "";
  document.getElementById("categorySelect").value = "";
  displayJobs(allJobs);
}

// ✅ On Page Load
document.addEventListener("DOMContentLoaded", () => {
  const userJobs = JSON.parse(localStorage.getItem("userJobs")) || [];
  const taggedUserJobs = userJobs.map((job) => ({ ...job, fromUser: true }));
  allJobs = [...staticJobs, ...taggedUserJobs];
  displayJobs(allJobs);

  // ✅ Navbar Login Handling
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const userActions = document.getElementById("userActions");

  if (user && userActions) {
    userActions.innerHTML = `
      <span style="font-weight:bold; margin-right:10px;">👋 Welcome, ${user.fullName}</span>
      <a href="add-job.html" class="btn">Add Job</a>
      <button class="btn btn-logout">Logout</button>
    `;

    document.querySelector(".btn-logout").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      location.reload();
    });
  }

  // ✅ Replace "Apply Filter" with "Add Job" Button If Logged In
  const filterBtns = document.querySelector(".filter-btns");
  if (filterBtns) {
    if (user) {
      filterBtns.innerHTML = `
        <a href="add-job.html" class="btn">Add Job</a>
        <button class="btn btn-clear" onclick="clearFilter()">Clear</button>
      `;
    } else {
      filterBtns.innerHTML = `
        <button class="btn" onclick="applyFilter()">Apply Filter</button>
        <button class="btn btn-clear" onclick="clearFilter()">Clear</button>
      `;
    }
  }
});
