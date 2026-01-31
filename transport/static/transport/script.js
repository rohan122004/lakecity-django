(function () {
  const toast = document.getElementById("toast");

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  }

  // Smooth scroll for all internal links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Mobile menu toggle
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
    });

    document.querySelectorAll(".m-link").forEach((link) => {
      link.addEventListener("click", () => mobileMenu.classList.remove("show"));
    });
  }

  // Active nav highlight on scroll
  const sections = ["about", "services", "fleet", "why", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const navLinks = document.querySelectorAll(".nav-link");

  function setActive(id) {
    navLinks.forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === "#" + id);
    });
  }

  window.addEventListener("scroll", () => {
    let current = "about";
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 140) current = sec.id;
    }
    setActive(current);
  });

  // Phone validation (client-side) for both forms
  function attachValidation(formId, phoneSelector, msgId, btnId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const phoneEl = form.querySelector(phoneSelector);
    const msg = document.getElementById(msgId);
    const submitBtn = btnId ? document.getElementById(btnId) : null;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
fetch("/api/inquiry/", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({name:form.querySelector("[name='name']").value, phone:form.querySelector("#phone").value, message:form.querySelector("[name='message']").value})}).then(r=>r.json()).then(d=>alert(d.message));

      if (!phoneEl) return;
      const phone = (phoneEl.value || "").trim();

      // Indian mobile: starts 6-9 and total 10 digits
      const ok = /^[6-9]\d{9}$/.test(phone);

      if (!ok) {
        e.preventDefault();
        if (msg) {
          msg.textContent = "❌ Enter valid 10 digit Indian mobile number";
          msg.className = "jsmsg bad";
        }
        phoneEl.focus();
        showToast("Invalid phone number");
        return;
      }

      if (msg) {
        msg.textContent = "✅ Sending…";
        msg.className = "jsmsg ok";
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
    });
  }

  attachValidation("quoteForm", "#phone", "jsMsg", "submitBtn");
  attachValidation("quoteForm2", ".phone2", "jsMsg2");

  // Small UX toast on load
  showToast("Welcome to Lake City Express 🚛");
document.getElementById("quoteForm").addEventListener("submit", function(e){
  e.preventDefault();
  const form = this;

  fetch("/api/inquiry/", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      name: form.querySelector("[name='name']").value,
      phone: form.querySelector("[name='phone']").value,
      message: form.querySelector("[name='message']").value,
      pickup_city: form.querySelector("[name='pickup_city']")?.value || "",
      drop_city: form.querySelector("[name='drop_city']")?.value || "",
      load_type: form.querySelector("[name='load_type']")?.value || ""
    })
  })
  .then(r => r.json())
  .then(d => alert(d.message));
});

  
})();