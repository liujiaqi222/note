import { createImages } from './util.js';


const input = document.querySelector('input');
input.addEventListener('change', function () {
  getImages(this.files);
})
let images = [];

async function getImages(files) {
  images = images.concat(await createImages(files));
  let imgInfo = {
    totalWidth: 0,
    totalHeight: 0,
    imgWidths: [],
    imgHeights: [],
    maxHeight: 0,
    maxWidth: 0,
  }
  images.forEach(image => {
    if (image.height > imgInfo.maxHeight) {
      imgInfo.maxHeight = image.height;
    }
    if (image.width > imgInfo.maxWidth) {
      imgInfo.maxWidth = image.width;
    }
    imgInfo.totalHeight += image.height;
    imgInfo.totalWidth += image.width;
    imgInfo.imgWidths.push(image.width)
    imgInfo.imgHeights.push(image.height)

  })
  // 水平展示
  if (!userConfig.isVertical) {
    displayImagesHorizontal(images, imgInfo);
  }
  // 垂直展示
  else {

  }
}


// /水平合并
function displayImagesHorizontal(images, { totalWidth, imgWidths, maxHeight } = {}) {
  const preview = document.querySelector('.preview');
  let previewWidth = preview.clientWidth;
  const { gap } = userConfig;
  preview.style.gap = `${gap}px`;
  // 图片的总宽度小于等于预览容器的宽度
  if ((totalWidth + (images.length - 1) * gap) <= previewWidth) {
    // 将预览容器的宽度设置为图片的总宽度 2是左右边框的宽度和
    preview.style.width = `${totalWidth + 2}px`;
    images.forEach(image => {
      preview.appendChild(image);
    })
  }
  else {
    // 如果宽度大于则进行调节
    maxHeight = 0;
    // 这是剩余的宽度
    previewWidth -= (images.length - 1) * gap;
    images.forEach((image, index) => {
      let ratio = image.width / totalWidth;
      image.width = ratio * previewWidth;
      ratio = image.width / imgWidths[index];
      image.height = ratio * image.height;
      preview.appendChild(image);
      if (image.height > maxHeight) {
        maxHeight = image.height;
        console.log(maxHeight, image.height);
        preview.style.height = `${maxHeight}px`;
      }
    })
  }

  if (maxHeight < 500) {
    console.log(1);
    preview.style.minHeigt = 0;
  }
  preview.style.height = `${maxHeight}px`;
}

// 垂直展示
function displayImagesVertical(images,{totalHeight}) {
  const preview = document.querySelector('.preview');
  let previewWidth = preview.clientWidth;
}




export default images;