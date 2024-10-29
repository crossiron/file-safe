const express = require('express')
const app = express()
const port = 3000


app.get('/files', (req, res) => {
    res.json({
        results: [],
        hasNextPage: false,
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
