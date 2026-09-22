const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelector(".mobile-menu")?.addEventListener("click", () => {
  document.querySelector(".nav-links")?.classList.toggle("open");
});

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
form?.addEventListener("submit", async e => {
  e.preventDefault();
  status.textContent = "Sending…";
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Unable to send");
    status.textContent = "Thanks — your message has been sent.";
    form.reset();
  } catch (err) {
    status.textContent = err.message || "Something went wrong. Please email admin@bas-tools.org.";
  }
});