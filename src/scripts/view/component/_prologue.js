// eslint-disable-next-line import/no-unresolved
import prologueImage from '../../../public/images/other/prologue.jpg?sizes[]=350,sizes[]=768';

// eslint-disable-next-line import/no-unresolved
import prologueImageWebp from '../../../public/images/other/prologue.jpg?sizes[]=350,sizes[]=768&format=webp';

import createSourceElement from './helper/create-source-element';

class PrologueElement extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <section id="prologue" class="prologue">
        <section class="image-prologue">

          <picture>
          ${createSourceElement(prologueImageWebp, 'webp')}
          ${createSourceElement(prologueImage, 'jpg')}
            <img
              data-src="${prologueImage.src}"
              data-srcset="${prologueImage.srcSet}"
              width="${prologueImage.width}"
              height="${prologueImage.height}"
              class="lazyload prologue-image"
              loading="lazy"
              alt="Foto suasana hening di suatu restoran"
            />
          </picture>

          <div class="overlay">
            <div class="title">
              <h2>Momofuku Las Vegas</h2>
              <p>
                Photo by
                <a
                  href="https://unsplash.com/@ninjason?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  >Jason Leung</a
                >
                on
                <a
                  href="https://unsplash.com/photos/poI7DelFiVA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  >Unsplash</a
                >
              </p>
            </div>
          </div>
        </section>
        <article class="text-prologue">
          <h2>Pendahuluan</h2>
          <p>
            Resto Radar merupakan suatu platform katalog restoran yang berbasiskan website. Platform ini menyediakan daftar restoran yang beraneka ragam dari sabang hingga ke merauke. Resto Radar menampilkan berbagai informasi dari rating, lokasi, dan deskripsi mengenai restoran yang terkait, yang mana kami harap Resto Radar dapat membantu memberikan gambaran dan deskripsi mengenai restoran yang akan anda kunjungi.
          </p>
        </article>
      </section>
    `;
  }
}

customElements.define('prologue-element', PrologueElement);
