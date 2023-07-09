const assert = require('assert');

const MAX_TIMEOUT_WAITING_DURATION = 5;
const MIN_TIMEOUT_WAITING_DURATION = 2.5;

Feature('Showing Favorite Restaurant At Favorite Page');

let firstRestaurantTitle;

Before(async ({ I }) => {
  I.amOnPage('/');
  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement(locate('.card-overlay').first());
  I.seeElement('.card-content');
  firstRestaurantTitle = await I.grabTextFrom('.restaurant-name');

  const buttonInfo = locate('.button-info').first();
  I.seeElement(buttonInfo);
  I.click(buttonInfo); // showing card menu

  I.seeElement('.wrapper-card-menu');

  I.seeElement(locate('.card-menu').first());

  const buttonLikeCard = locate('.button-like').first();
  I.seeElement(buttonLikeCard);
  I.click(buttonLikeCard);
});

Scenario('should showing favorite restoran at favorite page', async ({ I }) => {
  I.amOnPage('/#/favorite');
  I.seeElement(locate('.card-overlay').first());
  I.seeElement('.card-content');
  const favoriteRestaurantTitle = await I.grabTextFrom('.restaurant-name');

  assert.strictEqual(firstRestaurantTitle, favoriteRestaurantTitle);
});
