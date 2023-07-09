import API_ENDPOINT from '../../global/api-endpoint';
import element from '../../utilities/get-element';

const { IMAGE_URL } = API_ENDPOINT;

const detailPageTemplate = {
  template({
    name,
    pictureId,
    description,
    address,
    city,
    rating,
    categories,
    menus,
    customerReviews,
  }) {
    return `
      <h2 class="detail-title">Informasi Detail Restoran ${name}</h2>
        <section class="detail-restaurant">
          <article class="article-restaurant">
            <h2>${name}</h2>
            <img
              src="${IMAGE_URL.small}${pictureId}"
              alt="Restoran ${name}"
              loading="lazy"
              class="image-restaurant ${name}"
            />
            <p class="description-restaurant">
              ${description}
            </p>
          </article>

          <section class="information">
            <section class="information-advanced">
              <h2 class="title">Informasi</h2>

              <div class="address">
                <h3>Alamat</h3>
                <p>${address}</p>
              </div>

              <div class="city">
                <h3>Kota</h3>
                <p>${city}</p>
              </div>

              <div class="rating">
                <h3>Rating</h3>
                <div class="rate">
                  <i
                    class="fa-regular fa-star star"
                  ></i>
                  <span class="rating-restaurant">${rating}</span>
                </div>
              </div>

              <div class="menu-category">
                <h3>Kategori Menu</h3>
                <ul class="list-menu">
                  ${this._createdListCategoryMenu(categories)}
                </ul>
              </div>
            </section>

            <section class="list-menu-restaurant">
              <h2>Daftar Menu</h2>
              <div class="food-section">
                <h3>Makanan</h3>
                <ul class="food-list">
                  ${this._createdListFoodMenu(menus)}
                </ul>
              </div>
              <div class="beverage-section">
                <h3>Minuman</h3>
                <ul class="beverage-list">
                  ${this._createdListBeverageMenu(menus)}
                </ul>
              </div>
            </section>

            <section class="review-section">
              <h2>Ulasan Pelanggan <span class="note">(scroll untuk melihat review)</span></h2>

              <div class="card-review-container" style="height:${this._heightDecisionCardReview(customerReviews)};">
                ${this._createdCardReviewCustomer(customerReviews)}
              </div>

              <div class="form-add-review">
                <div class="user-icon">
                  <i
                    class="fa-regular fa-circle-user"
                    aria-label="icon pengguna"
                    role="icon"
                  ></i>
                </div>
                <form id="form-post-review" autocomplete="off">
                  <input
                    id="name-input"
                    name="name"
                    type="text"
                    minlength="3"
                    required
                    placeholder="Masukkan Nama Anda.."
                  />
                  <textarea
                    id="review-input"
                    name="review"
                    required
                    minlength="3"
                    placeholder="Masukkan Ulasan Anda"
                  ></textarea>
                  <button id="submit-review" type="submit">
                    Tambahkan Ulasan
                  </button>
                </form>
              </div>
            </section>
          </section>
        </section>
    `;
  },

  _createdListCategoryMenu(categories) {
    let list = '';
    categories.forEach((category) => {
      list += `
      <li class="categories-menu">${category.name}</li>
      `;
    });

    return list;
  },

  _createdListFoodMenu(menus) {
    let list = '';
    menus.foods.forEach((food) => {
      list += `
      <li class="food-item">${food.name}</li>
      `;
    });

    return list;
  },

  _createdListBeverageMenu(menus) {
    let list = '';
    menus.drinks.forEach((drink) => {
      list += `
      <li class="beverage-item">${drink.name}</li>
      `;
    });

    return list;
  },

  _createdCardReviewCustomer(customerReviews) {
    let card = '';
    customerReviews.forEach((customerReview) => {
      const { name, review, date } = customerReview;
      card += `
        <div class="card-review">
          <div class="user-icon">
            <i class="fa-solid fa-circle-user" aria-label="Icon pengguna ${name}" role="icon" ></i>
          </div>
          <div class="content-review">
            <h3 class="name-review">
            ${name}
            </h3>
            <h4 class="date-review">(${date})</h4>
            <p class="text-review">${review}</p>
          </div>
        </div>
      `;
    });
    return card;
  },

  _heightDecisionCardReview(customerReviews) {
    if (customerReviews.length <= 3) {
      if (window.innerWidth < 640) {
        return '9rem';
      }
      return '7rem';
    }
    return '14rem';
  },
};

export default detailPageTemplate;
