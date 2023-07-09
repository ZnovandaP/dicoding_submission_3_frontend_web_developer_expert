import API_ENDPOINT from '../../global/api-endpoint';

const { IMAGE_URL } = API_ENDPOINT;

const cardComponent = ({
  id, pictureId, name, rating, city,
}) => `
  <div class="card" data-id="${id}">
  <img
    data-src="${IMAGE_URL.small}${pictureId}"
    class="lazyload card-image"
    loading="lazy"
    alt="Restoran ${name}"
  />
  <div class="overlay card-overlay" data-id="${id}">
    <div class="rate" data-id="${id}">
      <i
        class="fa-regular fa-star star"
      ></i>
      <p class="rating-restaurant">${rating}</p>
    </div>

    <button
      type="button"
      class="button-info"
      title="Tombol info lainya"
      aria-label="Tombol info"
    >
      <i class="fa-solid fa-circle-info info-icon"></i>
    </button>

    <div class="wrapper-card-menu">
    <button class="button-close" type="button" title="Tutup card menu" aria-label="Tombol menutup menu kartu">
      <i class="fa-regular fa-circle-xmark"></i>
    </button>
      <div class="card-menu">
        <button type="button" class="button-like" data-id="${id}"></button>
        <button type="button" class="button-preview" data-id="${id}">Pratinjau</button>
        <a href="#/detail/${id}" class="button-detail-restaurant" data-id="${id}">Detail Restoran</a>
      </div>
    </div>

    <div class="card-content">
      <p class="city-restaurant">
        <i class="fa-solid fa-map-location-dot"></i>
        ${city}
      </p>
      <h2 class="restaurant-name">${name}</h2>
    </div>
  </div>
</div>
  `;

export default cardComponent;
