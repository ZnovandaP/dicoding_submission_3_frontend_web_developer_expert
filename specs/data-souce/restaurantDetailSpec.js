import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import API_ENDPOINT from '../../src/scripts/global/api-endpoint';
import RestaurantResource from '../../src/scripts/data/get-restaurant-resource';
import dummyDataDetailRestaurantMock from '../helper/dummyDataDetailRestaurantMock';

describe('Testing Response getDataDetailRestaurant', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('When Response Status Is ok/200', () => {
    it('should return data restaurant detail', async () => {
      mock.onGet(API_ENDPOINT.DETAIL(123)).reply(200, dummyDataDetailRestaurantMock);

      const response = await RestaurantResource.getDataDetailRestaurant(123);

      expect(response.restaurant).toEqual(dummyDataDetailRestaurantMock.restaurant);
    });

    it('should show error when data restaurant detail is empty', async () => {
      mock.onGet(API_ENDPOINT.DETAIL(123)).reply(200, {});

      try {
        const response = await RestaurantResource.getDataDetailRestaurant(123);

        console.log(response);
      } catch (error) {
        expect(error instanceof Error).toEqual(true);
        // message error
        expect(error.message).toEqual('Error: Tidak ada data detail restoran');
      }
    });
  });

  describe('When Response Status Is not ok/404', () => {
    it('should throw error', async () => {
      mock.onGet(API_ENDPOINT.DETAIL(123)).reply(404);

      try {
        const response = await RestaurantResource.getDataDetailRestaurant(123);
      } catch (error) {
        expect(error instanceof Error).toEqual(true);
        // message error
        expect(error.message).toEqual('Terjadi kesalahan untuk mendapatkan data detail restoran');
      }
    });
  });
});
