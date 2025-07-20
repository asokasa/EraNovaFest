import "./My_Footer.css";

export default function My_Footer() {
  return (
    <footer className="footer">
      <div className="footer_things">
        <div className="social">
          <h3>Socials</h3>
          <div className="social-link">
            <a href=""><img src="/icons/face.png" alt="Facebook" /></a>
            <p>@eranova_fesztival</p>
          </div>
          <div className="social-link">
            <a href=""><img src="/icons/insta.png" alt="Instagram" /></a>
            <p>@eranova_fesztival</p>
          </div>
        </div>

        <div className="contacts">
          <h3>Elérhetőségek</h3>
          <p>eranova@gmail.com</p>
          <p>+36 20 227 4247</p>
        </div>

        <img src="/home_shapes/EraNova_Logo.png" alt="Era Nova Logo" className="footer-logo" />
      </div>

      <p>&copy; {new Date().getFullYear()} Era Nova. All rights reserved.</p>
      <p>by: MBM</p>
    </footer>
  );
}