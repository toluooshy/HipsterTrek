const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/map', (req, res) => {
  var payload = `empty`;
  res.render('map', {data:payload});
});

module.exports = router;