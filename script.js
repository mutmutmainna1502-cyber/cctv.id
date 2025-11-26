/**
 * FILE: script.js
 * DESKRIPSI: JavaScript untuk website Syamsinar CCTV
 * Menangani interaktivitas seperti menu mobile, slider, dan form submission
 */

// DOM Content Loaded - Menunggu HTML selesai dimuat sebelum menjalankan script
document.addEventListener("DOMContentLoaded", function () {
  // ===== MOBILE NAVIGATION TOGGLE =====
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Event listener untuk toggle menu mobile
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Menutup menu mobile ketika link diklik
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // ===== TESTIMONIAL SLIDER =====
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".slider-dot");
  let currentTestimonial = 0;
  let slideInterval;

  // Fungsi untuk menampilkan testimonial berdasarkan index
  function showTestimonial(index) {
    // Sembunyikan semua testimonial
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });

    // Hapus class active dari semua dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Tampilkan testimonial dan dot yang aktif
    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
    currentTestimonial = index;
  }

  // Event listener untuk dots slider
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      // Reset interval ketika user mengklik dot manual
      clearInterval(slideInterval);
      showTestimonial(index);
      startAutoSlide();
    });
  });

  // Fungsi untuk memulai auto slide
  function startAutoSlide() {
    slideInterval = setInterval(() => {
      let nextTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(nextTestimonial);
    }, 5000); // Ganti slide setiap 5 detik
  }

  // ===== SMOOTH SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      // Skip jika href adalah "#"
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Scroll ke element target dengan offset untuk header fixed
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== FORM SUBMISSION =====
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Validasi form sederhana
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const message = document.getElementById("message").value;

      if (!name || !email || !phone || !message) {
        alert("Harap lengkapi semua field!");
        return;
      }

      // Validasi email sederhana
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Harap masukkan email yang valid!");
        return;
      }

      // Simulasi pengiriman form
      alert(
        "Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda."
      );

      // Reset form setelah submit
      this.reset();
    });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentSection) {
        link.classList.add("active");
      }
    });
  }

  // Event listener untuk scroll
  window.addEventListener("scroll", updateActiveNavLink);

  // ===== INITIALIZE =====
  // Mulai testimonial slider
  showTestimonial(0);
  startAutoSlide();

  // Update active nav link saat page load
  updateActiveNavLink();

  // ===== ADDITIONAL FEATURES =====

  // Animasi fade in pada scroll
  function checkScroll() {
    const elements = document.querySelectorAll(
      ".service-card, .product-card, .about-content, .contact-content"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state untuk animasi
  document
    .querySelectorAll(
      ".service-card, .product-card, .about-content, .contact-content"
    )
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

  // Check scroll pada load dan saat scroll
  window.addEventListener("load", checkScroll);
  window.addEventListener("scroll", checkScroll);

  // ===== ENHANCED FORM VALIDATION =====
  const phoneInput = document.getElementById("phone");

  phoneInput.addEventListener("input", function (e) {
    // Hanya allow angka dan karakter telepon dasar
    this.value = this.value.replace(/[^0-9+\-\s()]/g, "");
  });

  function openSocialMedia(type) {
    const urls = {
      instagram: {
        app: "instagram://user?username=smrcctv",
        web: "https://www.instagram.com/smrcctv",
      },
      facebook: {
        app: "fb://page/1ESgwp741d",
        web: "https://www.facebook.com/share/1ESgwp741d/",
      },
      whatsapp: {
        app: "whatsapp://send?phone=6285143976400",
        web: "https://wa.me/6285143976400",
      },
    };

    if (urls[type]) {
      window.location.href = urls[type].app;
      setTimeout(() => {
        window.location.href = urls[type].web;
      }, 500);
    }
  }
});
