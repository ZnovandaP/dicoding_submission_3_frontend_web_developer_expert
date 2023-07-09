import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import API_ENDPOINT from '../../src/scripts/global/api-endpoint';
import RestaurantResource from '../../src/scripts/data/get-restaurant-resource';
import dummyDataCustomerReview from '../helper/dummyDataCustomerReview';

describe('Testing Response postReviewRestaurant', () => {
  let mock;

  const reviewCustomer = {
    id: 'abc123',
    name: 'reviewer',
    review: 'review content',
  };

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('When Response Status Is ok/200', () => {
    it('should return data restaurant detail', async () => {
      mock.onPost(API_ENDPOINT.POST_REVIEW).reply(200, dummyDataCustomerReview);

      const response = await RestaurantResource.postReviewRestaurant(reviewCustomer);

      expect(response.messagePost).toEqual('Ulasan anda berhasil ditambahkan dikolom ulasan');
      expect(response.response.customerReviews).toEqual(dummyDataCustomerReview.customerReviews);
    });

    it('should show error when data restaurant detail is empty', async () => {
      mock.onPost(API_ENDPOINT.POST_REVIEW).reply(200, {});

      try {
        const response = await RestaurantResource.postReviewRestaurant(reviewCustomer);

        console.log(response);
      } catch (error) {
        expect(error instanceof Error).toEqual(true);
        // message error
        expect(error.message).toEqual('Error: Terjadi kesalahan pada ulasan anda yang baru ditambahkan');
      }
    });
  });

  describe('When Response Status Is not ok/404', () => {
    it('should throw error', async () => {
      mock.onPost(API_ENDPOINT.POST_REVIEW).reply(404);

      try {
        const response = await RestaurantResource.postReviewRestaurant(reviewCustomer);
      } catch (error) {
        expect(error instanceof Error).toEqual(true);
        // message error
        expect(error.message).toEqual('Terjadi kesalahan pada saat posting ulasan restoran');
      }
    });
  });
});
