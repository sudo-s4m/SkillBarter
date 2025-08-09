const skillData = {
  "ui-ux-design": {
    title: "Learn to play Guitar",
    description:
      "Learn the ultimate soulful instrument 'The Guitar', I'll try my best to teach you. With enough patience and practice you'll play it eyes-closed ;)",
    offerer: {
      name: "Sameer Husain",
      bio: "CS student, Unity College",
      pic: "/me.png",
    },
  },
  "web-development": {
    title: "Web Development",
    description:
      "Build responsive websites using HTML, CSS, and JavaScript, and learn about frontend frameworks.",
    offerer: {
      name: "Emily Smith",
      bio: "Full-stack developer specializing in frontend technologies.",
      pic: "https://randomuser.me/api/portraits/women/45.jpg",
    },
  },
  photography: {
    title: "Photography",
    description:
      "Master the fundamentals of photography, including composition, lighting, and editing techniques.",
    offerer: {
      name: "Michael Brown",
      bio: "Professional photographer with 10+ years experience in portrait and landscape photography.",
      pic: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  },
};

const skillCards = document.querySelectorAll(".skill-card");
const modal = document.getElementById("skill-modal");
const closeModalBtn = document.getElementById("close-modal");

const bartBtn = document.getElementById("bart-btn");
const toast = document.getElementById("toast");

// Open modal with fade & scale animation
skillCards.forEach((card) => {
  card.addEventListener("click", () => {
    const skillKey = card.getAttribute("data-skill");
    const skill = skillData[skillKey];
    if (skill) {
      openSkillModal(skill);
    }
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const skillKey = card.getAttribute("data-skill");
      const skill = skillData[skillKey];
      if (skill) {
        openSkillModal(skill);
      }
    }
  });
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.addEventListener(
    "transitionend",
    () => {
      modal.style.display = "none";
    },
    { once: true }
  );
});

// Close modal if clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    modal.addEventListener(
      "transitionend",
      () => {
        modal.style.display = "none";
      },
      { once: true }
    );
  }
});

// Toast show function
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// Bart button click
bartBtn.addEventListener("click", () => {
  showToast("Request sent!");
});

/* --- OFFER SKILL FEATURE BELOW --- */

// Reusable function to open modal given a skill object
function openSkillModal(skill) {
  document.getElementById("modal-skill-title").textContent = skill.title;
  document.getElementById("modal-skill-description").textContent =
    skill.description;
  document.getElementById("modal-profile-pic").src =
    skill.offerer.pic ||
    "https://cdn-icons-png.flaticon.com/512/147/147144.png";
  document.getElementById("modal-profile-pic").alt = skill.offerer.name;
  document.getElementById("modal-profile-name").textContent =
    skill.offerer.name;
  document.getElementById("modal-profile-bio").textContent =
    skill.offerer.bio || "";

  modal.style.display = "flex";
  requestAnimationFrame(() => {
    modal.classList.add("show");
    document.querySelector(".modal-content").focus();
  });
}

/* --- NAVIGATION LOGIC --- */

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");

navItems.forEach((nav) => {
  nav.addEventListener("click", () => {
    const target = nav.getAttribute("data-target");

    pages.forEach((page) => {
      page.style.display = page.id === target ? "block" : "none";
    });

    navItems.forEach((btn) => btn.classList.remove("active"));
    nav.classList.add("active");
  });
});

//PWA code
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => console.log("Service Worker registered successfully"))
      .catch((err) => console.log("Service Worker registration failed:", err));
  });
}
