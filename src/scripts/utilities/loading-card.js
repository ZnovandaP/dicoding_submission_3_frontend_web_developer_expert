import templateAnimation from '../view/templates/template-animation';

const loadingCardSkeleton = (cardContainer) => {
  const numberItemSkeleton = 8;
  for (let index = 0; index < numberItemSkeleton; index++) {
    cardContainer.innerHTML += templateAnimation.skeletonCard();
  }
};

export default loadingCardSkeleton;
