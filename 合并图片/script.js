const input = document.querySelector('input');

input.addEventListener('change', function () {
  drawImages(this.files);
})

const canvas = document.querySelector('canvas');

function drawImages(files) {
  const ctx = canvas.getContext('2d');
  files.forEach(file => {
    const img = new Image();
    
  })
}