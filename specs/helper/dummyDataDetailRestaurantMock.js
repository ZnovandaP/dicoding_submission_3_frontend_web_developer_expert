const dummyDataDetailRestaurantMock = {
  error: false,
  message: 'success',
  restaurant: {
    id: '123',
    name: 'Melting Pot',
    description: 'desc melting pot',
    city: 'Medan',
    address: 'Jln. Pandeglang no 19',
    pictureId: '14',
    categories: [
      {
        name: 'Italia',
      },
      {
        name: 'Modern',
      },
    ],
    menus: {
      foods: [
        {
          name: 'Paket rosemary',
        },
        {
          name: 'Toastie salmon',
        },
        {
          name: 'Bebek crepes',
        },
        {
          name: 'Salad lengkeng',
        },
      ],
      drinks: [
        {
          name: 'Es krim',
        },
        {
          name: 'Sirup',
        },
        {
          name: 'Jus apel',
        },
        {
          name: 'Jus jeruk',
        },
      ],
    },
    rating: 4.2,
    customerReviews: [
      {
        name: 'Ahmad',
        review: 'Tidak rekomendasi untuk pelajar!',
        date: '13 November 2019',
      },
    ],
  },
};

export default dummyDataDetailRestaurantMock;
