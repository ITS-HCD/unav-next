const trustbarButtons = document.querySelectorAll('.nys-trustbar__button');
const closeButtons = document.querySelectorAll('.nys-trustbar__close');
const trustbarContent = document.querySelector('.nys-trustbar__content');
const mobileTrustbar = document.querySelector('.nys-trustbar--mob');
const desktopTrustbar = document.querySelector('.nys-trustbar--inline');
const contentMobile = document.querySelector('.nys-trustbar__contentmob');

function toggleTrustbar() {
  const isExpanded = trustbarButtons[0].getAttribute('aria-expanded') === 'true';
  
  trustbarButtons.forEach(button => {
    button.classList.toggle('el-is-active');
    button.setAttribute('aria-expanded', !isExpanded);
  });

  trustbarContent.classList.toggle('el-is-active');
  
  if (window.innerWidth < 768) {
    mobileTrustbar.classList.toggle('el-is-active');
    contentMobile.classList.toggle('el-is-active');
    closeButtons.forEach(button => button.classList.toggle('el-is-active'));
    closeButtons.forEach(button => button.setAttribute('tabindex', !isExpanded ? '0' : '-1'));
  } else {
    desktopTrustbar.classList.toggle('el-is-active');
    closeButtons.forEach(button => button.classList.toggle('el-is-active'));
    closeButtons.forEach(button => button.setAttribute('tabindex', !isExpanded ? '0' : '-1'));
  }
}

// Event listeners for the buttons
trustbarButtons.forEach(button => {
  button.addEventListener('click', toggleTrustbar);
});

closeButtons.forEach(button => {
  button.addEventListener('click', toggleTrustbar);
});

// Escape key listener
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const isExpanded = trustbarButtons[0].getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      toggleTrustbar();
    }
  }
});
