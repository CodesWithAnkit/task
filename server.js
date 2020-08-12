const express = require('express')
const expressFileUpload = require('express-fileupload')

const app = express()
app.use(expressFileUpload())

// upload point
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file Uploaded' })
  }

  const file = req.files.file

  if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
      if (err) {
        console.error(err)
        return res.status(500).send(err)
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })
  } else {
    res.json({ msg: 'Please choose .pdf or .txt file' })
  }
})

app.listen(5000, console.log('server started at PORT 5000'))
