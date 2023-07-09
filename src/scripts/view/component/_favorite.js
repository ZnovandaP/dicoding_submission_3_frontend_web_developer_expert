class FavoriteContent extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this._render();
  }

  _render() {
    this.innerHTML = `
      <section id="main-content-favorite" class="content-favorite" tabindex="0">
        <div class="title">
          <h2 class="title-content-favorite">Daftar Restoran Favorite</h2>
        </div>
        
        <section class="card-container-favorite"></section>
      </section>
    `;
  }
}

customElements.define('favorite-content', FavoriteContent);
