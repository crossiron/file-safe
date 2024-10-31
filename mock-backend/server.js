const express = require('express')
const {files} = require("./files");
const app = express()
const port = 3000

app.get('/v1/files', (req, res) => {
  res.json(files());
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
