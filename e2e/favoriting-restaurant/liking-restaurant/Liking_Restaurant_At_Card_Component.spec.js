const assert = require('assert');

const MAX_TIMEOUT_WAITING_DURATION = 5;
const MIN_TIMEOUT_WAITING_DURATION = 2.5;

Feature('Liking Restaurant At Card Component');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
  I.waitForElement('.message-favorite-restaurant-empty', MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.see('Data Daftar Restoran Favorit Kosong', '.message-favorite-restaurant-empty');
});

Scenario('should be able to liking restaurant at card component', async ({ I }) => {
  I.amOnPage('/');
  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement(locate('.card-overlay').first());
  I.seeElement('.card-content');
  const firstRestaurantTitle = await I.grabTextFrom('.restaurant-name');

  const buttonInfo = locate('.button-info').first();
  I.seeElement(buttonInfo);
  I.click(buttonInfo); // showing card menu

  I.seeElement('.wrapper-card-menu');

  I.seeElement(locate('.card-menu').first());

  const buttonLikeCard = locate('.button-like').first();
  I.seeElement(buttonLikeCard);
  I.click(buttonLikeCard);

  I.amOnPage('/#/favorite');
  I.seeElement(locate('.card-overlay').first());
  I.seeElement('.card-content');
  const favoriteRestaurantTitle = await I.grabTextFrom('.restaurant-name');

  assert.strictEqual(firstRestaurantTitle, favoriteRestaurantTitle);
});
