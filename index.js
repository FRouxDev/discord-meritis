import express from 'express';
const app = express();
const APP_DEFAULT_PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(APP_DEFAULT_PORT, () => {
  console.log(`Example app listening on port ${APP_DEFAULT_PORT}!`);
});
