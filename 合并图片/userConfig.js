const userConfig = {
  gap: 5,
  isVertical: false,
  isShadow: false,
  shadowColor: '#fff'
}

// 间距
function handleSlider(value) {
  userConfig.gap = value;
  document.querySelector('.space-between .num').textContent = value + 'px';
}

// 判断合并的方向
function handleDirectionChange(ctx) {
  const textEl = document.querySelector('.direction .text');
  userConfig.isVertical = ctx.checked;
  if (ctx.checked) {
    return textEl.textContent = '纵向合并';
  }
  textEl.textContent = '横向合并';
}

// 判断是否需要阴影
function handleIsShadow(ctx) {
  userConfig.isShadow = ctx.checked;
  const colorPickerBox = document.querySelector('.is-shadow');
  const colorPicker = document.querySelector('.is-shadow input');
  if (ctx.checked) {
    colorPicker.style.pointerEvents = 'all';
    colorPicker.style.hight = 'initial';
    return colorPickerBox.style.opacity = '1';
    
  }
  colorPicker.style.hight = '0px';
  colorPicker.style.pointerEvents = 'none';
  colorPickerBox.style.opacity = '0';
}

// 阴影颜色
function watchColorPicker(ctx) {
  userConfig.shadowColor = ctx.value;
}

