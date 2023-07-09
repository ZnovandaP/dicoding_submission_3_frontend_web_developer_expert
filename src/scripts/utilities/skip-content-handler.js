const skipToMainContent = (button, content) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();

    const mainContent = content;
    mainContent.focus();

    const targetPosition = mainContent.offsetTop - 50;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  });
};

export default skipToMainContent;
