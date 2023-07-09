// eslint-disable-next-line import/no-unresolved
import heroImage from '../../../public/images/hero/hero-image.jpg?sizes[]=425,sizes[]=768,sizes[]=1024';

// eslint-disable-next-line import/no-unresolved
import heroImageWebp from '../../../public/images/hero/hero-image.jpg?sizes[]=425,sizes[]=768,sizes[]=1024&format=webp';

import element from '../../utilities/get-element';
import createSourceElement from './helper/create-source-element';

const { getElement } = element;
class HeroElement extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
    this._goToPrologue();
  }

  _render() {
    this.innerHTML = `
      <section class="hero">
        <button type="button" class="skip-content home" tabindex="1">Skip to content</button>
        
        <picture>
        ${createSourceElement(heroImageWebp, 'webp')}
        ${createSourceElement(heroImage, 'jpg')}
          <img
            src="${heroImage.src}"
            width="${heroImage.width}"
            srcSet="${heroImage.srcSet}"
            height="${heroImage.height}"
            alt="Gambar aneka ragam makanan di atas meja"
            class="hero-image"
            loading="lazy"
          />
        </picture>

        <div class="overlay">
          <h2>Resto Radar</h2>
          <h3>Beragam Pilihan Restoran Terbaik Hanya di Satu Platform.</h3>
          <button type="button" id="button-prologue" class="button">Pendahuluan</button>
        </div>
      </section>
    `;
  }

  _goToPrologue() {
    getElement('#button-prologue').addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();

      const prologue = getElement('.prologue');

      if (prologue) {
        prologue.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

customElements.define('hero-element', HeroElement);
