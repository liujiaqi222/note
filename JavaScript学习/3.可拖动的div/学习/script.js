const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach(el => {
  el.addEventListener('dragstart', e => {
    el.classList.add('dragging');
  })
  el.addEventListener('dragend', e => {
    el.classList.remove('dragging');
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault(); //鼠标会显示禁止图标，默认情况下是不可以拖动元素，因此可以禁用默认

    const afterElemnt = getDragAfterElement(container, e.clientY);  // e.clientY是鼠标相对于浏览器窗口的Y
    // 获取到正在被拖动的元素
    // 因为每时每刻只可能有一个元素被拖动，而被拖动的元素加上的dragging的类名
    const draggable = document.querySelector('.dragging');
    if (afterElemnt == null) {
      container.appendChild(draggable);
    }else{
      container.insertBefore(draggable,afterElemnt);
    }
  })
})
//获取被拖动元素放置位置后面的元素
function getDragAfterElement(container, y) {
  // 不获取当前正在被拖动的元素
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElements.reduce((closet, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    // 如果offset为负数，则在元素的上方，且需要找到鼠标最接近底层元素的中心线的元素
    if (offset < 0 && offset > closet.offset) {
      return { offset: offset, elment: child };
    } else {
      return closet;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).elment;

}