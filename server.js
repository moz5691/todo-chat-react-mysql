const express = require('express');
const app = express();
const path = require('path');
const db = require('./models');

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/api')(app);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
  });
});
