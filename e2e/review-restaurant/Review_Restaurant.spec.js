const assert = require('assert');

const MAX_TIMEOUT_WAITING_DURATION = 5;
const MIN_TIMEOUT_WAITING_DURATION = 2.5;

const timeStamp = Date.now();
const nameReviewer = `Name ${timeStamp}`;
const reviewContent = `Review ${timeStamp}`;

Feature('Add Review Restaurant At Detail Page');

Before(({ I }) => {
  I.amOnPage('/');
  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement(locate('.card-overlay').first());
});

Scenario('first way to add review at detail page, through click the card/card-overlay component', async ({ I }) => {
  I.click(locate('.card-overlay').first()); // click overlay card trigger showing modal popup

  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement('.modal-parent');
  I.seeElement('.modal-body');
  I.seeElement('.button-detail-restaurant-modal');
  I.click('.button-detail-restaurant-modal');

  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement('.review-section');
  I.seeElement('#form-post-review');

  I.fillField('#name-input', nameReviewer);
  I.fillField('#review-input', reviewContent);
  I.click('#submit-review');

  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement(locate('.card-review').last());
  I.seeElement(locate('.content-review').last());

  I.seeElement(locate('.name-review').last());
  const getNameReviewerAfterSubmitted = await I.grabTextFrom(locate('.name-review').last());

  I.seeElement(locate('.text-review').last());
  const getReviewContentAfterSubmitted = await I.grabTextFrom(locate('.text-review').last());

  assert.strictEqual(nameReviewer, getNameReviewerAfterSubmitted);
  assert.strictEqual(reviewContent, getReviewContentAfterSubmitted);
});

Scenario('second way to add review at detail page, through button "preview" at card menu', async ({ I }) => {
  const buttonInfo = locate('.button-info').first();
  I.seeElement(buttonInfo);
  I.click(buttonInfo); // showing card menu

  I.seeElement('.wrapper-card-menu');

  I.seeElement(locate('.card-menu').first());

  const buttonPreview = locate('.button-preview').first();
  I.seeElement(buttonPreview);
  I.click(buttonPreview);

  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement('.modal-parent');
  I.seeElement('.modal-body');
  I.seeElement('.button-detail-restaurant-modal');
  I.click('.button-detail-restaurant-modal');

  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement('.review-section');
  I.seeElement('#form-post-review');

  I.fillField('#name-input', nameReviewer);
  I.fillField('#review-input', reviewContent);
  I.click('#submit-review');

  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement(locate('.card-review').last());
  I.seeElement(locate('.content-review').last());

  I.seeElement(locate('.name-review').last());
  const getNameReviewerAfterSubmitted = await I.grabTextFrom(locate('.name-review').last());

  I.seeElement(locate('.text-review').last());
  const getReviewContentAfterSubmitted = await I.grabTextFrom(locate('.text-review').last());

  assert.strictEqual(nameReviewer, getNameReviewerAfterSubmitted);
  assert.strictEqual(reviewContent, getReviewContentAfterSubmitted);
});

Scenario('third way to add review at detail page, through button "detail restaurant" at card menu', async ({ I }) => {
  const buttonInfo = locate('.button-info').first();
  I.seeElement(buttonInfo);
  I.click(buttonInfo); // showing card menu

  I.seeElement('.wrapper-card-menu');

  I.seeElement(locate('.card-menu').first());

  const buttonDetail = locate('.button-detail-restaurant').first();
  I.seeElement(buttonDetail);
  I.click(buttonDetail);

  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement('.review-section');
  I.seeElement('#form-post-review');

  I.fillField('#name-input', nameReviewer);
  I.fillField('#review-input', reviewContent);
  I.click('#submit-review');

  I.wait(MIN_TIMEOUT_WAITING_DURATION || MAX_TIMEOUT_WAITING_DURATION);
  I.seeElement(locate('.card-review').last());
  I.seeElement(locate('.content-review').last());

  I.seeElement(locate('.name-review').last());
  const getNameReviewerAfterSubmitted = await I.grabTextFrom(locate('.name-review').last());

  I.seeElement(locate('.text-review').last());
  const getReviewContentAfterSubmitted = await I.grabTextFrom(locate('.text-review').last());

  assert.strictEqual(nameReviewer, getNameReviewerAfterSubmitted);
  assert.strictEqual(reviewContent, getReviewContentAfterSubmitted);
});
