const express = require("express");
const multer = require("multer");
const port = 3000;
const baseUrl = `http://localhost:${port}/`;

// 存储到本地硬盘 文件夹为./uploads，并设置文件名
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()) + "-";
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    // 图片最大尺寸为15mb
    fileSize: 1024 * 1024 * 15,
  },
  // 只接收图片类型的文件
  fileFilter(req, file, cb) {
    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }
    cb(null, false);
  },
});

const app = express();

// 让uploads文件夹成为公开的文件夹
app.use("/uploads", express.static("uploads"));

// 允许跨域
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/upload", upload.array("file", 20), (req, res) => {
  let urls = [];
  req.files.forEach(({ path: imgPath }) => {
    imgPath = imgPath.replaceAll("\\", "/");
    urls.push(baseUrl + imgPath);
  });
  res.json({
    status: 200,
    urls,
  });
});

app.listen(3000, () => {
  console.log(`running at ${baseUrl}`);
});
