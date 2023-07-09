const createSourceElement = ({ images }, type) => {
  let sourceElement = '';
  images.forEach(({ path, width }, index) => {
    sourceElement += /* html */ `
      <source
        media=${(index < images.length - 1)
    ? `'(max-width: ${width}px)'`
    : `'(min-width: ${images[index - 1].width}px)'`}
        srcset="${path}"
        type="image/${type}">
    `;
  });
  return sourceElement;
};

export default createSourceElement;
