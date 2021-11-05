const openModalButtons = document.querySelectorAll('[data-modal-target]'); // 假装页面中有多个打开按钮
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

openModalButtons.forEach(button => {

  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    // console.log(button.dataset);  // {modalTarget: '#modal'}
    openModal(modal);
  })
})
closeModalButtons.forEach(button => {

  button.addEventListener('click', () => {
    const modal = button.closest('.modal'); //获取最近有modal类名的父元素
    closeModal(modal);
  })
})

function openModal(modal) {
  if (modal === null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}
function closeModal(modal) {
  if (modal === null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal);
  })
})