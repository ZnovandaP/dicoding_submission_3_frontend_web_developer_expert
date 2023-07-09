import { async } from 'regenerator-runtime';
import RestaurantResource from '../data/get-restaurant-resource';
import showAlertAndToast from './show-alert';

const getDataForModalBody = async (datasetID) => {
  try {
    const { restaurants } = await RestaurantResource.getAllDataRestaurant();
    let result;
    restaurants.forEach((restaurant) => {
      if (datasetID === restaurant.id) {
        result = restaurant;
      }
    });
    return result;
  } catch (error) {
    showAlertAndToast.alertError(error);
  }
};

export default getDataForModalBody;
