const input = document.querySelector('input');

input.addEventListener('change', function () {
  drawImages(this.files)
})

const canvas = document.querySelector('canvas');


async function drawImages(files) {
  const ctx = canvas.getContext('2d');
  const images = await createImages(files);
  let width = 0;
  let offsetX = 0;
  let maxHeight=0;
  images.forEach(image => {
    width += image.width;
    if (image.height > maxHeight) maxHeight = image.height;
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', maxHeight);
    // console.log(image);
  })
  images.forEach(image => {
    ctx.drawImage(image, offsetX, 0);
    offsetX+=image.width;
  })
}

// 创建图片们
function createImages(files) {
  // 遍历文件 并创建image图片
  // 等待所有图片都创建好
  const createimages = [...files].map(file => createImage(file));
  return Promise.all(createimages).then(images => new Promise(resolve=> resolve(images)));
}

// 创建一张图片
function createImage(file) {
  const link = URL.createObjectURL(file);
  const image = new Image();
  image.src = link;
  // image 加载好了就把image 返回出去
  return new Promise(resolve => image.onload = () => resolve(image))
}

