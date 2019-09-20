require('dotenv').config();
const express = require('express');
const app = express();

app.get('/:endpoint', function (req, res) {
  console.log('endpoint', req.params.endpoint);
  try {
    delete require.cache[`../functions/${req.params.endpoint}`];
    const endpoint = require(`../functions/${req.params.endpoint}`);
    endpoint(req, res);
  } catch(e) {
    console.error(`Error on endpoint ${req.params.endpoint}`);
    console.error(e);
    res.send({ success: false, error: e });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Functions app listening on port ${port}!`);
})
