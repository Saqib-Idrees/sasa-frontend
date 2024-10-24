// import { localstorageService } from '../../utils/localStorageService';

const Footer = () => {
  //   const authToken = localstorageService.getToken();
  return (
    <footer>
      <ul className="footer-links">
        <li>
          <a
            href="https://www.iubenda.com/terms-and-conditions/84375705"
            target="_blank"
            rel="noreferrer"
          >
            Terms &amp; Conditions
          </a>
        </li>
        <li>
          <a
            href="https://www.iubenda.com/privacy-policy/84375705"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <a
            href="https://framesuite.com/contact/"
            target="_blank"
            rel="noreferrer"
          >
            Contact Us
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
