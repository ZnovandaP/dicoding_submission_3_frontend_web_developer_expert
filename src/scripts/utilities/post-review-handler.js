import { async } from 'regenerator-runtime';
import RestaurantResource from '../data/get-restaurant-resource';
import showAlertAndToast from './show-alert';

const postReviewHandler = {
  init({
    formPostSubmit, id, cardReviewContainer,
  }) {
    this._formPostSubmit = formPostSubmit;
    this._urlId = id;
    this._cardReviewContainer = cardReviewContainer;

    this._submitReviewHandler();
  },

  _submitReviewHandler() {
    this._formPostSubmit.addEventListener('submit', async (event) => {
      event.preventDefault();

      try {
        const formData = new FormData(this._formPostSubmit);
        const dataReview = this._dataReviewToBeSend({
          id: this._urlId,
          name: formData.get('name'),
          review: formData.get('review'),
        });

        const response = await RestaurantResource.postReviewRestaurant(dataReview);
        showAlertAndToast.toastSuccess(response.messagePost);
        this._formPostSubmit.reset();
        this._showNewReview(response.response);
        this._scrollToBottom();
      } catch (error) {
        showAlertAndToast.alertError(error);
      }
    });
  },

  _dataReviewToBeSend({ id, name, review }) {
    return {
      id,
      name,
      review,
    };
  },

  _showNewReview({ customerReviews }) {
    const lastIndex = customerReviews.length - 1;
    const newCustomerReview = customerReviews[lastIndex];
    this._cardReviewContainer.innerHTML += this._newCardReview(newCustomerReview);
  },

  _scrollToBottom() {
    this._cardReviewContainer.scrollTop = this._cardReviewContainer.scrollHeight;
  },

  _newCardReview(review) {
    return `
      <div class="card-review">
        <div class="user-icon">
          <i
            class="fa-solid fa-circle-user"
            aria-label="Icon pengguna ${review.name}"
          ></i>
        </div>
        <div class="content-review" style="background-color:#29BB89;">
          <h3 class="name-review">
            ${review.name}
          </h3>
          <h4 class="date-review">(${review.date})</h4>
          <p class="text-review">${review.review}</p>
        </div>
      </div>
    `;
  },

};

export default postReviewHandler;
