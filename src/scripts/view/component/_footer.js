// eslint-disable-next-line import/no-unresolved
import logoImage from '../../../public/images/logo/logo.png?sizes[]=55';

// eslint-disable-next-line import/no-unresolved
import logoImageWebp from '../../../public/images/logo/logo.png?sizes[]=55&format=webp';

import generateCurrentYear from '../../utilities/get-current-year';
import element from '../../utilities/get-element';

class FooterElement extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
    this._printCurrentYear();
  }

  _render() {
    this.innerHTML = `
      <footer>
        <section class="company-footer">
          <div class="logo">
            
            <picture>
              <source media="(min-width:200)" srcset="${logoImageWebp.srcSet} type="image/webp">
              <source media="(min-width:200)" srcset="${logoImage.srcSet} type="image/jpg">
              <img
                data-src="${logoImage.src}"
                data-srcset="${logoImage.srcSet}"
                width="${logoImage.width}"
                height="${logoImage.height}"
                class="lazyload"
                alt="Logo perusahaan Resto Radar"
              />
            </picture>

            <h2>Resto Radar</h2>
          </div>
          <div class="company-copyright">
            <h2>
              Copyright &copy; <span class="year"></span> -
              <span class="company-name">Resto Radar</span>
            </h2>
          </div>
        </section>

        <div class="line-footer"></div>

        <section class="note-author">
          <h2>
            <i class="fa-solid fa-code code-icon"></i> Front-end Web Developer
            Expert
          </h2>
          <h2>
            Dibuat dengan <i class="fa-solid fa-heart fa-beat heart-icon"></i>,
            Zidane Novanda Putra
          </h2>
        </section>
      </footer>
    `;
  }

  _printCurrentYear() {
    const elementYearText = element.getElementAll('.year');
    elementYearText.forEach((yearText) => generateCurrentYear(yearText));
  }
}

customElements.define('footer-element', FooterElement);
