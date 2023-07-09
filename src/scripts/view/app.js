import { async } from 'regenerator-runtime';
import urlParser from '../routes/url-parser';
import routes from '../routes/routes';
import element from '../utilities/get-element';

const { getElement, getElementAll } = element;

class App {
  constructor({
    main, header, navbar, hero, navLinks,
  }) {
    this._main = main;
    this._header = header;
    this._navbar = navbar;
    this._hero = hero;
    this._navLinks = navLinks;

    this._removeAllHandler();
  }

  async renderPage() {
    const urlWithJoinString = urlParser._parseUrlWithJoinString();
    const getPage = routes[urlWithJoinString];
    this._main.innerHTML = getPage._render();
    await getPage._afterRender();
  }

  _removeAllHandler() {
    this._main.addEventListener('click', () => {
      getElementAll('.wrapper-card-menu').forEach((cardMenu) => {
        cardMenu.classList.remove('show');
        cardMenu.classList.remove('open');
      });
    });
  }

  activeNavbarFirstLoaded() {
    this._header.offsetHeight === 0
      ? this._navbar.classList.add('active')
      : this._navbar.classList.remove('active');
  }

  activeNavLinkBaseOnUrl() {
    const navigationLinks = Array.from(this._navLinks);
    navigationLinks.pop();
    navigationLinks.forEach((link) => {
      const getAttributeHref = link.getAttribute('href').slice(1);
      const getCurrentUrl = urlParser._parseUrlWithJoinString();
      link.classList.remove('active');

      if (getAttributeHref === getCurrentUrl) {
        link.classList.add('active');
      }

      if (getCurrentUrl === '/') {
        link.innerText === 'Beranda' ? link.classList.add('active') : '';
      }
    });
  }

  resetActiveNavLink() {
    this._navLinks.forEach((link) => {
      link.classList.remove('active');
    });
  }

  showHeroBaseOnUrl() {
    const hero = this._hero;
    const getUrl = urlParser._parseUrlWithJoinString();
    !(getUrl === '/home' || getUrl === '/')
      ? (hero.style.display = 'none')
      : (hero.style.display = 'block');
  }

  scrolltoTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

export default App;
