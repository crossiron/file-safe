const express = require('express');
const multer = require('multer');
const {files, uploadFile} = require("./files");
const app = express();
const port = 3000;

app.get('/v1/files', (req, res) => {
  res.json(files());
});

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.post('/v1/files', upload.single('file'), (req, res) => {
  res.json(uploadFile(req.file));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
