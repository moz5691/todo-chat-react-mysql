var db = require('../models');

module.exports = function(app) {
  app.get('/api', (req, res) => {
    db.Todo.findAll({}).then(dbTodo => res.json(dbTodo));
  });

  app.post('/api', (req, res) => {
    db.Todo.findOrCreate({
      where: { key: req.body.key },
      defaults: { text: req.body.text, done: req.body.done }
    }).spread(function(todo, created) {
      console.log(
        todo.get({
          plain: true
        })
      );
      console.log(created);
    });
  });

  app.delete('/api/:id', (req, rea) => {
    db.Todo.destroy({
      where: {
        key: req.params.id
      }
    }).then(dbTodo => {
      res.json(dbTodo);
    });
  });
};
