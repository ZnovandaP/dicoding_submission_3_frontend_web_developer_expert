import API_ENDPOINT from '../../global/api-endpoint';

const { IMAGE_URL } = API_ENDPOINT;

const modalBodyTemplate = ({
  pictureId, name, rating, city, description, id,
}) => {
  return `
      <!-- left/top -->
      <section class="left">
        <img
          data-src="${IMAGE_URL.small}${pictureId}"
          class="lazyload modal-image"
          loading="lazy"
          alt="Restoran ${name}"
        />
      </section>

      <!-- right/bottom -->
      <section class="right">
        <div class="name-restaurant">
          <h2 class="title">Nama Restoran<span class="line"></span></h2>
          <h3>${name}</h3>
        </div>

        <div class="location-restaurant">
          <h2 class="title">Lokasi Restoran<span class="line"></span></h2>
          <h3>
            <i
              class="fa-solid fa-map-location-dot"
            ></i>
            ${city}
          </h3>
        </div>

        <div class="rate-restaurant">
          <h2 class="title">Rating Restoran<span class="line"></span></h2>
          <h3>
            <i
              class="fa-regular fa-star star"
            ></i>
            <span>${rating}</span>
          </h3>
        </div>

        <div class="description-restaurant">
          <h2 class="title">
            Deskripsi Restoran<span class="line"></span>
          </h2>
          <article>
          <p class="description-text">
            ${description}
          </p>
          </article>
        </div>
        <div class="buttons-modal">
          <button type="button" class="button-like-modal" data-id="${id}" aria-label="Tombol suka">
            <i class="fa-regular fa-heart heart-icon" data-id="${id}"></i> 
            <span class="text-button-like" data-id="${id}"></span>
          </button>
          <a href="#/detail/${id}" class="button-detail-restaurant-modal" data-id="${id}">
          Detail Restoran</a>
        </div>
      </section>
    `;
};

export default modalBodyTemplate;
