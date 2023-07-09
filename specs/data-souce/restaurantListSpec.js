import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import API_ENDPOINT from '../../src/scripts/global/api-endpoint';
import RestaurantResource from '../../src/scripts/data/get-restaurant-resource';
import dummyDataAllRestaurantMock from '../helper/dummyDataAllRestaurantMock';

describe('Testing Response getAllDataRestaurant', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  describe('When Response Status Is ok/200', () => {
    it('should return data restaurant list', async () => {
      mock.onGet(API_ENDPOINT.LIST).reply(200, dummyDataAllRestaurantMock);

      const response = await RestaurantResource.getAllDataRestaurant();

      expect(response.restaurants).toEqual(dummyDataAllRestaurantMock.restaurants);
    });

    it('should show error message restaurant list is empty', async () => {
      mock.onGet(API_ENDPOINT.LIST).reply(200, {});

      try {
        const response = await RestaurantResource.getAllDataRestaurant();
      } catch (error) {
        expect(error instanceof Error).toEqual(true);
        // message error list data restaurants is empty
        expect(error.message).toEqual('Error: Tidak ada data daftar restoran');
      }
    });
  });

  describe('When Response Status Is not ok/404', () => {
    it('should throw error', async () => {
      mock.onGet(API_ENDPOINT.LIST).reply(404);

      try {
        const response = await RestaurantResource.getAllDataRestaurant();
      } catch (error) {
        expect(error instanceof Error).toEqual(true);
        // message error
        expect(error.message).toEqual('Terjadi kesalahan untuk mendapatkan data restoran');
      }
    });
  });
});
