const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res, next) => {
  res.status(200).json({ msg: "Successfully connected to server!", statusCode: 200, data: { msg: "Discord Authentication Online!" } })
});

app.listen(PORT => {
  // auto init no matter what...
  console.debug(`Server started on development server...`)
  require('./app');
});
