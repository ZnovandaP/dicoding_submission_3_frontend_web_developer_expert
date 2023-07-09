import axios from 'axios';
import API_ENDPOINT from '../global/api-endpoint';

class RestaurantResource {
  constructor() {
    this._configPostReview = {
      header: {
        'Content-Type': 'application/json',
      },
    };
  }

  static async getAllDataRestaurant() {
    try {
      const { data } = await axios.get(API_ENDPOINT.LIST);
      if (!data.restaurants) {
        throw new Error('Tidak ada data daftar restoran');
      }
      return data;
    } catch (err) {
      if (err.response) {
        throw new Error('Terjadi kesalahan untuk mendapatkan data restoran');
      } else if (err.request) {
        throw new Error('Permintaan data restoran ke server gagal');
      } else if (err) {
        throw new Error(err);
      } else {
        throw new Error('Terjadi kesalahan/error dalam pengambilan data');
      }
    }
  }

  static async getDataDetailRestaurant(id) {
    try {
      const { data } = await axios.get(API_ENDPOINT.DETAIL(id));

      if (!data.restaurant) {
        throw new Error('Tidak ada data detail restoran');
      }

      return data;
    } catch (err) {
      if (err.response) {
        throw new Error('Terjadi kesalahan untuk mendapatkan data detail restoran');
      } else if (err.request) {
        throw new Error('Permintaan data detail restoran ke server gagal');
      } else if (err) {
        throw new Error(err);
      } else {
        throw new Error('Terjadi kesalahan/error dalam pengambilan data detail restoran');
      }
    }
  }

  static async postReviewRestaurant(dataPost) {
    try {
      const { data } = await axios.post(API_ENDPOINT.POST_REVIEW, dataPost, this._configPostReview);
      if (!data.customerReviews) {
        throw new Error('Terjadi kesalahan pada ulasan anda yang baru ditambahkan');
      }
      return {
        messagePost: 'Ulasan anda berhasil ditambahkan dikolom ulasan',
        response: data,
      };
    } catch (err) {
      if (err.response) {
        throw new Error('Terjadi kesalahan pada saat posting ulasan restoran');
      } else if (err.request) {
        throw new Error('Permintaan untuk posting ulasan ke server gagal');
      } else if (err) {
        throw new Error(err);
      } else {
        throw new Error('Terjadi kesalahan/error dalam pengambilan data detail restoran');
      }
    }
  }
}

export default RestaurantResource;
