// eslint-disable-next-line import/no-unresolved
import logoImage from '../../../public/images/logo/logo.png?sizes[]=55';

// eslint-disable-next-line import/no-unresolved
import logoImageWebp from '../../../public/images/logo/logo.png?sizes[]=55&format=webp';

import element from '../../utilities/get-element';

const { getElement, getElementAll } = element;

class Navbar extends HTMLElement {
  constructor() {
    super();
    this._isNavlistMobileShow = false;
    this._DURATION_TRANSITION = 500;
  }

  connectedCallback() {
    this._render();
    this._humButtonClickHandler();
    this._navbarActiveScrollHandler();
    this._navLinkActiveClickHandler();
  }

  _render() {
    this.innerHTML = `
      <nav class="navbar">
        <section class="logo">

          <picture>
            <source media="(min-width:200)" srcset="${logoImageWebp.srcSet} type="image/webp">
            <source media="(min-width:200)" srcset="${logoImage.srcSet} type="image/jpg">
            <img
              src="${logoImage.src}"
              width="${logoImage.width}"
              srcset="${logoImage.srcSet}"
              height="${logoImage.height}"
              alt="Logo perusahaan Resto Radar"
            />
          </picture>

          <h1>Resto Radar</h1>
        </section>
        <button type="button" class="hum-button" title="Buka tautan navigasi" aria-label=" Tombol menampilkan menu navigasi">
          <i
            class="fa-solid fa-burger button-icon show fade"
          ></i>
        </button>
        <ul class="nav-list">
          <li><a class="nav-link" href="#/home">Beranda</a></li>
          <li><a class="nav-link" href="#/favorite">Favorit</a></li>
          <li><a class="nav-link" href="#/contact">Kontak Kami</a></li>
          <li>
            <a
              class="nav-link"
              href="https://znovandap-portfolio.netlify.app/"
              target="_blank"
              >Tentang Kami</a
            >
          </li>
        </ul>
      </nav>
    `;
  }

  _humButtonClickHandler() {
    const humButton = getElement('.hum-button');
    const buttonIcon = getElement('.button-icon');
    const navList = getElement('.nav-list');

    humButton.addEventListener('click', (event) => {
      event.stopPropagation();

      if (!this._isNavlistMobileShow) {
        this._showNavList(buttonIcon, navList);
        this._isNavlistMobileShow = true;
      } else {
        this._hideNavList(buttonIcon, navList);
        this._isNavlistMobileShow = false;
      }
    });
  }

  _navbarActiveScrollHandler() {
    window.addEventListener('scroll', () => {
      const header = getElement('header');
      const navbar = getElement('.navbar');

      this._navbarActiveScroll(header, navbar);
    });
  }

  _navLinkActiveClickHandler() {
    const navLinks = getElementAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.stopPropagation();

        this._resetActiveNavLink(navLinks);
        link.classList.add('active');
      });
    });
  }

  _showNavList(buttonIcon, navList) {
    // change icon
    buttonIcon.classList.replace('fade', 'not-fade');
    setTimeout(() => {
      buttonIcon.classList.replace('not-fade', 'fade');
      buttonIcon.classList.replace('fa-burger', 'fa-xmark');
    }, this._DURATION_TRANSITION);

    // show nav-link
    navList.classList.add('show');
    setTimeout(() => {
      navList.classList.toggle('open');
    }, this._DURATION_TRANSITION);
  }

  _hideNavList(buttonIcon, navList) {
    // change icon
    buttonIcon.classList.replace('fade', 'not-fade');
    setTimeout(() => {
      buttonIcon.classList.replace('not-fade', 'fade');
      buttonIcon.classList.replace('fa-xmark', 'fa-burger');
    }, this._DURATION_TRANSITION);

    // hide nav-link
    navList.classList.toggle('open');
    setTimeout(() => {
      navList.classList.remove('show');
    }, this._DURATION_TRANSITION);
  }

  _navbarActiveScroll(header, navbar) {
    if (header.offsetHeight - 10 < window.scrollY) {
      navbar.classList.add('active');
    } else {
      navbar.classList.remove('active');
    }
  }

  _resetActiveNavLink(navLinks) {
    navLinks.forEach((link) => {
      link.classList.remove('active');
    });
  }
}

customElements.define('app-bar', Navbar);
