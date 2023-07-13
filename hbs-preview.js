/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express');
const hbs = require('hbs');
const app = express();
hbs.registerPartials(__dirname + '/views/partials');

// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.get('/:id', function (req, res) {
  try {
    const id = (req.params.id).replaceAll("-", "/");
    res.render(`pages/${id}`, { fullBody: id != "login" });
  } catch {

  }

});

app.listen(3001);
