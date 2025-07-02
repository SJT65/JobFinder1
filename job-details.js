document.addEventListener("DOMContentLoaded", () => {
  const job = JSON.parse(localStorage.getItem("selectedJob")) || {};
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const customDetails =
    JSON.parse(localStorage.getItem("customJobDetails")) || {};

  // Elements
  const editBtn = document.getElementById("editBtn");
  const modal = document.getElementById("editModal");
  const editForm = document.getElementById("editForm");

  const companyDisplay = document.getElementById("companyName");
  const aboutDisplay = document.getElementById("aboutCompany");
  const jobDisplay = document.getElementById("aboutJob");
  const skillsDisplay = document.getElementById("skillsRequired");
  const additionalDisplay = document.getElementById("additionalInfo");

  const inputCompany = document.getElementById("editCompanyName");
  const inputAbout = document.getElementById("editCompanyInfo");
  const inputJob = document.getElementById("editJobInfo");
  const inputSkills = document.getElementById("editSkills");
  const inputExtra = document.getElementById("editAdditional");

  // ✅ Set default values from localStorage or placeholder
  if (customDetails[job.title]) {
    const saved = customDetails[job.title];
    companyDisplay.textContent = saved.companyName;
    aboutDisplay.textContent = saved.aboutCompany;
    jobDisplay.textContent = saved.jobDescription;
    skillsDisplay.textContent = saved.skills;
    additionalDisplay.textContent = saved.additionalInfo;
  } else {
    companyDisplay.textContent = job.company || "N/A";
    aboutDisplay.textContent = "No company description added.";
    jobDisplay.textContent = "No job description added.";
    skillsDisplay.textContent = "No skills added.";
    additionalDisplay.textContent = "No extra info added.";
  }

  // ✅ Show edit button only when logged in
  if (user) {
    editBtn.style.display = "inline-block";
  } else {
    editBtn.style.display = "none";
  }

  // ✅ Open modal on Edit
  editBtn.addEventListener("click", () => {
    modal.style.display = "flex";

    inputCompany.value =
      companyDisplay.textContent === "N/A" ? "" : companyDisplay.textContent;
    inputAbout.value = aboutDisplay.textContent.includes("No company")
      ? ""
      : aboutDisplay.textContent;
    inputJob.value = jobDisplay.textContent.includes("No job")
      ? ""
      : jobDisplay.textContent;
    inputSkills.value = skillsDisplay.textContent.includes("No skills")
      ? ""
      : skillsDisplay.textContent;
    inputExtra.value = additionalDisplay.textContent.includes("No extra")
      ? ""
      : additionalDisplay.textContent;
  });

  // ✅ Save form
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updated = {
      companyName: inputCompany.value.trim(),
      aboutCompany: inputAbout.value.trim(),
      jobDescription: inputJob.value.trim(),
      skills: inputSkills.value.trim(),
      additionalInfo: inputExtra.value.trim(),
    };

    companyDisplay.textContent = updated.companyName;
    aboutDisplay.textContent = updated.aboutCompany;
    jobDisplay.textContent = updated.jobDescription;
    skillsDisplay.textContent = updated.skills;
    additionalDisplay.textContent = updated.additionalInfo;

    customDetails[job.title] = updated;
    localStorage.setItem("customJobDetails", JSON.stringify(customDetails));

    modal.style.display = "none";
  });

  // ✅ Hide modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
function goHome() {
  window.location.href = "index.html";
}
