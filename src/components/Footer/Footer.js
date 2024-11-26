import './footer.css';

export default function Footer() {
  return `
    <footer class="footer">
      <div class="footer-icons">
        <a href="https://www.facebook.com" target="_blank" class="footer-link" aria-label="Facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.twitter.com/elonmusk" target="_blank" class="footer-link" aria-label="Twitter">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://www.google.com" target="_blank" class="footer-link" aria-label="Google">
          <i class="fab fa-google"></i>
        </a>
        <a href="https://www.instagram.com/zuck" target="_blank" class="footer-link" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/in/matthieu-barraque/" target="_blank" class="footer-link" aria-label="LinkedIn">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="https://github.com/MatthieuBarraque/ALPINEJS-Kahootlike/tree/main" target="_blank" class="footer-link" aria-label="GitHub">
          <i class="fab fa-github"></i>
        </a>
      </div>
      <p class="footer-copyright">© 2024 Matthieu: ALPINE</p>
    </footer>
  `;
}
