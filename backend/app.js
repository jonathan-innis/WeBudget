const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config()

const routes = require('./routes');
const handleErrors = require('./middleware/handleErrors');
const app = express();

app.use(express.json());
app.use('/', routes);
app.use(handleErrors);

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
mongoose.connect(process.env.DATABASE_URL, mongooseOptions).then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
  })
})
