const input = document.querySelector('input');

input.addEventListener('change', function () {
  drawImages(this.files);
})

const canvasToShow = document.querySelector('canvas');
const canvasToDownload = document.createElement('canvas');

async function drawImages(files) {
  const images = await createImages(files);
  // 获取所有图片的总宽度 和图片的最大高度
  let imageMaxHeight = 0;
  const totalWidth = images.reduce((totalWidth, image) => {
    if (image.height > imageMaxHeight) imageMaxHeight = image.height;
    return totalWidth + image.width;
  }, 0);
  imageToShow(images, totalWidth);
  imageToDownload(images, totalWidth, imageMaxHeight);
}

// 在网页显示的画布
function imageToShow(images, totalWidth) {
  const ctx = canvasToShow.getContext('2d');
  // 设置画布的宽度为屏幕总宽度的60%
  const canvasWidth = window.innerWidth * 0.6;
  canvasToShow.setAttribute('width', canvasWidth);
  let canvasHeight = 0;
  const imageHeights = [];
  const imageWidths = [];
  // 设置对应比例的下，图片应该为的宽度和高度，并找出canvas的高度（即为图片应为高度的中最大值）
  images.forEach(image => {
    const picW = image.width / totalWidth * canvasWidth;
    const picH = picW / image.width * image.height;
    if (picH > canvasHeight) canvasHeight = picH;
    imageHeights.push(picH);
    imageWidths.push(picW);
  })
  // 设置canvas的高度
  canvasToShow.setAttribute('height', canvasHeight);
  let offsetX = 0;
  images.forEach((image, index) => {
    ctx.drawImage(image, offsetX, 0, imageWidths[index], imageHeights[index]);
    offsetX += imageWidths[index];
  })
}

// 实际下载的图片
function imageToDownload(images, totalWidth, maxHeight) {
  const ctx = canvasToDownload.getContext('2d');
  canvasToDownload.setAttribute('width', totalWidth);
  canvasToDownload.setAttribute('height', maxHeight);
  let offset = 0;
  images.forEach(image => {
    ctx.drawImage(image, offset, 0);
    offset += image.width;
  })
}

// 创建图片们
function createImages(files) {
  // 遍历文件 并创建image图片
  // 等待所有图片都创建好
  const createimages = [...files].map(file => createImage(file));
  return Promise.all(createimages).then(images => new Promise(resolve => resolve(images)));
}

// 创建一张图片
function createImage(file) {
  const link = URL.createObjectURL(file);
  const image = new Image();
  image.src = link;
  // image 加载好了就把image 返回出去
  return new Promise(resolve => image.onload = () => {
    resolve(image);
    URL.revokeObjectURL(link); // 图片已经创建好了，释放内存
  })
}


// 下载功能
const downloadBtn = document.querySelector('.downloadBtn');

downloadBtn.addEventListener('click', () => {
  canvasToDownload.toBlob((blob) => {
    const link = document.createElement('a');
    link.download = 'pic.jpg'; // 这里指定了图片的类型
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);

  }, "image/jpeg", 0.6)
})