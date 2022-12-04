var express = require('express');
var router = express.Router();

var fs = require('fs')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let positions = JSON.parse(req.query.positions)

  for (let i = 0; i < positions.length; i++) {
    await fs.appendFileSync(
      'positions.txt',
      positions[i] + '\n',
      function (err) {
          if (err) return console.log(err);
      }
    )
  }

  res.send({'status': 200})

});

module.exports = router;
