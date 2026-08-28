const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector("#site-menu");
const cookieBanner = document.querySelector(".cookie-banner");
const contactForm = document.querySelector("#contact-form");
const status = document.querySelector(".form-status");

if (localStorage.getItem("spp-cookie-accepted") === "true") {
  cookieBanner.classList.add("is-hidden");
}

document.querySelector("[data-cookie-accept]").addEventListener("click", () => {
  localStorage.setItem("spp-cookie-accepted", "true");
  cookieBanner.classList.add("is-hidden");
});

menuButton.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
});

menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menu.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll(".accordion details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    detail.closest(".accordion").querySelectorAll("details").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent("Website enquiry from " + data.get("name"));
  const body = encodeURIComponent("Name: " + data.get("name") + "\nEmail: " + data.get("email") + "\n\n" + data.get("message"));
  status.textContent = "Opening your email app with your message ready to send.";
  window.location.href = "mailto:tijana@systemsforprivatepractice.com?subject=" + subject + "&body=" + body;
});