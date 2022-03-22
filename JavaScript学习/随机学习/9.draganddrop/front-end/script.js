let dropArea = document.getElementById("drop-area");
let filesDone = 0;
let filesToDo = 0;
let progressBar = document.getElementById("progress-bar");

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

function handleFiles(files) {
  initializeProgress(files.length);
  [...files].forEach(file=>{
    uploadFiles(file);
    previewFile(file);
  });
}



function initializeProgress(numfiles) {
  progressBar.value = 0;
  filesDone = 0;
  filesToDo = numfiles;
}

function progressDone() {
  filesDone++;
  progressBar.value = (filesDone / filesToDo) * 100;
}

async function uploadFiles(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("http://localhost:3000/upload", {
    method: "post",
    body: fd,
  });
  progressDone();
  const data = await res.json();
  console.log(data.urls[0]);
}

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    let img = document.createElement("img");
    img.src = reader.result;
    document.getElementById("gallery").appendChild(img);
  };
}
