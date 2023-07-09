const contactPage = {
  _render() {
    return `
    <contact-us></contact-us>

    `;
  },

  _afterRender() {
    console.log('this is contact page');
  },
};

export default contactPage;
