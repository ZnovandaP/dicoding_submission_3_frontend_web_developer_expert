const API_ENDPOINT = {
  LIST: 'https://restaurant-api.dicoding.dev/list',
  DETAIL: (id) => `https://restaurant-api.dicoding.dev/detail/${id}`,
  POST_REVIEW: 'https://restaurant-api.dicoding.dev/review',
  IMAGE_URL: {
    small: 'https://restaurant-api.dicoding.dev/images/small/',
    medium: 'https://restaurant-api.dicoding.dev/images/medium/',
    large: 'https://restaurant-api.dicoding.dev/images/large/',
  },

};

export default API_ENDPOINT;
