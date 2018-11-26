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

    // db.Todo.create({
    //   text: req.body.text,
    //   done: req.body.done,
    //   key: req.body.key
    // })
    //   .then(() => db.Todo.findOrCreate({ where: { key: req.body.key } }))
    //   .spread(function(todo, created) {
    //     console.log(todo.get({ plain: true }));
    //     console.log(created);
    //   });
  });

  //   const result = await db.findOne({ where: { key: req.body.key } });
  //   console.log('result log', result);
  //   if (result.length === 0) {
  //     try {
  //       await db.Todo.create({
  //         text: req.body.text,
  //         done: req.body.done,
  //         key: req.body.key
  //       });
  //     } catch (err) {
  //       res.json(err);
  //     }
  //   }
  // });

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

// const mongoose = require('mongoose');
// const Todo = mongoose.model('todos');
// const path = require('path');
// const _ = require('lodash');

// module.exports = function(app) {
//   app.get('/api', (req, res) => {
//     console.log('GET');
//     Todo.find({}).then(todo => res.send(todo));
//   });

//   app.post('/api', async (req, res) => {
//     const newTodo = {
//       text: req.body.text,
//       done: req.body.done,
//       key: req.body.key
//     };
//     const todo = new Todo(newTodo);
//     /* find if todo already exists here*/
//     const response = await Todo.find({ key: todo.key });
//     if (response.length === 0) {
//       try {
//         await todo.save();
//         res.sendStatus(200);
//       } catch (err) {
//         res.sendStatus(500);
//         console.log(err);
//       }
//     }
//   });

//   app.delete('/api/:id', (req, res) => {
//     Todo.findOneAndRemove({ key: req.params.id }).then(err => console.log(err));
//   });
// };
