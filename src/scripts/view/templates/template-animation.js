const templateAnimation = {
  skeletonCard() {
    return `
      <div class="card-skeleton">
        <div class="wrap">
          <div class="circle-skeleton"></div>
          <div class="square-skeleton"></div>
          <div class="bar-wrap">
            <div class="bar-skeleton"></div>
            <div class="bar-skeleton"></div>
          </div>
        </div>
      </div>
    `;
  },

  skeletonDetail() {
    return `
      <div class="detail-skeleton">
        <div class="wrap-head">
          <div class="bar-skeleton head"></div>
        </div>

          <div class="square-skeleton">
            <div class="sub bar-skeleton"></div>
            <div class="wrap">
              <div class="sub-square-skeleton"></div>
              <div class="sub-square-skeleton"></div>
            </div>
          </div>

          <div class="square-skeleton">
            <div class="sub bar-skeleton"></div>
            <div class="wrap">
              <div class="sub-square-skeleton"></div>
              <div class="sub-square-skeleton"></div>
            </div>
          </div>

      </div>
    `;
  },

};

export default templateAnimation;
