import { async } from 'regenerator-runtime';
import CONFIG from '../../global/config';
import RestaurantResource from '../../data/get-restaurant-resource';
import favoriteRestaurantIDB from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantDetailPresenter from '../../presenter/favorite-restaurant-presenter/favorite-restaurant-detail-presenter';
import postReviewHandler from '../../utilities/post-review-handler';
import detailPageTemplate from '../templates/detail';
import templateAnimation from '../templates/template-animation';
import urlParser from '../../routes/url-parser';
import skipToMainContent from '../../utilities/skip-content-handler';
import showAlertAndToast from '../../utilities/show-alert';
import element from '../../utilities/get-element';

const { getElement } = element;

const detailPage = {
  _render() {
    return `
    <button type="button" class="button-like-detail" title="Tambahkan ke favorit"  aria-label="Tombol menyukai restoran">
      <i class="fa-regular fa-heart heart-icon"></i>
    </button>

    <button type="button" class="skip-content detail" tabindex="1">Skip to content</button>

      <section id="main-content-detail" class="container" tabindex="0">
        ${templateAnimation.skeletonDetail()}
      </section>
    `;
  },

  async _afterRender() {
    skipToMainContent(
      getElement('.skip-content.detail'),
      getElement('#main-content-detail'),
    );

    const getUrlId = urlParser._parseUrlWithoutJoinString().id;
    const container = getElement('.container');

    try {
      const { restaurant } = await RestaurantResource.getDataDetailRestaurant(getUrlId);

      this._renderDetailComponent(container, restaurant);
    } catch (error) {
      container.innerHTML = templateAnimation.skeletonDetail();
      showAlertAndToast.alertError(error);
    }
  },

  _renderDetailComponent(container, dataDetailRestaurant) {
    container.innerHTML = '';
    container.innerHTML = detailPageTemplate.template(dataDetailRestaurant);
    const favoriteButtonDetailPresenter = new FavoriteRestaurantDetailPresenter({
      likeButton: getElement('.button-like-detail'),
      iconLikeButton: getElement('.heart-icon'),
      dataRestaurant: dataDetailRestaurant,
      favoriteRestaurant: favoriteRestaurantIDB,
    });

    postReviewHandler.init({
      formPostSubmit: getElement('#form-post-review'),
      id: urlParser._parseUrlWithoutJoinString().id,
      cardReviewContainer: getElement('.card-review-container'),
    });
  },
};

export default detailPage;
