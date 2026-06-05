document.addEventListener('DOMContentLoaded', () => {
  // --- HEADER SCROLL EFFECT ---
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- NAV LINK ACTIVE HIGHLIGHT ON SCROLL ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  if (navLinks.length > 0 && sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPos = window.scrollY + 160; // Offset for header height
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(`#${current}`)) {
          link.classList.add('active');
        }
      });
    });
  }

  // --- SECTION FADE-IN ANIMATION ---
  const animatedSections = document.querySelectorAll('section');
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedSections.forEach(section => {
    // Check if section is already in view on load
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      section.classList.add('visible');
    } else {
      revealOnScroll.observe(section);
    }
  });

  // --- SKILLS PROGRESS BAR ANIMATION ---
  const skillBarFills = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.dataset.width;
        if (typeof gsap !== 'undefined') {
          gsap.to(bar, {
            width: targetWidth,
            duration: 1.5,
            ease: "power2.out"
          });
        } else {
          bar.style.width = targetWidth;
          bar.style.transition = 'width 1.5s ease-out';
        }
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  skillBarFills.forEach(bar => {
    skillObserver.observe(bar);
  });


  // --- SCROLL DOWN INDICATOR HANDLER ---
  const scrollDownBtn = document.querySelector('.scroll-down');
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      const target = document.getElementById('competences');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- SMOOTH ANCHOR LINK SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
