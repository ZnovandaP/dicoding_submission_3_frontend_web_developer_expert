import element from '../../utilities/get-element';

const { getElement, getElementAll } = element;

class ContactUs extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
    this._validRegexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  }

  connectedCallback() {
    this._render();
    this._inputValidationHandler();
  }

  _render() {
    this.innerHTML = `
      <section class="contact">
        <div class="title">
          <h2>Kontak Kami</h2>
        </div>

        <form
          action="https://formspree.io/f/xzbqwgrg"
          method="POST"
          autocomplete="off"
          class="form-container"
        >
          <div class="input-field">
            <label for="name">Nama Anda</label>
            <input
              id="name"
              type="text"
              name="Nama Pengirim"
              required
              class="input"
              minlength="3"
              maxlength="30"
              placeholder="Masukan Nama anda"
            />
            <p class="message-text hide-notification notification-name">
              Masukan, minimal 3 karakter.
            </p>
          </div>

          <div class="line-form satu"></div>

          <div class="input-field">
            <label for="email">Email Anda</label>
            <input
              id="email"
              type="email"
              name="Email Pengirim"
              required
              class="input"
              minlength="3"
              maxlength="30"
              placeholder="Masukan Email anda"
            />
            <p class="message-text hide-notification notification-email">
              Format email tidak tepat.
            </p>
          </div>

          <div class="line-form dua"></div>

          <div class="input-field">
            <label for="company">Instansi Anda</label>
            <input
              id="company"
              type="text"
              name="Nama Instansi Pengirim"
              required
              class="input"
              minlength="3"
              maxlength="30"
              placeholder="Masukan Nama Instansi anda"
            />
            <p class="message-text hide-notification notification-company">
              Masukan, minimal 3 karakter.
            </p>
          </div>

          <div class="line-form tiga"></div>

          <div class="input-field message">
            <label for="message">Pesan Anda</label>
            <textarea
              name="Pesan dari Pengirim"
              id="message"
              class="input"
              minlength="5"
              placeholder="Masukan Pesan anda"
            ></textarea>
            <p class="message-text hide-notification notification-message">
              Masukan, minimal 5 karakter.
            </p>
          </div>

          <button
            type="submit"
            class="button-submit button not-allowed"
            disabled
          >
            Send Message
          </button>
        </form>
      </section>
    `;
  }

  _inputValidationHandler() {
    const commonInput = getElementAll('.input');
    commonInput.forEach((input) => {
      input.addEventListener('input', () => {
        this._inputValidation(this._objectInputAndNotificationInput());
      });
    });
  }

  _inputValidation = ({
    inputName, inputCompany, inputEmail, inputMessage,
    notificationInputName, notificationInputCompany,
    notificationInputEmail, notificationInputMessage,
  }) => {
    if (inputName.value.length < 3) {
      notificationInputName.classList.replace(
        'hide-notification',
        'show-notification',
      );
    } else {
      notificationInputName.classList.replace(
        'show-notification',
        'hide-notification',
      );
    }

    if (inputCompany.value.length < 3) {
      notificationInputCompany.classList.replace(
        'hide-notification',
        'show-notification',
      );
    } else {
      notificationInputCompany.classList.replace(
        'show-notification',
        'hide-notification',
      );
    }

    if (inputEmail.value.match(this._validRegexEmail)) {
      notificationInputEmail.classList.replace(
        'show-notification',
        'hide-notification',
      );
    } else {
      notificationInputEmail.classList.replace(
        'hide-notification',
        'show-notification',
      );
    }

    if (inputMessage.value.length < 5) {
      notificationInputMessage.classList.replace(
        'hide-notification',
        'show-notification',
      );
    } else {
      notificationInputMessage.classList.replace(
        'show-notification',
        'hide-notification',
      );
    }

    /* button submit after validation */
    const buttonSubmit = getElement('.button-submit');
    if (this._inputIsValid(this._objectInputAndNotificationInput())) {
      buttonSubmit.classList.replace('not-allowed', 'allowed');
      buttonSubmit.disabled = false;
    } else {
      buttonSubmit.classList.replace('allowed', 'not-allowed');
      buttonSubmit.disabled = true;
    }
  };

  _inputIsValid = ({
    inputName, inputCompany, inputEmail, inputMessage,
  }) => inputName.value.length > 2
      && inputCompany.value.length > 2
      && inputMessage.value.length > 4
      && inputEmail.value.match(this._validRegexEmail);

  _objectInputAndNotificationInput() {
    return {
      inputName: getElement('#name'),
      inputEmail: getElement('#email'),
      inputCompany: getElement('#company'),
      inputMessage: getElement('#message'),
      notificationInputName: getElement('.notification-name'),
      notificationInputEmail: getElement('.notification-email'),
      notificationInputCompany: getElement('.notification-company'),
      notificationInputMessage: getElement('.notification-message'),
    };
  }
}

customElements.define('contact-us', ContactUs);
