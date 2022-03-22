let dropArea = document.getElementById("drop-area");

dropArea.addEventListener("dragenter", (e) => {
  e.preventDefault();
  dropArea.classList.add("highlight");
});

dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("highlight");
});

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("highlight");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("highlight");
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files);
});

function handleFiles(files){
  [...files].forEach(uploadFiles);
}

async function uploadFiles(file){
    const fd = new FormData();
    fd.append('file',file);
    const res = await fetch('http://localhost:3000/upload',{
      method:'post',
      body:fd
    });
    const data = await res.json();
    console.log(data.urls[0]);
}

