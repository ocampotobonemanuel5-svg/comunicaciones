/**
 * Common website utilities (Menu navigation, scroll styling, animations)
 */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.custom-navbar');
  
  // Navbar scroll visual feedback
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
      navbar.style.padding = '0.8rem 0';
      navbar.style.backgroundColor = 'rgba(6, 9, 15, 0.95)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.padding = '1.1rem 0';
      navbar.style.backgroundColor = 'rgba(6, 9, 15, 0.8)';
    }
  });

  // Mark active navigation link based on current URL path
  const currentPath = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.custom-navbar .nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});
