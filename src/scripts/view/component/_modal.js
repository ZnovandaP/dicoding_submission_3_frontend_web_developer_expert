import { async } from 'regenerator-runtime';
import favoriteRestaurantIDB from '../../data/favorite-restaurant-idb';
import generateCurrentYear from '../../utilities/get-current-year';
import element from '../../utilities/get-element';

const { getElement, getElementAll } = element;

class Modal extends HTMLElement {
  constructor() {
    super();
    this._isNavlistMobileShow = false;
    this._DURATION_TRANSITION = 400;
  }

  connectedCallback() {
    this._render();
    this._closeModalHandler();
    this._printCurrentYear();
  }

  _render() {
    this.innerHTML = `
      <section class="modal-parent overlay">
        <section class="modal">
          <!-- modal head -->
          <section class="modal-head">
            <h2 class="modal-title">Informasi Restoran</h2>
            <button
              type="button"
              class="modal-button-close"
              title="Tutup modal pop-up"
              aria-label="Tombol menutup modal popup"
            >
              <i class="fa-regular fa-circle-xmark"></i>
            </button>
          </section>
          <!-- modal body -->
          <section class="modal-body">
          </section>
          <!-- modal foot -->
          <section class="modal-foot">
            <p>Resto Radar | copyright &copy;<span class="year"></span></p>
          </section>
        </section>
      </section>
    `;
  }

  _closeModalHandler() {
    const modalButtonClose = getElement('.modal-button-close');
    const modalParent = getElement('.modal-parent');
    const { body } = document;
    modalButtonClose.addEventListener('click', (event) => {
      event.stopPropagation();
      this._closeModal(modalParent, body);
      this._changeColorRateBaseOnIDB(getElementAll('.rate'));
      this._checkConditionButtonBaseOnIDB(getElementAll('.button-like'));
    });
  }

  _closeModal(modalParent, body) {
    modalParent.classList.remove('show-modal');
    body.classList.remove('modal-freeze-page');
    setTimeout(() => {
      modalParent.classList.remove('block');
    }, this._DURATION_TRANSITION);
  }

  _printCurrentYear() {
    const elementYearText = getElementAll('.year');
    elementYearText.forEach((yearText) => generateCurrentYear(yearText));
  }

  _changeColorRateBaseOnIDB(rates) {
    rates.forEach(async (rate) => {
      if (!(await this._isRestaurantExist(rate.dataset.id))) {
        rate.style.backgroundColor = '#289672';
      } else {
        rate.style.backgroundColor = '#dc2626';
      }
    });
  }

  _checkConditionButtonBaseOnIDB(buttons) {
    buttons.forEach(async (button) => {
      if (!(await this._isRestaurantExist(button.dataset.id))) {
        button.innerText = 'Suka';
      } else {
        button.innerText = 'Tidak Suka';
      }
    });
  }

  async _isRestaurantExist(id) {
    const restaurant = await favoriteRestaurantIDB.getFavoriteRestaurant(id);
    return !!restaurant;
  }
}

customElements.define('modal-element', Modal);
